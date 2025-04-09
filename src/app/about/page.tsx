'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Users, Shield, Award, Building, ArrowRight } from 'lucide-react'

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We are a team of dedicated IT professionals committed to providing exceptional IT support and cyber engineering solutions.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Company</h2>
              <p className="text-lg mb-4">
                CyberShield IT was founded with a mission to provide small to medium enterprises with enterprise-grade IT support and cyber security solutions at affordable prices.
              </p>
              <p className="text-lg mb-4">
                With over a decade of experience in the industry, our team has developed a deep understanding of the unique challenges faced by growing businesses in today's digital landscape.
              </p>
              <p className="text-lg mb-4">
                We believe that every business, regardless of size, deserves access to top-tier IT infrastructure and security. Our tailored solutions are designed to scale with your business, providing the support you need at every stage of growth.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md h-64 md:h-80">
                <div className="absolute inset-0 bg-blue-600 rounded-lg opacity-20 blur-xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building className="h-32 w-32 md:h-40 md:w-40 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-md text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-fit mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Security First</h3>
              <p className="text-muted-foreground">
                We prioritize the security of your data and systems in everything we do, implementing robust protections to keep your business safe.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-md text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-fit mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Client Partnership</h3>
              <p className="text-muted-foreground">
                We view ourselves as partners in your success, working collaboratively to understand your business needs and deliver tailored solutions.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-md text-center">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full w-fit mx-auto mb-4">
                <Award className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-muted-foreground">
                We are committed to delivering excellence in every aspect of our service, from technical expertise to customer support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-md text-center">
              <div className="w-32 h-32 bg-blue-100 dark:bg-blue-900/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-16 w-16 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-1">John Smith</h3>
              <p className="text-blue-600 dark:text-blue-400 mb-3">CEO & Founder</p>
              <p className="text-muted-foreground">
                With 15+ years in IT security, John leads our team with expertise in enterprise security architecture and business strategy.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-md text-center">
              <div className="w-32 h-32 bg-purple-100 dark:bg-purple-900/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-16 w-16 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-1">Sarah Johnson</h3>
              <p className="text-purple-600 dark:text-purple-400 mb-3">CTO</p>
              <p className="text-muted-foreground">
                Sarah brings deep technical knowledge in network infrastructure and cloud solutions, ensuring our services leverage cutting-edge technology.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-md text-center">
              <div className="w-32 h-32 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-16 w-16 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-1">Michael Chen</h3>
              <p className="text-indigo-600 dark:text-indigo-400 mb-3">Head of Cyber Security</p>
              <p className="text-muted-foreground">
                Michael specializes in threat detection and incident response, leading our security operations with precision and expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to work with us?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact our team today to discuss how we can support your business IT needs.
          </p>
          <Link href="/login" passHref>
            <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
