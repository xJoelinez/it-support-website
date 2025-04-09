'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { logout, getCurrentUser } from '@/lib/auth'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  BarChart, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  Home,
  Shield,
  Server,
  Bell,
  User,
  Mail,
  Download
} from 'lucide-react'

export default function AdminNavbar({ activeTab }) {
  const router = useRouter()
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    }
    
    fetchUser()
  }, [])
  
  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }
  
  return (
    <>
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-card border-r">
        <div className="flex items-center h-16 px-6 border-b">
          <Shield className="h-6 w-6 text-blue-600 mr-2" />
          <span className="font-bold">Admin Portal</span>
        </div>
        
        <div className="flex-1 overflow-auto py-4">
          <nav className="space-y-1 px-2">
            <Link href="/admin" passHref>
              <Button 
                variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'} 
                className="w-full justify-start"
              >
                <BarChart className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            
            <Link href="/admin/services" passHref>
              <Button 
                variant={activeTab === 'services' ? 'secondary' : 'ghost'} 
                className="w-full justify-start"
              >
                <Server className="h-4 w-4 mr-2" />
                Services
              </Button>
            </Link>
            
            <Link href="/admin/customers" passHref>
              <Button 
                variant={activeTab === 'customers' ? 'secondary' : 'ghost'} 
                className="w-full justify-start"
              >
                <Users className="h-4 w-4 mr-2" />
                Customers
              </Button>
            </Link>
            
            <Link href="/admin/enquiries" passHref>
              <Button 
                variant={activeTab === 'enquiries' ? 'secondary' : 'ghost'} 
                className="w-full justify-start"
              >
                <Mail className="h-4 w-4 mr-2" />
                Enquiries
              </Button>
            </Link>
            
            <Link href="/admin/settings" passHref>
              <Button 
                variant={activeTab === 'settings' ? 'secondary' : 'ghost'} 
                className="w-full justify-start"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
          </nav>
        </div>
        
        <div className="p-4 border-t">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium">{user?.name || 'Admin User'}</p>
              <p className="text-xs text-muted-foreground">{user?.email || 'admin@cybershieldit.com'}</p>
            </div>
          </div>
          <Button variant="outline" className="w-full justify-start" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t z-10">
        <div className="flex justify-around py-2">
          <Link href="/admin" passHref>
            <Button variant="ghost" size="sm" className="flex flex-col items-center">
              <BarChart className="h-5 w-5" />
              <span className="text-xs mt-1">Dashboard</span>
            </Button>
          </Link>
          
          <Link href="/admin/services" passHref>
            <Button variant="ghost" size="sm" className="flex flex-col items-center">
              <Server className="h-5 w-5" />
              <span className="text-xs mt-1">Services</span>
            </Button>
          </Link>
          
          <Link href="/admin/customers" passHref>
            <Button variant="ghost" size="sm" className="flex flex-col items-center">
              <Users className="h-5 w-5" />
              <span className="text-xs mt-1">Customers</span>
            </Button>
          </Link>
          
          <Link href="/admin/enquiries" passHref>
            <Button variant="ghost" size="sm" className="flex flex-col items-center">
              <Mail className="h-5 w-5" />
              <span className="text-xs mt-1">Enquiries</span>
            </Button>
          </Link>
          
          <Link href="/admin/settings" passHref>
            <Button variant="ghost" size="sm" className="flex flex-col items-center">
              <Settings className="h-5 w-5" />
              <span className="text-xs mt-1">Settings</span>
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Header */}
      <header className="h-16 border-b bg-card flex items-center justify-between px-6">
        <div className="flex items-center md:hidden">
          <Shield className="h-6 w-6 text-blue-600 mr-2" />
          <span className="font-bold">Admin Portal</span>
        </div>
        
        <div className="flex items-center ml-auto">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center ml-2 md:hidden">
            <User className="h-4 w-4 text-blue-600" />
          </div>
        </div>
      </header>
    </>
  )
}
