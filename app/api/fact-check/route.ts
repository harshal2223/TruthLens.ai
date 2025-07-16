import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { SmartFactChecker } from '@/lib/smart-fact-checker'

export async function POST(request: NextRequest) {
  try {
    console.log('📥 Fact-check API request received')
    
    const session = await getServerSession(authOptions)
    const body = await request.json()
    const { claim, sessionId, additionalContext } = body

    console.log('🔍 Processing claim:', claim)

    if (!claim || claim.trim().length === 0) {
      console.log('❌ Empty claim provided')
      return NextResponse.json({ error: 'Claim is required' }, { status: 400 })
    }

    const smartFactChecker = SmartFactChecker.getInstance()
    
    console.log('🎯 Starting Smart AI analysis...')
    const result = await smartFactChecker.analyzeWithFormat({
      claim: claim.trim(),
      sessionId,
      userId: session?.user?.email,
      additionalContext
    })

    console.log('✅ Analysis completed successfully')
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ Fact-check API error:', error)
    
    // Return a structured error response
    return NextResponse.json(
      { 
        error: 'Analysis temporarily unavailable',
        message: 'Our fact-checking service is currently processing your request. Please try again in a moment.',
        suggestion: 'You can also try rephrasing your claim or checking our recent fact-checks for similar topics.',
        code: 'ANALYSIS_ERROR'
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 })
    }

    const factCheckAI = FactCheckAI.getInstance()
    const session = await factCheckAI.getSession(sessionId)

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    return NextResponse.json(session)
  } catch (error) {
    console.error('Session retrieval error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve session' },
      { status: 500 }
    )
  }
}