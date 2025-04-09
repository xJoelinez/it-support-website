'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Shield, Server, Users, CheckCircle } from 'lucide-react'

export default function ServicePricing() {
  return (
    <div className="w-full">
      <Tabs defaultValue="monthly" className="w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Pricing Plans</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your business needs with our flexible pricing options.
          </p>
          <div className="flex justify-center mt-6">
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="annual">Annual (Save 15%)</TabsTrigger>
            </TabsList>
          </div>
        </div>
        
        <TabsContent value="monthly" className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <Card className="flex flex-col border-blue-200 dark:border-blue-900">
              <CardHeader className="pb-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-fit mb-4">
                  <Server className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Basic</CardTitle>
                <CardDescription>For small businesses getting started</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$299</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Remote IT support (business hours)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Basic security monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Email & phone support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Up to 10 devices</span>
                  </li>
                </ul>
                <button className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
                  Get Started
                </button>
              </CardContent>
            </Card>
            
            {/* Professional Plan */}
            <Card className="flex flex-col relative border-indigo-300 dark:border-indigo-800 shadow-lg">
              <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                POPULAR
              </div>
              <CardHeader className="pb-4">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full w-fit mb-4">
                  <Shield className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle>Professional</CardTitle>
                <CardDescription>For growing businesses with advanced needs</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$599</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>24/7 remote IT support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Advanced security monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Monthly security reports</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Up to 25 devices</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Quarterly IT consulting</span>
                  </li>
                </ul>
                <button className="w-full py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors">
                  Get Started
                </button>
              </CardContent>
            </Card>
            
            {/* Enterprise Plan */}
            <Card className="flex flex-col border-purple-200 dark:border-purple-900">
              <CardHeader className="pb-4">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-fit mb-4">
                  <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>For larger organizations with complex requirements</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$1,299</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>24/7 priority IT support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Comprehensive security suite</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Unlimited devices</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Monthly IT strategy sessions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>On-site support (8 hours/month)</span>
                  </li>
                </ul>
                <button className="w-full py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors">
                  Contact Sales
                </button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="annual" className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan Annual */}
            <Card className="flex flex-col border-blue-200 dark:border-blue-900">
              <CardHeader className="pb-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-fit mb-4">
                  <Server className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Basic</CardTitle>
                <CardDescription>For small businesses getting started</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$254</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">Save $540 annually</p>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Remote IT support (business hours)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Basic security monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Email & phone support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Up to 10 devices</span>
                  </li>
                </ul>
                <button className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
                  Get Started
                </button>
              </CardContent>
            </Card>
            
            {/* Professional Plan Annual */}
            <Card className="flex flex-col relative border-indigo-300 dark:border-indigo-800 shadow-lg">
              <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                POPULAR
              </div>
              <CardHeader className="pb-4">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full w-fit mb-4">
                  <Shield className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle>Professional</CardTitle>
                <CardDescription>For growing businesses with advanced needs</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$509</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">Save $1,080 annually</p>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>24/7 remote IT support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Advanced security monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Monthly security reports</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Up to 25 devices</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Quarterly IT consulting</span>
                  </li>
                </ul>
                <button className="w-full py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors">
                  Get Started
                </button>
              </CardContent>
            </Card>
            
            {/* Enterprise Plan Annual */}
            <Card className="flex flex-col border-purple-200 dark:border-purple-900">
              <CardHeader className="pb-4">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-fit mb-4">
                  <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>For larger organizations with complex requirements</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$1,104</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">Save $2,340 annually</p>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>24/7 priority IT support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Comprehensive security suite</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Unlimited devices</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Monthly IT strategy sessions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>On-site support (8 hours/month)</span>
                  </li>
                </ul>
                <button className="w-full py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors">
                  Contact Sales
                </button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
