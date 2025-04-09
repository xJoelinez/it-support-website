'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Shield, Server, Users, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Secure IT Solutions for Your Business
              </h1>
              <p className="text-xl mb-8">
                Professional IT Support and Cyber Engineering services tailored for small to medium enterprises.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/services" passHref>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Explore Services
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/about" passHref>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    About Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md h-64 md:h-80">
                <div className="absolute inset-0 bg-blue-600 rounded-lg opacity-20 blur-xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield className="h-32 w-32 md:h-40 md:w-40 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-fit mb-4">
                <Server className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">IT Support</h3>
              <p className="text-muted-foreground mb-4">
                Comprehensive IT support services to keep your business running smoothly with minimal downtime.
              </p>
              <Link href="/services#it-support" className="text-blue-600 dark:text-blue-400 font-medium hover:underline inline-flex items-center">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full w-fit mb-4">
                <Shield className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Cyber Security</h3>
              <p className="text-muted-foreground mb-4">
                Protect your business from cyber threats with our advanced security solutions and monitoring.
              </p>
              <Link href="/services#cyber-security" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline inline-flex items-center">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-fit mb-4">
                <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Consulting</h3>
              <p className="text-muted-foreground mb-4">
                Strategic IT consulting to help your business leverage technology for growth and efficiency.
              </p>
              <Link href="/services#consulting" className="text-purple-600 dark:text-purple-400 font-medium hover:underline inline-flex items-center">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to secure your business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get in touch with our team of experts to discuss how we can help protect and optimize your IT infrastructure.
          </p>
          <Link href="/login" passHref>
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
