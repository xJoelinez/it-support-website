'use server'

import { D1Database } from '@cloudflare/workers-types'
import { env } from 'process'

// Get database from environment
const getDB = () => {
  return env.DB as unknown as D1Database
}

// Get all services
export async function getAllServices() {
  const db = getDB()
  
  try {
    const services = await db.prepare(
      'SELECT * FROM services ORDER BY category, price'
    ).all()
    
    return { success: true, services: services.results }
  } catch (error) {
    console.error('Error fetching services:', error)
    return { success: false, message: 'Failed to fetch services' }
  }
}

// Get service by ID
export async function getServiceById(id: number) {
  const db = getDB()
  
  try {
    const service = await db.prepare(
      'SELECT * FROM services WHERE id = ?'
    ).bind(id).first()
    
    if (!service) {
      return { success: false, message: 'Service not found' }
    }
    
    return { success: true, service }
  } catch (error) {
    console.error('Error fetching service:', error)
    return { success: false, message: 'Failed to fetch service' }
  }
}

// Create a new service
export async function createService(data: {
  name: string
  description: string
  category: string
  price: number
}) {
  const db = getDB()
  
  try {
    const result = await db.prepare(
      'INSERT INTO services (name, description, category, price) VALUES (?, ?, ?, ?)'
    ).bind(data.name, data.description, data.category, data.price).run()
    
    if (!result.success) {
      return { success: false, message: 'Failed to create service' }
    }
    
    return { success: true, id: result.meta.last_row_id }
  } catch (error) {
    console.error('Error creating service:', error)
    return { success: false, message: 'Failed to create service' }
  }
}

// Update a service
export async function updateService(id: number, data: {
  name?: string
  description?: string
  category?: string
  price?: number
}) {
  const db = getDB()
  
  // Build the update query dynamically based on provided fields
  const updates = []
  const values = []
  
  if (data.name !== undefined) {
    updates.push('name = ?')
    values.push(data.name)
  }
  
  if (data.description !== undefined) {
    updates.push('description = ?')
    values.push(data.description)
  }
  
  if (data.category !== undefined) {
    updates.push('category = ?')
    values.push(data.category)
  }
  
  if (data.price !== undefined) {
    updates.push('price = ?')
    values.push(data.price)
  }
  
  if (updates.length === 0) {
    return { success: false, message: 'No fields to update' }
  }
  
  updates.push('updated_at = datetime("now")')
  
  try {
    const query = `UPDATE services SET ${updates.join(', ')} WHERE id = ?`
    values.push(id)
    
    const result = await db.prepare(query).bind(...values).run()
    
    if (!result.success || result.meta.changes === 0) {
      return { success: false, message: 'Service not found or no changes made' }
    }
    
    return { success: true }
  } catch (error) {
    console.error('Error updating service:', error)
    return { success: false, message: 'Failed to update service' }
  }
}

// Delete a service
export async function deleteService(id: number) {
  const db = getDB()
  
  try {
    // Check if service is in use by any customers
    const inUse = await db.prepare(
      'SELECT COUNT(*) as count FROM customer_services WHERE service_id = ?'
    ).bind(id).first()
    
    if (inUse && inUse.count > 0) {
      return { 
        success: false, 
        message: 'Cannot delete service as it is currently assigned to customers' 
      }
    }
    
    const result = await db.prepare(
      'DELETE FROM services WHERE id = ?'
    ).bind(id).run()
    
    if (!result.success || result.meta.changes === 0) {
      return { success: false, message: 'Service not found' }
    }
    
    return { success: true }
  } catch (error) {
    console.error('Error deleting service:', error)
    return { success: false, message: 'Failed to delete service' }
  }
}

// Get services by category
export async function getServicesByCategory(category: string) {
  const db = getDB()
  
  try {
    const services = await db.prepare(
      'SELECT * FROM services WHERE category = ? ORDER BY price'
    ).bind(category).all()
    
    return { success: true, services: services.results }
  } catch (error) {
    console.error('Error fetching services by category:', error)
    return { success: false, message: 'Failed to fetch services' }
  }
}
