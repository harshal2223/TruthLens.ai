import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { FactCheckAI } from '@/lib/fact-check-ai'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = await request.json()
    const { articleId, specificClaims } = body

    if (!articleId) {
      return NextResponse.json({ error: 'Article ID is required' }, { status: 400 })
    }

    // Get the article
    const article = await prisma.article.findUnique({
      where: { id: parseInt(articleId) },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        tags: true,
      },
    })

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    const factCheckAI = FactCheckAI.getInstance()
    
    // If specific claims are provided, analyze those
    if (specificClaims && specificClaims.length > 0) {
      const results = []
      for (const claim of specificClaims) {
        const result = await factCheckAI.analyzeClaimWithAI({
          claim: claim.trim(),
          userId: session?.user?.email,
          additionalContext: `This claim is from the article: "${article.title}" by ${article.author.name}`
        })
        results.push(result)
      }
      return NextResponse.json({ results, article })
    }

    // Otherwise, extract and analyze claims from the article content
    const extractedClaims = await extractClaimsFromArticle(article.contentMd)
    const results = []
    
    for (const claim of extractedClaims) {
      const result = await factCheckAI.analyzeClaimWithAI({
        claim: claim.trim(),
        userId: session?.user?.email,
        additionalContext: `This claim is from the article: "${article.title}" by ${article.author.name}`
      })
      results.push(result)
    }

    return NextResponse.json({ results, article, extractedClaims })
  } catch (error) {
    console.error('Article analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze article' },
      { status: 500 }
    )
  }
}

async function extractClaimsFromArticle(content: string): Promise<string[]> {
  // AI-powered claim extraction from article content
  // This would use NLP to identify factual claims in the article
  
  const claims: string[] = []
  
  // Simple implementation - extract sentences that contain factual indicators
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20)
  
  const factualIndicators = [
    'according to',
    'statistics show',
    'data reveals',
    'study found',
    'research indicates',
    'government announced',
    'official report',
    'survey conducted',
    'analysis shows',
    'evidence suggests',
    'experts say',
    'officials stated',
    'ministry confirmed',
    'parliament passed',
    'policy states',
    'law requires',
    'regulation mandates',
    'budget allocates',
    'spending increased',
    'growth rate',
    'percentage of',
    'number of',
    'amount of',
    'compared to',
    'higher than',
    'lower than',
    'increased by',
    'decreased by'
  ]
  
  for (const sentence of sentences) {
    const lowerSentence = sentence.toLowerCase()
    if (factualIndicators.some(indicator => lowerSentence.includes(indicator))) {
      claims.push(sentence.trim())
    }
  }
  
  // Limit to top 5 most relevant claims
  return claims.slice(0, 5)
}