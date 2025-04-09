'use server'

import { D1Database } from '@cloudflare/workers-types'
import { env } from 'process'

// Get database from environment
const getDB = () => {
  return env.DB as unknown as D1Database
}

// Get all enquiries
export async function getAllEnquiries() {
  const db = getDB()
  
  try {
    const enquiries = await db.prepare(
      `SELECT * FROM enquiries ORDER BY created_at DESC`
    ).all()
    
    return { success: true, enquiries: enquiries.results }
  } catch (error) {
    console.error('Error fetching enquiries:', error)
    return { success: false, message: 'Failed to fetch enquiries' }
  }
}

// Get enquiry by ID
export async function getEnquiryById(id: number) {
  const db = getDB()
  
  try {
    const enquiry = await db.prepare(
      'SELECT * FROM enquiries WHERE id = ?'
    ).bind(id).first()
    
    if (!enquiry) {
      return { success: false, message: 'Enquiry not found' }
    }
    
    return { success: true, enquiry }
  } catch (error) {
    console.error('Error fetching enquiry:', error)
    return { success: false, message: 'Failed to fetch enquiry' }
  }
}

// Create a new enquiry
export async function createEnquiry(data: {
  name: string
  email: string
  phone?: string
  service?: string
  message: string
}) {
  const db = getDB()
  
  try {
    const result = await db.prepare(
      `INSERT INTO enquiries (name, email, phone, service, message, status) 
       VALUES (?, ?, ?, ?, ?, 'new')`
    ).bind(
      data.name, 
      data.email, 
      data.phone || null, 
      data.service || null, 
      data.message
    ).run()
    
    if (!result.success) {
      return { success: false, message: 'Failed to create enquiry' }
    }
    
    return { success: true, id: result.meta.last_row_id }
  } catch (error) {
    console.error('Error creating enquiry:', error)
    return { success: false, message: 'Failed to create enquiry' }
  }
}

// Update enquiry status
export async function updateEnquiryStatus(id: number, status: string) {
  const db = getDB()
  
  if (!['new', 'contacted', 'closed'].includes(status)) {
    return { success: false, message: 'Invalid status value' }
  }
  
  try {
    const result = await db.prepare(
      `UPDATE enquiries SET status = ?, updated_at = datetime("now") WHERE id = ?`
    ).bind(status, id).run()
    
    if (!result.success || result.meta.changes === 0) {
      return { success: false, message: 'Enquiry not found or no changes made' }
    }
    
    return { success: true }
  } catch (error) {
    console.error('Error updating enquiry status:', error)
    return { success: false, message: 'Failed to update enquiry status' }
  }
}

// Delete an enquiry
export async function deleteEnquiry(id: number) {
  const db = getDB()
  
  try {
    const result = await db.prepare(
      'DELETE FROM enquiries WHERE id = ?'
    ).bind(id).run()
    
    if (!result.success || result.meta.changes === 0) {
      return { success: false, message: 'Enquiry not found' }
    }
    
    return { success: true }
  } catch (error) {
    console.error('Error deleting enquiry:', error)
    return { success: false, message: 'Failed to delete enquiry' }
  }
}

// Get enquiries by status
export async function getEnquiriesByStatus(status: string) {
  const db = getDB()
  
  if (!['new', 'contacted', 'closed', 'all'].includes(status)) {
    return { success: false, message: 'Invalid status value' }
  }
  
  try {
    let query = 'SELECT * FROM enquiries'
    let params = []
    
    if (status !== 'all') {
      query += ' WHERE status = ?'
      params.push(status)
    }
    
    query += ' ORDER BY created_at DESC'
    
    const enquiries = await db.prepare(query).bind(...params).all()
    
    return { success: true, enquiries: enquiries.results }
  } catch (error) {
    console.error('Error fetching enquiries by status:', error)
    return { success: false, message: 'Failed to fetch enquiries' }
  }
}

// Export enquiries to CSV
export async function exportEnquiriesToCSV() {
  const db = getDB()
  
  try {
    const enquiries = await db.prepare(
      `SELECT id, name, email, phone, service, message, status, 
              created_at, updated_at 
       FROM enquiries 
       ORDER BY created_at DESC`
    ).all()
    
    if (!enquiries.results.length) {
      return { success: false, message: 'No enquiries to export' }
    }
    
    // Convert to CSV format
    const headers = Object.keys(enquiries.results[0]).join(',')
    const rows = enquiries.results.map(enquiry => {
      return Object.values(enquiry).map(value => {
        // Handle values with commas by wrapping in quotes
        if (value && typeof value === 'string' && value.includes(',')) {
          return `"${value}"`
        }
        return value
      }).join(',')
    }).join('\n')
    
    const csv = `${headers}\n${rows}`
    
    return { success: true, csv }
  } catch (error) {
    console.error('Error exporting enquiries to CSV:', error)
    return { success: false, message: 'Failed to export enquiries' }
  }
}
