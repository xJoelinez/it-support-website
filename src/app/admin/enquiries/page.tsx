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
  Download,
  Mail,
  ArrowLeft
} from 'lucide-react'
import { getAllEnquiries, getEnquiriesByStatus, updateEnquiryStatus, deleteEnquiry, exportEnquiriesToCSV } from '@/lib/enquiries'

export default function EnquiriesManagement() {
  const [enquiries, setEnquiries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedEnquiry, setSelectedEnquiry] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch enquiries on component mount
  useEffect(() => {
    fetchEnquiries()
  }, [selectedStatus])

  const fetchEnquiries = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      let result;
      
      if (selectedStatus === 'All') {
        result = await getAllEnquiries()
      } else {
        result = await getEnquiriesByStatus(selectedStatus.toLowerCase())
      }
      
      if (result.success) {
        setEnquiries(result.enquiries)
      } else {
        setError(result.message || 'Failed to fetch enquiries')
      }
    } catch (err) {
      console.error('Error fetching enquiries:', err)
      setError('An error occurred while fetching enquiries')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleStatusChange = (status) => {
    setSelectedStatus(status)
  }

  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesSearch = 
      enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (enquiry.service && enquiry.service.toLowerCase().includes(searchTerm.toLowerCase())) ||
      enquiry.message.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesSearch
  })

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const result = await updateEnquiryStatus(id, newStatus.toLowerCase())
      
      if (result.success) {
        // Update the enquiry in the state
        setEnquiries(enquiries.map(enquiry => 
          enquiry.id === id ? {...enquiry, status: newStatus.toLowerCase()} : enquiry
        ))
        
        // Update selected enquiry if it's the one being modified
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry({...selectedEnquiry, status: newStatus.toLowerCase()})
        }
      } else {
        setError(result.message || 'Failed to update enquiry status')
      }
    } catch (err) {
      console.error('Error updating enquiry status:', err)
      setError('An error occurred while updating the enquiry status')
    }
  }

  const handleDelete = async (id) => {
    try {
      const result = await deleteEnquiry(id)
      
      if (result.success) {
        // Remove the enquiry from the state
        setEnquiries(enquiries.filter(enquiry => enquiry.id !== id))
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry(null)
        }
      } else {
        setError(result.message || 'Failed to delete enquiry')
      }
    } catch (err) {
      console.error('Error deleting enquiry:', err)
      setError('An error occurred while deleting the enquiry')
    }
  }

  const handleViewEnquiry = (enquiry) => {
    setSelectedEnquiry(enquiry)
  }

  const exportToCSV = async () => {
    try {
      const result = await exportEnquiriesToCSV()
      
      if (result.success) {
        // Create a blob from the CSV data
        const blob = new Blob([result.csv], { type: 'text/csv;charset=utf-8;' })
        
        // Create a download link and trigger the download
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `enquiries_${new Date().toISOString().split('T')[0]}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        setError(result.message || 'Failed to export enquiries')
      }
    } catch (err) {
      console.error('Error exporting enquiries:', err)
      setError('An error occurred while exporting enquiries')
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminNavbar activeTab="enquiries" />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Main content area */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Enquiries Management</h1>
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
                    placeholder="Search enquiries..." 
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant={selectedStatus === 'All' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => handleStatusChange('All')}
                  >
                    All
                  </Button>
                  <Button 
                    variant={selectedStatus === 'New' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => handleStatusChange('New')}
                    className={selectedStatus === 'New' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                  >
                    New
                  </Button>
                  <Button 
                    variant={selectedStatus === 'Contacted' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => handleStatusChange('Contacted')}
                    className={selectedStatus === 'Contacted' ? 'bg-amber-600 hover:bg-amber-700' : ''}
                  >
                    Contacted
                  </Button>
                  <Button 
                    variant={selectedStatus === 'Closed' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => handleStatusChange('Closed')}
                    className={selectedStatus === 'Closed' ? 'bg-green-600 hover:bg-green-700' : ''}
                  >
                    Closed
                  </Button>
                </div>
              </div>
              
              <Button onClick={exportToCSV}>
                <Download className="h-4 w-4 mr-2" />
                Export to CSV
              </Button>
            </div>

            {/* Enquiries List */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Enquiries</CardTitle>
                <CardDescription>Manage and respond to customer enquiries</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-2 text-muted-foreground">Loading enquiries...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Date</th>
                          <th className="text-left py-3 px-4 font-medium">Name</th>
                          <th className="text-left py-3 px-4 font-medium">Email</th>
                          <th className="text-left py-3 px-4 font-medium">Service</th>
                          <th className="text-left py-3 px-4 font-medium">Status</th>
                          <th className="text-right py-3 px-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEnquiries.map(enquiry => (
                          <tr key={enquiry.id} className="border-b cursor-pointer hover:bg-muted/50" onClick={() => handleViewEnquiry(enquiry)}>
                            <td className="py-3 px-4">{formatDate(enquiry.created_at)}</td>
                            <td className="py-3 px-4">{enquiry.name}</td>
                            <td className="py-3 px-4">{enquiry.email}</td>
                            <td className="py-3 px-4">{enquiry.service || 'Not specified'}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                enquiry.status === 'new' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                                enquiry.status === 'contacted' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                                'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                              }`}>
                                {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                              <div className="flex justify-end space-x-2">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Mail className="h-4 w-4 text-blue-600" />
                                </Button>
                                <select 
                                  className="h-8 px-2 rounded-md border border-input bg-background text-sm"
                                  value={enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
                                  onChange={(e) => handleUpdateStatus(enquiry.id, e.target.value)}
                                >
                                  <option value="New">New</option>
                                  <option value="Contacted">Contacted</option>
                                  <option value="Closed">Closed</option>
                                </select>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleDelete(enquiry.id)}>
                                  <Trash className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                
                {!isLoading && filteredEnquiries.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No enquiries found matching your search criteria.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Enquiry Details */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Enquiry Details</CardTitle>
                <CardDescription>View complete enquiry information</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedEnquiry ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Name</h3>
                        <p>{selectedEnquiry.name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                        <p>{selectedEnquiry.email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone</h3>
                        <p>{selectedEnquiry.phone || 'Not provided'}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Service</h3>
                        <p>{selectedEnquiry.service || 'Not specified'}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Date</h3>
                        <p>{formatDate(selectedEnquiry.created_at)}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
                        <select 
                          className="h-8 px-2 rounded-md border border-input bg-background text-sm"
                          value={selectedEnquiry.status.charAt(0).toUpperCase() + selectedEnquiry.status.slice(1)}
                          onChange={(e) => handleUpdateStatus(selectedEnquiry.id, e.target.value)}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Message</h3>
                      <div className="border rounded-md p-4 bg-muted/20">
                        <p>{selectedEnquiry.message}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline">
                        <Mail className="h-4 w-4 mr-2" />
                        Reply
                      </Button>
                      <Button variant="outline" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(selectedEnquiry.id)}>
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Select an enquiry from the list above to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
