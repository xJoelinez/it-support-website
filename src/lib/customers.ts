'use server'

import { D1Database } from '@cloudflare/workers-types'
import { env } from 'process'

// Get database from environment
const getDB = () => {
  return env.DB as unknown as D1Database
}

// Get all customers
export async function getAllCustomers() {
  const db = getDB()
  
  try {
    const customers = await db.prepare(
      `SELECT u.id, u.name, u.email, u.company, u.phone, u.status, u.created_at as joinDate
       FROM users u 
       WHERE u.role = 'customer'
       ORDER BY u.created_at DESC`
    ).all()
    
    return { success: true, customers: customers.results }
  } catch (error) {
    console.error('Error fetching customers:', error)
    return { success: false, message: 'Failed to fetch customers' }
  }
}

// Get customer by ID
export async function getCustomerById(id: number) {
  const db = getDB()
  
  try {
    // Get customer details
    const customer = await db.prepare(
      `SELECT u.id, u.name, u.email, u.company, u.phone, u.status, u.created_at as joinDate
       FROM users u 
       WHERE u.id = ? AND u.role = 'customer'`
    ).bind(id).first()
    
    if (!customer) {
      return { success: false, message: 'Customer not found' }
    }
    
    // Get customer services
    const services = await db.prepare(
      `SELECT cs.id, s.name, s.description, s.category, s.price, cs.status, 
              cs.start_date, cs.renewal_date
       FROM customer_services cs
       JOIN services s ON cs.service_id = s.id
       WHERE cs.user_id = ?
       ORDER BY cs.created_at DESC`
    ).bind(id).all()
    
    return { 
      success: true, 
      customer,
      services: services.results
    }
  } catch (error) {
    console.error('Error fetching customer:', error)
    return { success: false, message: 'Failed to fetch customer' }
  }
}

// Create a new customer
export async function createCustomer(data: {
  name: string
  email: string
  password: string
  company?: string
  phone?: string
}) {
  const db = getDB()
  
  try {
    // Check if email already exists
    const existingUser = await db.prepare(
      'SELECT id FROM users WHERE email = ?'
    ).bind(data.email).first()
    
    if (existingUser) {
      return { success: false, message: 'Email already in use' }
    }
    
    // Hash password would normally be done here, but we're using the auth.ts module for that
    
    // Insert customer
    const result = await db.prepare(
      `INSERT INTO users (name, email, password_hash, company, phone, role, status) 
       VALUES (?, ?, ?, ?, ?, 'customer', 'active')`
    ).bind(
      data.name, 
      data.email, 
      'placeholder_for_hashed_password', // This would be replaced with actual hashing
      data.company || null, 
      data.phone || null
    ).run()
    
    if (!result.success) {
      return { success: false, message: 'Failed to create customer' }
    }
    
    return { success: true, id: result.meta.last_row_id }
  } catch (error) {
    console.error('Error creating customer:', error)
    return { success: false, message: 'Failed to create customer' }
  }
}

// Update a customer
export async function updateCustomer(id: number, data: {
  name?: string
  email?: string
  company?: string
  phone?: string
  status?: string
}) {
  const db = getDB()
  
  // Build the update query dynamically based on provided fields
  const updates = []
  const values = []
  
  if (data.name !== undefined) {
    updates.push('name = ?')
    values.push(data.name)
  }
  
  if (data.email !== undefined) {
    // Check if email already exists for another user
    if (data.email) {
      const existingUser = await db.prepare(
        'SELECT id FROM users WHERE email = ? AND id != ?'
      ).bind(data.email, id).first()
      
      if (existingUser) {
        return { success: false, message: 'Email already in use' }
      }
      
      updates.push('email = ?')
      values.push(data.email)
    }
  }
  
  if (data.company !== undefined) {
    updates.push('company = ?')
    values.push(data.company)
  }
  
  if (data.phone !== undefined) {
    updates.push('phone = ?')
    values.push(data.phone)
  }
  
  if (data.status !== undefined) {
    if (!['active', 'inactive', 'pending'].includes(data.status)) {
      return { success: false, message: 'Invalid status value' }
    }
    updates.push('status = ?')
    values.push(data.status)
  }
  
  if (updates.length === 0) {
    return { success: false, message: 'No fields to update' }
  }
  
  updates.push('updated_at = datetime("now")')
  
  try {
    const query = `UPDATE users SET ${updates.join(', ')} WHERE id = ? AND role = 'customer'`
    values.push(id)
    
    const result = await db.prepare(query).bind(...values).run()
    
    if (!result.success || result.meta.changes === 0) {
      return { success: false, message: 'Customer not found or no changes made' }
    }
    
    return { success: true }
  } catch (error) {
    console.error('Error updating customer:', error)
    return { success: false, message: 'Failed to update customer' }
  }
}

