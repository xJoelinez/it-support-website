'use client'

import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'

// This layout wraps all admin pages and ensures only admins can access them
export default function AdminLayout({ children }) {
  useEffect(() => {
    // Check if user is admin on client-side
    const checkAuth = async () => {
      try {
        await requireAdmin()
      } catch (error) {
        redirect('/login')
      }
    }
    
    checkAuth()
  }, [])

  return <>{children}</>
}
