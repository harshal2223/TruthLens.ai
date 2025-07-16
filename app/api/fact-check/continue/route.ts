import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { FactCheckAI } from '@/lib/fact-check-ai'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = await request.json()
    const { sessionId, additionalClaim } = body

    if (!sessionId || !additionalClaim) {
      return NextResponse.json(
        { error: 'Session ID and additional claim are required' },
        { status: 400 }
      )
    }

    const factCheckAI = FactCheckAI.getInstance()
    
    const result = await factCheckAI.continueSession(
      sessionId,
      additionalClaim.trim(),
      session?.user?.email
    )

    return NextResponse.json(result)
  } catch (error) {
    console.error('Continue session error:', error)
    return NextResponse.json(
      { error: 'Failed to continue fact-check session' },
      { status: 500 }
    )
  }
}