'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminNavbar from '@/components/admin/AdminNavbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Server, 
  Edit, 
  Trash, 
  Plus,
  Search,
  ArrowLeft
} from 'lucide-react'
import { getAllServices, createService, updateService, deleteService } from '@/lib/services'

export default function ServicesManagement() {
  const [services, setServices] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [editingService, setEditingService] = useState(null)
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    category: '',
    price: ''
  })
  const [showAddForm, setShowAddForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch services on component mount
  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await getAllServices()
      
      if (result.success) {
        setServices(result.services)
      } else {
        setError(result.message || 'Failed to fetch services')
      }
    } catch (err) {
      console.error('Error fetching services:', err)
      setError('An error occurred while fetching services')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEdit = (service) => {
    setEditingService({...service})
  }

  const handleDelete = async (id) => {
    try {
      const result = await deleteService(id)
      
      if (result.success) {
        // Remove the service from the state
        setServices(services.filter(service => service.id !== id))
      } else {
        setError(result.message || 'Failed to delete service')
      }
    } catch (err) {
      console.error('Error deleting service:', err)
      setError('An error occurred while deleting the service')
    }
  }

  const handleSaveEdit = async () => {
    try {
      const result = await updateService(editingService.id, {
        name: editingService.name,
        description: editingService.description,
        category: editingService.category,
        price: parseFloat(editingService.price)
      })
      
      if (result.success) {
        // Update the service in the state
        setServices(services.map(service => 
          service.id === editingService.id ? editingService : service
        ))
        setEditingService(null)
      } else {
        setError(result.message || 'Failed to update service')
      }
    } catch (err) {
      console.error('Error updating service:', err)
      setError('An error occurred while updating the service')
    }
  }

  const handleAddService = async () => {
    try {
      const result = await createService({
        name: newService.name,
        description: newService.description,
        category: newService.category,
        price: parseFloat(newService.price)
      })
      
      if (result.success) {
        // Add the new service to the state
        const newServiceWithId = { 
          ...newService, 
          id: result.id,
          price: parseFloat(newService.price)
        }
        setServices([...services, newServiceWithId])
        
        // Reset the form
        setNewService({
          name: '',
          description: '',
          category: '',
          price: ''
        })
        setShowAddForm(false)
      } else {
        setError(result.message || 'Failed to create service')
      }
    } catch (err) {
      console.error('Error creating service:', err)
      setError('An error occurred while creating the service')
    }
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminNavbar activeTab="services" />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Main content area */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Services Management</h1>
              <Link href="/admin" passHref>
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <p>{error}</p>
              </div>
            )}

            {/* Search and Add New */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search services..." 
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10"
                />
              </div>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setShowAddForm(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Service
              </Button>
            </div>

            {/* Services List */}
            <Card>
              <CardHeader>
                <CardTitle>Services</CardTitle>
                <CardDescription>Manage your service offerings</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-2 text-muted-foreground">Loading services...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Name</th>
                          <th className="text-left py-3 px-4 font-medium">Description</th>
                          <th className="text-left py-3 px-4 font-medium">Category</th>
                          <th className="text-left py-3 px-4 font-medium">Price</th>
                          <th className="text-right py-3 px-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredServices.map(service => (
                          <tr key={service.id} className="border-b">
                            <td className="py-3 px-4">{service.name}</td>
                            <td className="py-3 px-4 max-w-xs truncate">{service.description}</td>
                            <td className="py-3 px-4">{service.category}</td>
                            <td className="py-3 px-4">${service.price}</td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="ghost" size="sm" onClick={() => handleEdit(service)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDelete(service.id)}>
                                <Trash className="h-4 w-4 text-red-500" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                
                {!isLoading && filteredServices.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No services found matching your search criteria.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Add New Service Form */}
            {showAddForm && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Add New Service</CardTitle>
                  <CardDescription>Create a new service offering</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="name">Service Name</label>
                      <Input 
                        id="name" 
                        value={newService.name}
                        onChange={(e) => setNewService({...newService, name: e.target.value})}
                        placeholder="e.g., Network Security Audit"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <label htmlFor="description">Description</label>
                      <Textarea 
                        id="description" 
                        value={newService.description}
                        onChange={(e) => setNewService({...newService, description: e.target.value})}
                        placeholder="Describe the service..."
                        className="min-h-[100px]"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="category">Category</label>
                        <Input 
                          id="category" 
                          value={newService.category}
                          onChange={(e) => setNewService({...newService, category: e.target.value})}
                          placeholder="e.g., security, support, consulting"
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <label htmlFor="price">Price ($)</label>
                        <Input 
                          id="price" 
                          type="number"
                          value={newService.price}
                          onChange={(e) => setNewService({...newService, price: e.target.value})}
                          placeholder="e.g., 299"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 mt-2">
                      <Button variant="outline" onClick={() => setShowAddForm(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAddService}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Service
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Edit Service Modal */}
            {editingService && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <Card className="w-full max-w-md">
                  <CardHeader>
                    <CardTitle>Edit Service</CardTitle>
                    <CardDescription>Update service details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="edit-name">Service Name</label>
                        <Input 
                          id="edit-name" 
                          value={editingService.name}
                          onChange={(e) => setEditingService({...editingService, name: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <label htmlFor="edit-description">Description</label>
                        <Textarea 
                          id="edit-description" 
                          value={editingService.description}
                          onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                          className="min-h-[100px]"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <label htmlFor="edit-category">Category</label>
                          <Input 
                            id="edit-category" 
                            value={editingService.category}
                            onChange={(e) => setEditingService({...editingService, category: e.target.value})}
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <label htmlFor="edit-price">Price ($)</label>
                          <Input 
                            id="edit-price" 
                            type="number"
                            value={editingService.price}
                            onChange={(e) => setEditingService({...editingService, price: parseFloat(e.target.value)})}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2 mt-2">
                        <Button variant="outline" onClick={() => setEditingService(null)}>
                          Cancel
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveEdit}>
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
