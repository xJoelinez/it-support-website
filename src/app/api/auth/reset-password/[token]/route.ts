import { NextRequest, NextResponse } from 'next/server'
import { resetPassword } from '@/lib/auth'

export async function POST(request: NextRequest, { params }: { params: { token: string } }) {
  try {
    const { token } = params
    const body = await request.json()
    const { password } = body
    
    if (!token || !password) {
      return NextResponse.json(
        { success: false, message: 'Token and new password are required' },
        { status: 400 }
      )
    }
    
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }
    
    const result = await resetPassword(token, password)
    
    if (result.success) {
      return NextResponse.json(result)
    } else {
      return NextResponse.json(
        { success: false, message: result.message || 'Password reset failed' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Password reset API error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred during password reset' },
      { status: 500 }
    )
  }
}