// Delete a customer
export async function deleteCustomer(id: number) {
  const db = getDB()
  
  try {
    // Start a transaction
    await db.exec('BEGIN TRANSACTION')
    
    // Delete customer services
    await db.prepare(
      'DELETE FROM customer_services WHERE user_id = ?'
    ).bind(id).run()
    
    // Delete customer sessions
    await db.prepare(
      'DELETE FROM sessions WHERE user_id = ?'
    ).bind(id).run()
    
    // Delete customer
    const result = await db.prepare(
      'DELETE FROM users WHERE id = ? AND role = "customer"'
    ).bind(id).run()
    
    if (!result.success || result.meta.changes === 0) {
      await db.exec('ROLLBACK')
      return { success: false, message: 'Customer not found' }
    }
    
    await db.exec('COMMIT')
    return { success: true }
  } catch (error) {
    await db.exec('ROLLBACK')
    console.error('Error deleting customer:', error)
    return { success: false, message: 'Failed to delete customer' }
  }
}

// Add a service to a customer
export async function addServiceToCustomer(userId: number, serviceId: number, renewalDate?: string) {
  const db = getDB()
  
  try {
    // Check if customer exists
    const customer = await db.prepare(
      'SELECT id FROM users WHERE id = ? AND role = "customer"'
    ).bind(userId).first()
    
    if (!customer) {
      return { success: false, message: 'Customer not found' }
    }
    
    // Check if service exists
    const service = await db.prepare(
      'SELECT id FROM services WHERE id = ?'
    ).bind(serviceId).first()
    
    if (!service) {
      return { success: false, message: 'Service not found' }
    }
    
    // Check if customer already has this service
    const existingService = await db.prepare(
      'SELECT id FROM customer_services WHERE user_id = ? AND service_id = ?'
    ).bind(userId, serviceId).first()
    
    if (existingService) {
      return { success: false, message: 'Customer already has this service' }
    }
    
    // Set renewal date to 1 year from now if not provided
    let renewalDateValue = renewalDate
    if (!renewalDateValue) {
      const oneYearFromNow = new Date()
      oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)
      renewalDateValue = oneYearFromNow.toISOString()
    }
    
    // Add service to customer
    const result = await db.prepare(
      `INSERT INTO customer_services (user_id, service_id, status, renewal_date) 
       VALUES (?, ?, 'active', ?)`
    ).bind(userId, serviceId, renewalDateValue).run()
    
    if (!result.success) {
      return { success: false, message: 'Failed to add service to customer' }
    }
    
    return { success: true, id: result.meta.last_row_id }
  } catch (error) {
    console.error('Error adding service to customer:', error)
    return { success: false, message: 'Failed to add service to customer' }
  }
}

// Remove a service from a customer
export async function removeServiceFromCustomer(userId: number, customerServiceId: number) {
  const db = getDB()
  
  try {
    // Check if the service belongs to the customer
    const customerService = await db.prepare(
      'SELECT id FROM customer_services WHERE id = ? AND user_id = ?'
    ).bind(customerServiceId, userId).first()
    
    if (!customerService) {
      return { success: false, message: 'Service not found for this customer' }
    }
    
    // Remove the service
    const result = await db.prepare(
      'DELETE FROM customer_services WHERE id = ?'
    ).bind(customerServiceId).run()
    
    if (!result.success) {
      return { success: false, message: 'Failed to remove service' }
    }
    
    return { success: true }
  } catch (error) {
    console.error('Error removing service from customer:', error)
    return { success: false, message: 'Failed to remove service from customer' }
  }
}
