'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Server, Shield, Database, Cpu, Cloud, Users, ArrowRight } from 'lucide-react'

export default function Services() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-900 to-blue-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Comprehensive IT support and cyber engineering solutions tailored for small to medium enterprises.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="space-y-20">
            {/* IT Support */}
            <div id="it-support" className="scroll-mt-20">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3 flex justify-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-6 rounded-full">
                    <Server className="h-20 w-20 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-3xl font-bold mb-4">IT Support</h2>
                  <p className="text-lg mb-6">
                    Our comprehensive IT support services ensure your business operations run smoothly with minimal disruption. We provide proactive monitoring, rapid response times, and expert technical assistance.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 text-blue-600 dark:text-blue-400">
                        <Cpu className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Hardware Support</h3>
                        <p className="text-muted-foreground">Troubleshooting, maintenance, and repair for all your hardware devices.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 text-blue-600 dark:text-blue-400">
                        <Database className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Software Support</h3>
                        <p className="text-muted-foreground">Installation, configuration, and troubleshooting for business applications.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 text-blue-600 dark:text-blue-400">
                        <Cloud className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Network Management</h3>
                        <p className="text-muted-foreground">Setup, monitoring, and maintenance of your business network infrastructure.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 text-blue-600 dark:text-blue-400">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Help Desk</h3>
                        <p className="text-muted-foreground">Responsive support for your team's day-to-day technical issues.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cyber Security */}
            <div id="cyber-security" className="scroll-mt-20">
              <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                <div className="md:w-1/3 flex justify-center">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-6 rounded-full">
                    <Shield className="h-20 w-20 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-3xl font-bold mb-4">Cyber Security</h2>
                  <p className="text-lg mb-6">
                    Protect your business from evolving cyber threats with our comprehensive security solutions. We implement robust defenses to safeguard your sensitive data and critical infrastructure.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 text-indigo-600 dark:text-indigo-400">
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Security Assessments</h3>
                        <p className="text-muted-foreground">Comprehensive evaluation of your security posture to identify vulnerabilities.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 text-indigo-600 dark:text-indigo-400">
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Threat Monitoring</h3>
                        <p className="text-muted-foreground">24/7 monitoring and detection of potential security threats.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 text-indigo-600 dark:text-indigo-400">
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Incident Response</h3>
                        <p className="text-muted-foreground">Rapid response and recovery procedures for security incidents.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 text-indigo-600 dark:text-indigo-400">
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Security Training</h3>
                        <p className="text-muted-foreground">Employee education on security best practices and threat awareness.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Consulting */}
            <div id="consulting" className="scroll-mt-20">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3 flex justify-center">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-6 rounded-full">
                    <Users className="h-20 w-20 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-3xl font-bold mb-4">IT Consulting</h2>
                  <p className="text-lg mb-6">
                    Strategic IT consulting to help your business leverage technology for growth, efficiency, and competitive advantage. Our experts provide guidance tailored to your specific business needs.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 text-purple-600 dark:text-purple-400">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">IT Strategy</h3>
                        <p className="text-muted-foreground">Development of comprehensive IT strategies aligned with business goals.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 text-purple-600 dark:text-purple-400">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Digital Transformation</h3>
                        <p className="text-muted-foreground">Guidance on adopting new technologies to transform business processes.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 text-purple-600 dark:text-purple-400">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Compliance & Governance</h3>
                        <p className="text-muted-foreground">Ensuring IT operations meet regulatory requirements and industry standards.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 text-purple-600 dark:text-purple-400">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Technology Assessment</h3>
                        <p className="text-muted-foreground">Evaluation of current technology stack and recommendations for improvement.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to enhance your IT infrastructure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to discuss how our services can benefit your business.
          </p>
          <Link href="/login" passHref>
            <Button size="lg" className="bg-white text-indigo-900 hover:bg-gray-100">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
