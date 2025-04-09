import { NextRequest, NextResponse } from 'next/server'
import { requestPasswordReset } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body
    
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      )
    }
    
    const result = await requestPasswordReset(email)
    
    // Always return success to prevent email enumeration
    return NextResponse.json({ 
      success: true, 
      message: 'If your email exists in our system, you will receive a password reset link shortly.' 
    })
  } catch (error) {
    console.error('Password reset request API error:', error)
    // Still return success to prevent email enumeration
    return NextResponse.json({ 
      success: true, 
      message: 'If your email exists in our system, you will receive a password reset link shortly.' 
    })
  }
}
