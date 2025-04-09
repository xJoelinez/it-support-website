'use client'

import Link from 'next/link'
import { Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-6 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 mr-2" />
              <span className="text-lg font-bold">CyberShield IT</span>
            </div>
            <p className="text-sm">
              Providing professional IT Support and Cyber Engineering solutions for small to medium enterprises.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm hover:underline">Home</Link></li>
              <li><Link href="/services" className="text-sm hover:underline">Services</Link></li>
              <li><Link href="/about" className="text-sm hover:underline">About Us</Link></li>
              <li><Link href="/login" className="text-sm hover:underline">Client Portal</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>123 Tech Street</li>
              <li>Cyber City, CS 12345</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@cybershieldit.com</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} CyberShield IT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
