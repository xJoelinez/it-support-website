'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart, 
  CheckCircle, 
  Clock, 
  FileText, 
  ShieldCheck, 
  Zap 
} from 'lucide-react'

export default function TestimonialSlider() {
  const testimonials = [
    {
      name: "Sarah Thompson",
      position: "CTO, MediTech Solutions",
      company: "Healthcare",
      quote: "CyberShield IT transformed our IT infrastructure and significantly improved our security posture. Their team is responsive, knowledgeable, and truly understands the unique challenges of the healthcare sector.",
      service: "Cyber Security"
    },
    {
      name: "David Chen",
      position: "Operations Director, Pinnacle Financial",
      company: "Finance",
      quote: "Since partnering with CyberShield IT, we've experienced zero downtime and our team's productivity has increased dramatically. Their proactive approach to IT support has been a game-changer for our business.",
      service: "IT Support"
    },
    {
      name: "Jennifer Rodriguez",
      position: "Managing Partner, Rodriguez Legal",
      company: "Legal",
      quote: "The strategic IT consulting provided by CyberShield IT helped us modernize our practice while ensuring compliance with industry regulations. Their expertise has been invaluable to our growth.",
      service: "Consulting"
    },
    {
      name: "Michael Okonkwo",
      position: "CEO, Nexus Manufacturing",
      company: "Manufacturing",
      quote: "CyberShield IT's enterprise-level security solutions gave us peace of mind after experiencing a ransomware attack with our previous provider. Their incident response was swift and their preventative measures are robust.",
      service: "Cyber Security"
    },
    {
      name: "Lisa Yamamoto",
      position: "IT Manager, Horizon Architects",
      company: "Architecture",
      quote: "As a mid-sized firm with complex IT needs, we needed a partner who could scale with us. CyberShield IT has consistently delivered excellent support and strategic guidance as we've grown.",
      service: "IT Support"
    }
  ]

  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>What Our Clients Say</CardTitle>
        <CardDescription>
          Hear from businesses that have transformed their IT operations with our services
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="flex overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-muted/30 rounded-lg p-6 relative">
                    <div className="absolute -top-3 left-6 transform rotate-45 w-6 h-6 bg-muted/30"></div>
                    <p className="italic mb-4">"{testimonial.quote}"</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                      </div>
                      <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                        {testimonial.service}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-primary' : 'bg-muted'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="flex justify-between mt-4">
            <button 
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            <button 
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
