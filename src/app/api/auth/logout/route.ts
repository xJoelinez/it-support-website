import { NextRequest, NextResponse } from 'next/server'
import { logoutUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Get session token from cookies
    const sessionToken = request.cookies.get('session')?.value
    
    if (!sessionToken) {
      return NextResponse.json(
        { success: true, message: 'Already logged out' }
      )
    }
    
    const result = await logoutUser(sessionToken)
    
    // Clear session cookie
    const response = NextResponse.json(result)
    response.cookies.delete('session')
    
    return response
  } catch (error) {
    console.error('Logout API error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred during logout' },
      { status: 500 }
    )
  }
}
