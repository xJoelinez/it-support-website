'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminNavbar from '@/components/admin/AdminNavbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Users, 
  Edit, 
  Trash, 
  Plus,
  Search,
  User,
  Shield,
  Server,
  ArrowLeft
} from 'lucide-react'
import { getAllCustomers, getCustomerById, updateCustomer, deleteCustomer, addServiceToCustomer, removeServiceFromCustomer } from '@/lib/customers'
import { getAllServices } from '@/lib/services'

export default function CustomersManagement() {
  const [customers, setCustomers] = useState([])
  const [services, setServices] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlan, setSelectedPlan] = useState('All')
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [customerDetails, setCustomerDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch customers on component mount
  useEffect(() => {
    fetchCustomers()
    fetchServices()
  }, [])

  const fetchCustomers = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await getAllCustomers()
      
      if (result.success) {
        setCustomers(result.customers)
      } else {
        setError(result.message || 'Failed to fetch customers')
      }
    } catch (err) {
      console.error('Error fetching customers:', err)
      setError('An error occurred while fetching customers')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchServices = async () => {
    try {
      const result = await getAllServices()
      
      if (result.success) {
        setServices(result.services)
      }
    } catch (err) {
      console.error('Error fetching services:', err)
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handlePlanFilter = (plan) => {
    setSelectedPlan(plan)
  }

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.company && customer.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    // For plan filtering, we'd need to determine the customer's plan from their services
    // This is a simplified version that assumes all customers match the plan filter
    const matchesPlan = selectedPlan === 'All'
    
    return matchesSearch && matchesPlan
  })

  const handleViewCustomer = async (customer) => {
    try {
      const result = await getCustomerById(customer.id)
      
      if (result.success) {
        setSelectedCustomer(customer)
        setCustomerDetails(result)
      } else {
        setError(result.message || 'Failed to fetch customer details')
      }
    } catch (err) {
      console.error('Error fetching customer details:', err)
      setError('An error occurred while fetching customer details')
    }
  }

  const handleDelete = async (id) => {
    try {
      const result = await deleteCustomer(id)
      
      if (result.success) {
        // Remove the customer from the state
        setCustomers(customers.filter(customer => customer.id !== id))
        if (selectedCustomer && selectedCustomer.id === id) {
          setSelectedCustomer(null)
          setCustomerDetails(null)
        }
      } else {
        setError(result.message || 'Failed to delete customer')
      }
    } catch (err) {
      console.error('Error deleting customer:', err)
      setError('An error occurred while deleting the customer')
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    })
  }

  const handleAddService = async (serviceId) => {
    if (!selectedCustomer) return
    
    try {
      const result = await addServiceToCustomer(selectedCustomer.id, serviceId)
      
      if (result.success) {
        // Refresh customer details
        handleViewCustomer(selectedCustomer)
      } else {
        setError(result.message || 'Failed to add service')
      }
    } catch (err) {
      console.error('Error adding service:', err)
      setError('An error occurred while adding the service')
    }
  }

  const handleRemoveService = async (customerServiceId) => {
    if (!selectedCustomer) return
    
    try {
      const result = await removeServiceFromCustomer(selectedCustomer.id, customerServiceId)
      
      if (result.success) {
        // Refresh customer details
        handleViewCustomer(selectedCustomer)
      } else {
        setError(result.message || 'Failed to remove service')
      }
    } catch (err) {
      console.error('Error removing service:', err)
      setError('An error occurred while removing the service')
    }
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminNavbar activeTab="customers" />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Main content area */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Customer Management</h1>
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

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search customers..." 
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant={selectedPlan === 'All' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => handlePlanFilter('All')}
                  >
                    All Plans
                  </Button>
                  <Button 
                    variant={selectedPlan === 'Basic' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => handlePlanFilter('Basic')}
                    className={selectedPlan === 'Basic' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                  >
                    Basic
                  </Button>
                  <Button 
                    variant={selectedPlan === 'Professional' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => handlePlanFilter('Professional')}
                    className={selectedPlan === 'Professional' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
                  >
                    Professional
                  </Button>
                  <Button 
                    variant={selectedPlan === 'Enterprise' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => handlePlanFilter('Enterprise')}
                    className={selectedPlan === 'Enterprise' ? 'bg-purple-600 hover:bg-purple-700' : ''}
                  >
                    Enterprise
                  </Button>
                </div>
              </div>
              
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </div>

            {/* Customers List */}
            <Card>
              <CardHeader>
                <CardTitle>Customers</CardTitle>
                <CardDescription>Manage your customer accounts</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-2 text-muted-foreground">Loading customers...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Customer</th>
                          <th className="text-left py-3 px-4 font-medium">Email</th>
                          <th className="text-left py-3 px-4 font-medium">Status</th>
                          <th className="text-left py-3 px-4 font-medium">Join Date</th>
                          <th className="text-right py-3 px-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCustomers.map(customer => (
                          <tr key={customer.id} className="border-b">
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                  <User className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                  <p className="font-medium">{customer.name}</p>
                                  <p className="text-xs text-muted-foreground">{customer.company || 'Individual'}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">{customer.email}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                customer.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                              }`}>
                                {customer.status === 'active' ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="py-3 px-4">{formatDate(customer.joinDate)}</td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="ghost" size="sm" onClick={() => handleViewCustomer(customer)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDelete(customer.id)}>
                                <Trash className="h-4 w-4 text-red-500" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                
                {!isLoading && filteredCustomers.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No customers found matching your search criteria.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Customer Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {/* Customer Profile */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Customer Profile</CardTitle>
                  <CardDescription>
                    {selectedCustomer ? 'View and edit customer details' : 'Select a customer to view details'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedCustomer ? (
                    <div className="space-y-6">
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                          <User className="h-10 w-10 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold">{selectedCustomer.name}</h3>
                        <p className="text-muted-foreground">{selectedCustomer.company || 'Individual'}</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Email:</span>
                          <span className="font-medium">{selectedCustomer.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Phone:</span>
                          <span className="font-medium">{selectedCustomer.phone || 'Not provided'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <span className="font-medium">{selectedCustomer.status === 'active' ? 'Active' : 'Inactive'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Join Date:</span>
                          <span className="font-medium">{formatDate(selectedCustomer.joinDate)}</span>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <Button className="w-full">Edit Profile</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      Select a customer from the list to view their profile.
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Customer Services */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Customer Services</CardTitle>
                  <CardDescription>
                    {selectedCustomer ? `Active services for ${selectedCustomer.name}` : 'Select a customer to view services'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedCustomer ? (
                    <div>
                      {customerDetails && customerDetails.services && customerDetails.services.length > 0 ? (
                        <div className="space-y-4 mb-6">
                          {customerDetails.services.map(service => (
                            <div key={service.id} className="flex items-start p-4 border rounded-lg">
                              <div className={`bg-${service.category === 'security' ? 'indigo' : 'blue'}-100 dark:bg-${service.category === 'security' ? 'indigo' : 'blue'}-900/30 p-2 rounded-full mr-4`}>
                                {service.category === 'security' ? (
                                  <Shield className={`h-5 w-5 text-${service.category === 'security' ? 'indigo' : 'blue'}-600 dark:text-${service.category === 'security' ? 'indigo' : 'blue'}-400`} />
                                ) : (
                                  <Server className={`h-5 w-5 text-${service.category === 'security' ? 'indigo' : 'blue'}-600 dark:text-${service.category === 'security' ? 'indigo' : 'blue'}-400`} />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between mb-1">
                                  <h4 className="font-medium">{service.name}</h4>
                                  <span className={`text-${service.status === 'active' ? 'green' : 'red'}-600 dark:text-${service.status === 'active' ? 'green' : 'red'}-400 text-sm`}>
                                    {service.status === 'active' ? 'Active' : 'Inactive'}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                                <div className="flex justify-between text-sm">
                                  <span>Renewal: {service.renewal_date ? formatDate(service.renewal_date) : 'Not set'}</span>
                                  <span className="font-medium">${service.price}/month</span>
                                </div>
                                <div className="mt-2 text-right">
                                  <Button variant="outline" size="sm" className="text-red-500" onClick={() => handleRemoveService(service.id)}>
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground mb-6">
                          No services assigned to this customer.
                        </div>
                      )}
                      
                      {/* Add Service dropdown */}
                      <div className="flex items-center space-x-2">
                        <select 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          onChange={(e) => e.target.value && handleAddService(parseInt(e.target.value))}
                          defaultValue=""
                        >
                          <option value="" disabled>Select a service to add</option>
                          {services.map(service => (
                            <option key={service.id} value={service.id}>
                              {service.name} - ${service.price}/month
                            </option>
                          ))}
                        </select>
                        <Button className="whitespace-nowrap">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Service
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      Select a customer from the list to view their services.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
