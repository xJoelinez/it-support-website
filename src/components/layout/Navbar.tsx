'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Shield, Server, Users, LogIn } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  
  const isActive = (path: string) => {
    return pathname === path ? 'bg-accent text-accent-foreground' : ''
  }

  return (
    <nav className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Shield className="h-8 w-8 mr-2" />
          <span className="text-xl font-bold">CyberShield IT</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2">
          <Link href="/" passHref>
            <Button variant="ghost" className={`${isActive('/')}`}>
              Home
            </Button>
          </Link>
          
          <Link href="/services" passHref>
            <Button variant="ghost" className={`${isActive('/services')}`}>
              <Server className="h-4 w-4 mr-2" />
              Services
            </Button>
          </Link>
          
          <Link href="/about" passHref>
            <Button variant="ghost" className={`${isActive('/about')}`}>
              <Users className="h-4 w-4 mr-2" />
              About Us
            </Button>
          </Link>
          
          <Link href="/login" passHref>
            <Button variant="outline" className="bg-accent/20 hover:bg-accent/30">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
