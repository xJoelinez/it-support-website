'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminNavbar from '@/components/admin/AdminNavbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BarChart, 
  Users, 
  FileText, 
  Settings, 
  Home,
  Shield,
  Server,
  Mail,
  Download,
  User
} from 'lucide-react'
import { getCurrentUser } from '@/lib/auth'

export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({
    customers: 128,
    services: 256,
    enquiries: 24
  })
  
  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    }
    
    fetchUser()
  }, [])

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminNavbar activeTab="dashboard" />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Dashboard content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <div className="flex items-center space-x-2">
                <Link href="/" passHref>
                  <Button variant="outline" size="sm">
                    <Home className="h-4 w-4 mr-2" />
                    View Website
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Welcome message */}
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Welcome back, {user?.name || 'Admin'}</h2>
                    <p className="text-muted-foreground">Here's what's happening with your business today</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Stats overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.customers}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500">↑ 12%</span> from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.services}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500">↑ 8%</span> from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">New Enquiries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.enquiries}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-red-500">↓ 4%</span> from last month
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Recent Enquiries</CardTitle>
                  <CardDescription>Latest customer enquiries received</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'John Smith', time: '2 hours ago', message: 'Interested in Cyber Security services for a mid-sized financial firm.' },
                      { name: 'Sarah Johnson', time: '5 hours ago', message: 'Looking for IT support for our new office location.' },
                      { name: 'Michael Chen', time: '1 day ago', message: 'Need help with cloud migration for our manufacturing business.' },
                      { name: 'Lisa Rodriguez', time: '2 days ago', message: 'Requesting a quote for security assessment services.' }
                    ].map((enquiry, i) => (
                      <div key={i} className="flex items-start pb-4 last:pb-0 last:border-0 border-b">
                        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <Mail className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium">{enquiry.name}</p>
                            <p className="text-xs text-muted-foreground">{enquiry.time}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{enquiry.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href="/admin/enquiries" passHref>
                    <Button variant="outline" className="w-full mt-4" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View All Enquiries
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Recent Customers</CardTitle>
                  <CardDescription>Latest customer accounts created</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Sarah Thompson', company: 'MediTech Solutions', time: '1 day ago', plan: 'Enterprise' },
                      { name: 'David Chen', company: 'Pinnacle Financial', time: '3 days ago', plan: 'Professional' },
                      { name: 'Jennifer Rodriguez', company: 'Rodriguez Legal', time: '1 week ago', plan: 'Professional' },
                      { name: 'Michael Okonkwo', company: 'Nexus Manufacturing', time: '2 weeks ago', plan: 'Enterprise' }
                    ].map((customer, i) => (
                      <div key={i} className="flex items-start pb-4 last:pb-0 last:border-0 border-b">
                        <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                          <User className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium">{customer.name}</p>
                            <p className="text-xs text-muted-foreground">{customer.time}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{customer.company} - {customer.plan} Plan</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href="/admin/customers" passHref>
                    <Button variant="outline" className="w-full mt-4" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      View All Customers
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
            
            {/* Export section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Export Data</CardTitle>
                <CardDescription>Download customer and enquiry data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Customers (CSV)
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Enquiries (CSV)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
