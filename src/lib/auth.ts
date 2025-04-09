'use server'

import { D1Database } from '@cloudflare/workers-types'
import { env } from 'process'
import crypto from 'crypto'

// Get database from environment
const getDB = () => {
  try {
    return env.DB as unknown as D1Database
  } catch (error) {
    console.error('Error getting database:', error)
    throw new Error('Database connection failed')
  }
}

// Hash password using crypto
const hashPassword = (password: string): string => {
  try {
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    return `${salt}:${hash}`
  } catch (error) {
    console.error('Error hashing password:', error)
    throw new Error('Password hashing failed')
  }
}

// Verify password
const verifyPassword = (password: string, hashedPassword: string): boolean => {
  try {
    const [salt, storedHash] = hashedPassword.split(':')
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    return storedHash === hash
  } catch (error) {
    console.error('Error verifying password:', error)
    return false
  }
}

// Register a new user
export async function registerUser(data: {
  name: string
  email: string
  password: string
  company?: string
  phone?: string
  role?: string
}) {
  const db = getDB()
  
  try {
    // Validate input
    if (!data.name || !data.email || !data.password) {
      return { success: false, message: 'Name, email and password are required' }
    }
    
    if (data.password.length < 8) {
      return { success: false, message: 'Password must be at least 8 characters long' }
    }
    
    // Check if email already exists
    const existingUser = await db.prepare(
      'SELECT id FROM users WHERE email = ?'
    ).bind(data.email).first()
    
    if (existingUser) {
      return { success: false, message: 'Email already in use' }
    }
    
    // Hash password
    const passwordHash = hashPassword(data.password)
    
    // Insert user
    const result = await db.prepare(
      `INSERT INTO users (name, email, password_hash, company, phone, role, status) 
       VALUES (?, ?, ?, ?, ?, ?, 'active')`
    ).bind(
      data.name, 
      data.email, 
      passwordHash,
      data.company || null, 
      data.phone || null,
      data.role || 'customer'
    ).run()
    
    if (!result.success) {
      console.error('Database error during user creation:', result)
      return { success: false, message: 'Failed to create user' }
    }
    
    return { success: true, id: result.meta.last_row_id }
  } catch (error) {
    console.error('Error registering user:', error)
    return { success: false, message: 'Failed to register user. Please try again later.' }
  }
}

// Login user
export async function loginUser(email: string, password: string) {
  if (!email || !password) {
    return { success: false, message: 'Email and password are required' }
  }

  const db = getDB()
  
  try {
    // Get user by email
    const user = await db.prepare(
      'SELECT id, name, email, password_hash, role, status FROM users WHERE email = ?'
    ).bind(email).first()
    
    if (!user) {
      return { success: false, message: 'Invalid email or password' }
    }
    
    // Check if user is active
    if (user.status !== 'active') {
      return { success: false, message: 'Account is inactive' }
    }
    
    // Verify password
    if (!verifyPassword(password, user.password_hash)) {
      return { success: false, message: 'Invalid email or password' }
    }
    
    // Create session
    const sessionToken = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // 7 days from now
    
    const sessionResult = await db.prepare(
      `INSERT INTO sessions (user_id, token, expires_at) 
       VALUES (?, ?, ?)`
    ).bind(
      user.id,
      sessionToken,
      expiresAt.toISOString()
    ).run()
    
    if (!sessionResult.success) {
      console.error('Database error during session creation:', sessionResult)
      return { success: false, message: 'Failed to create session' }
    }
    
    // Return user info and session token
    return { 
      success: true, 
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      sessionToken,
      expiresAt: expiresAt.toISOString()
    }
  } catch (error) {
    console.error('Error logging in:', error)
    return { success: false, message: 'Failed to log in. Please try again later.' }
  }
}

// Get current user from session token
export async function getCurrentUser(sessionToken: string) {
  if (!sessionToken) {
    return { success: false, message: 'No session token provided' }
  }

  const db = getDB()
  
  try {
    // Get session
    const session = await db.prepare(
      `SELECT s.user_id, s.expires_at, u.id, u.name, u.email, u.role, u.status
       FROM sessions s
       JOIN users u ON s.user_id = u.id
       WHERE s.token = ? AND s.expires_at > datetime('now')`
    ).bind(sessionToken).first()
    
    if (!session) {
      return { success: false, message: 'Invalid or expired session' }
    }
    
    // Check if user is active
    if (session.status !== 'active') {
      return { success: false, message: 'Account is inactive' }
    }
    
    // Return user info
    return { 
      success: true, 
      user: {
        id: session.id,
        name: session.name,
        email: session.email,
        role: session.role
      }
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return { success: false, message: 'Failed to get current user. Please try again later.' }
  }
}

// Logout user
export async function logoutUser(sessionToken: string) {
  if (!sessionToken) {
    return { success: false, message: 'No session token provided' }
  }

  const db = getDB()
  
  try {
    // Delete session
    const result = await db.prepare(
      'DELETE FROM sessions WHERE token = ?'
    ).bind(sessionToken).run()
    
    return { success: true }
  } catch (error) {
    console.error('Error logging out:', error)
    return { success: false, message: 'Failed to log out. Please try again later.' }
  }
}

// Logout function for client-side use
export async function logout() {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      // Clear local storage
      localStorage.removeItem('sessionToken');
      localStorage.removeItem('user');
      
      // Redirect to home page
      window.location.href = '/';
      return { success: true };
    } else {
      return { success: false, message: 'Logout failed' };
    }
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, message: 'An error occurred during logout' };
  }
}

// Request password reset
export async function requestPasswordReset(email: string) {
  if (!email) {
    return { success: false, message: 'Email is required' }
  }

  const db = getDB()
  
  try {
    // Check if user exists
    const user = await db.prepare(
      'SELECT id FROM users WHERE email = ?'
    ).bind(email).first()
    
    if (!user) {
      // Don't reveal that the email doesn't exist
      return { success: true }
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 1) // 1 hour from now
    
    // Delete any existing reset tokens for this user
    await db.prepare(
      'DELETE FROM password_resets WHERE user_id = ?'
    ).bind(user.id).run()
    
    // Insert reset token
    const result = await db.prepare(
      `INSERT INTO password_resets (user_id, token, expires_at) 
       VALUES (?, ?, ?)`
    ).bind(
      user.id,
      resetToken,
      expiresAt.toISOString()
    ).run()
    
    if (!result.success) {
      console.error('Database error during reset token creation:', result)
      return { success: false, message: 'Failed to create reset token' }
    }
    
    // In a real application, we would send an email with the reset link
    // For this demo, we'll just return the token
    return { 
      success: true, 
      resetToken,
      resetUrl: `/reset-password/${resetToken}`
    }
  } catch (error) {
    console.error('Error requesting password reset:', error)
    return { success: false, message: 'Failed to request password reset. Please try again later.' }
  }
}

// Reset password
export async function resetPassword(token: string, newPassword: string) {
  if (!token || !newPassword) {
    return { success: false, message: 'Token and new password are required' }
  }

  if (newPassword.length < 8) {
    return { success: false, message: 'Password must be at least 8 characters long' }
  }

  const db = getDB()
  
  try {
    // Get reset token
    const resetRequest = await db.prepare(
      `SELECT pr.user_id, pr.expires_at
       FROM password_resets pr
       WHERE pr.token = ? AND pr.expires_at > datetime('now')`
    ).bind(token).first()
    
    if (!resetRequest) {
      return { success: false, message: 'Invalid or expired reset token' }
    }
    
    // Hash new password
    const passwordHash = hashPassword(newPassword)
    
    // Update user password
    const updateResult = await db.prepare(
      `UPDATE users SET password_hash = ? WHERE id = ?`
    ).bind(passwordHash, resetRequest.user_id).run()
    
    if (!updateResult.success) {
      console.error('Database error during password update:', updateResult)
      return { success: false, message: 'Failed to update password' }
    }
    
    // Delete reset token
    await db.prepare(
      'DELETE FROM password_resets WHERE token = ?'
    ).bind(token).run()
    
    // Delete all sessions for this user
    await db.prepare(
      'DELETE FROM sessions WHERE user_id = ?'
    ).bind(resetRequest.user_id).run()
    
    return { success: true }
  } catch (error) {
    console.error('Error resetting password:', error)
    return { success: false, message: 'Failed to reset password. Please try again later.' }
  }
}

// Check if user is admin
export async function isAdmin(sessionToken: string) {
  if (!sessionToken) {
    return { success: false, message: 'No session token provided' }
  }

  const currentUser = await getCurrentUser(sessionToken)
  
  if (!currentUser.success) {
    return { success: false, message: currentUser.message }
  }
  
  if (currentUser.user.role !== 'admin') {
    return { success: false, message: 'Unauthorized' }
  }
  
  return { success: true, user: currentUser.user }
}

// Require admin middleware
export async function requireAdmin() {
  try {
    // Get session token from cookies
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
    
    const sessionToken = cookies.session || localStorage.getItem('sessionToken');
    
    if (!sessionToken) {
      window.location.href = '/login?redirect=/admin';
      return { success: false, message: 'Authentication required' };
    }
    
    // Check if user is admin
    const response = await fetch('/api/auth/user', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      window.location.href = '/login?redirect=/admin';
      return { success: false, message: 'Authentication required' };
    }
    
    const data = await response.json();
    
    if (!data.success || data.user.role !== 'admin') {
      window.location.href = '/';
      return { success: false, message: 'Unauthorized' };
    }
    
    return { success: true, user: data.user };
  } catch (error) {
    console.error('Auth error:', error);
    window.location.href = '/login?redirect=/admin';
    return { success: false, message: 'Authentication error' };
  }
}

// Create admin user if none exists
export async function createAdminIfNotExists() {
  const db = getDB()
  
  try {
    // Check if any admin exists
    const adminExists = await db.prepare(
      "SELECT id FROM users WHERE role = 'admin'"
    ).first()
    
    if (adminExists) {
      return { success: true, message: 'Admin already exists' }
    }
    
    // Create admin user
    const passwordHash = hashPassword('admin123')
    
    const result = await db.prepare(
      `INSERT INTO users (name, email, password_hash, role, status) 
       VALUES (?, ?, ?, 'admin', 'active')`
    ).bind(
      'Admin User',
      'admin@cybershield.com',
      passwordHash
    ).run()
    
    if (!result.success) {
      console.error('Database error during admin creation:', result)
      return { success: false, message: 'Failed to create admin user' }
    }
    
    return { 
      success: true, 
      message: 'Admin user created',
      email: 'admin@cybershield.com',
      password: 'admin123'
    }
  } catch (error) {
    console.error('Error creating admin user:', error)
    return { success: false, message: 'Failed to create admin user. Please try again later.' }
  }
}
