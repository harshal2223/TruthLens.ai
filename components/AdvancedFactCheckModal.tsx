'use client'

import { useState, useEffect } from 'react'
import { X, Search, ExternalLink, AlertTriangle, CheckCircle, XCircle, Info, Clock, Globe, FileText, Building2, Plus, MessageSquare, History } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'

interface FactCheckResult {
  id: string
  claim: string
  verdict: 'TRUE' | 'FALSE' | 'PARTIALLY_TRUE' | 'MISLEADING' | 'UNVERIFIED'
  confidenceScore: number
  summary: string
  detailedAnalysis: string
  keyPoints: string[]
  context: string
  timeline: TimelineEvent[]
  sources: VerifiedSource[]
  relatedClaims: RelatedClaim[]
  governmentResponse?: string
  expertOpinions: ExpertOpinion[]
  sessionId: string
  createdAt: string
}

interface TimelineEvent {
  date: string
  event: string
  source: string
  sourceUrl: string
  verified: boolean
}

interface VerifiedSource {
  id: string
  name: string
  type: 'government' | 'academic' | 'media' | 'international' | 'ngo'
  url: string
  relevance: number
  excerpt: string
  publishDate: string
  credibilityScore: number
  accessDate: string
  documentType: string
  isGovernmentVerified: boolean
}

interface RelatedClaim {
  id: string
  claim: string
  verdict: string
  url: string
  similarity: number
}

interface ExpertOpinion {
  expert: string
  affiliation: string
  credentials: string
  opinion: string
  date: string
  contactInfo?: string
}

interface FactCheckSession {
  id: string
  userId?: string
  claims: FactCheckResult[]
  createdAt: string
  updatedAt: string
}

interface AdvancedFactCheckModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AdvancedFactCheckModal({ isOpen, onClose }: AdvancedFactCheckModalProps) {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<FactCheckResult[]>([])
  const [currentSession, setCurrentSession] = useState<string | null>(null)
  const [showContinueOption, setShowContinueOption] = useState(false)
  const [continueMode, setContinueMode] = useState(false)
  const [additionalContext, setAdditionalContext] = useState('')

  const handleFactCheck = async (isNewSession = false) => {
    if (!query.trim()) return
    
    setLoading(true)
    
    try {
      let endpoint = '/api/fact-check'
      let body: any = { claim: query.trim() }

      if (!isNewSession && currentSession && continueMode) {
        endpoint = '/api/fact-check/continue'
        body = {
          sessionId: currentSession,
          additionalClaim: query.trim()
        }
      } else if (currentSession && !isNewSession) {
        body.sessionId = currentSession
        body.additionalContext = additionalContext
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to process fact-check request')
      }

      const result: FactCheckResult = await response.json()
      
      if (isNewSession || !currentSession) {
        setResults([result])
        setCurrentSession(result.sessionId)
      } else {
        setResults(prev => [...prev, result])
      }
      
      setQuery('')
      setShowContinueOption(true)
      setContinueMode(false)
      setAdditionalContext('')
    } catch (error) {
      console.error('Fact-check error:', error)
      
      // Show user-friendly error message
      alert(`Fact-check failed: ${error instanceof Error ? error.message : 'Please try again'}`)
    } finally {
      setLoading(false)
    }
  }

  const handleNewSession = () => {
    setResults([])
    setCurrentSession(null)
    setShowContinueOption(false)
    setContinueMode(false)
    setAdditionalContext('')
    handleFactCheck(true)
  }

  const handleContinueSession = () => {
    setContinueMode(true)
    handleFactCheck(false)
  }

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'TRUE': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'FALSE': return <XCircle className="w-5 h-5 text-red-500" />
      case 'PARTIALLY_TRUE': return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'MISLEADING': return <AlertTriangle className="w-5 h-5 text-orange-500" />
      case 'UNVERIFIED': return <Info className="w-5 h-5 text-gray-500" />
      default: return <Info className="w-5 h-5 text-gray-500" />
    }
  }

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'TRUE': return 'bg-green-100 text-green-800 border-green-200'
      case 'FALSE': return 'bg-red-100 text-red-800 border-red-200'
      case 'PARTIALLY_TRUE': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'MISLEADING': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'UNVERIFIED': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'government': return <Building2 className="w-4 h-4 text-blue-600" />
      case 'academic': return <FileText className="w-4 h-4 text-purple-600" />
      case 'international': return <Globe className="w-4 h-4 text-green-600" />
      default: return <FileText className="w-4 h-4 text-gray-600" />
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900 font-playfair">
            Advanced AI Fact-Check Analysis
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 flex-1 overflow-auto">
          {/* Search Interface */}
          <div className="mb-6">
            <div className="flex space-x-4 mb-4">
              <Input
                placeholder="Enter a claim to fact-check with AI analysis..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && !loading && handleFactCheck()}
              />
              <Button 
                onClick={() => handleFactCheck()}
                disabled={loading || !query.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                {loading ? 'Analyzing...' : 'AI Fact Check'}
              </Button>
            </div>

            {/* Session Controls */}
            {showContinueOption && (
              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 text-blue-700">
                  <History className="w-4 h-4" />
                  <span className="text-sm font-medium">Continue this analysis or start fresh?</span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleContinueSession}
                    className="border-blue-300 text-blue-700 hover:bg-blue-100"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add to Analysis
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleNewSession}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <MessageSquare className="w-3 h-3 mr-1" />
                    New Session
                  </Button>
                </div>
              </div>
            )}

            {/* Additional Context Input */}
            {continueMode && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Context (Optional)
                </label>
                <Textarea
                  placeholder="Provide additional context or specific aspects you want to focus on..."
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  className="w-full"
                  rows={3}
                />
              </div>
            )}
          </div>

          {/* Results Display */}
          {results.length > 0 && (
            <div className="space-y-8">
              {results.map((result, index) => (
                <div key={result.id} className="border rounded-lg p-6">
                  {/* Result Header */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-500">
                          Analysis #{index + 1}
                        </span>
                        <Badge className={`${getVerdictColor(result.verdict)} flex items-center space-x-2`}>
                          {getVerdictIcon(result.verdict)}
                          <span>{result.verdict.replace('_', ' ')}</span>
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(result.createdAt).toLocaleString()}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      "{result.claim}"
                    </h3>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">AI Confidence Score</span>
                        <span className="text-sm font-bold text-blue-600">{result.confidenceScore}%</span>
                      </div>
                      <Progress value={result.confidenceScore} className="h-2" />
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed">{result.summary}</p>
                  </div>

                  {/* Detailed Analysis Tabs */}
                  <Tabs defaultValue="analysis" className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                      <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
                      <TabsTrigger value="sources">Gov Sources</TabsTrigger>
                      <TabsTrigger value="timeline">Timeline</TabsTrigger>
                      <TabsTrigger value="experts">Experts</TabsTrigger>
                      <TabsTrigger value="related">Related</TabsTrigger>
                    </TabsList>

                    <TabsContent value="analysis" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Comprehensive AI Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="prose max-w-none">
                            <div className="whitespace-pre-line text-gray-700 mb-6">
                              {result.detailedAnalysis}
                            </div>
                            
                            <h4 className="font-semibold text-gray-900 mb-3">Key Findings:</h4>
                            <ul className="space-y-2">
                              {result.keyPoints.map((point, idx) => (
                                <li key={idx} className="flex items-start space-x-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                  <span className="text-gray-700">{point}</span>
                                </li>
                              ))}
                            </ul>

                            {result.governmentResponse && (
                              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <h4 className="font-semibold text-blue-900 mb-2">Official Government Response:</h4>
                                <p className="text-blue-800">{result.governmentResponse}</p>
                              </div>
                            )}

                            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                              <h4 className="font-semibold text-gray-900 mb-2">Context & Background:</h4>
                              <p className="text-gray-700">{result.context}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="sources" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Government & Verified Sources</CardTitle>
                          <CardDescription>
                            Direct links to official government documents and verified sources
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {result.sources.map((source, idx) => (
                              <div key={idx} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex items-center space-x-3">
                                    {getSourceIcon(source.type)}
                                    <div>
                                      <h4 className="font-medium text-gray-900">{source.name}</h4>
                                      <div className="flex items-center space-x-2 mt-1">
                                        <Badge variant="outline" className="text-xs">
                                          {source.type.toUpperCase()}
                                        </Badge>
                                        {source.isGovernmentVerified && (
                                          <Badge className="bg-green-100 text-green-800 text-xs">
                                            GOV VERIFIED
                                          </Badge>
                                        )}
                                        <span className="text-xs text-gray-500">
                                          {source.documentType}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-3">
                                    <div className="text-right text-xs text-gray-500">
                                      <div>Credibility: {source.credibilityScore}%</div>
                                      <div>Relevance: {source.relevance}%</div>
                                    </div>
                                    <a
                                      href={source.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:text-blue-800 transition-colors"
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                    </a>
                                  </div>
                                </div>
                                <p className="text-gray-700 text-sm mb-2">{source.excerpt}</p>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                  <span>Published: {source.publishDate}</span>
                                  <span>Accessed: {source.accessDate}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="timeline" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Historical Timeline</CardTitle>
                          <CardDescription>
                            Chronological sequence of verified events and developments
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {result.timeline.map((event, idx) => (
                              <div key={idx} className="flex items-start space-x-4">
                                <div className="flex flex-col items-center">
                                  <div className={`w-3 h-3 rounded-full ${event.verified ? 'bg-green-500' : 'bg-gray-400'}`} />
                                  {idx < result.timeline.length - 1 && (
                                    <div className="w-0.5 h-16 bg-gray-300 mt-2" />
                                  )}
                                </div>
                                <div className="flex-1 pb-8">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-medium text-gray-900">{event.date}</span>
                                    <div className="flex items-center space-x-2">
                                      {event.verified && (
                                        <Badge className="bg-green-100 text-green-800 text-xs">
                                          VERIFIED
                                        </Badge>
                                      )}
                                      <a
                                        href={event.sourceUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 transition-colors"
                                      >
                                        <ExternalLink className="w-4 h-4" />
                                      </a>
                                    </div>
                                  </div>
                                  <p className="text-gray-700 mb-1">{event.event}</p>
                                  <p className="text-sm text-gray-500">{event.source}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="experts" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Expert Opinions</CardTitle>
                          <CardDescription>
                            Verified expert analysis and professional opinions
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {result.expertOpinions.map((opinion, idx) => (
                              <div key={idx} className="border rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <div>
                                    <h4 className="font-medium text-gray-900">{opinion.expert}</h4>
                                    <p className="text-sm text-gray-600">{opinion.affiliation}</p>
                                    <p className="text-xs text-gray-500">{opinion.credentials}</p>
                                  </div>
                                  <span className="text-sm text-gray-500">{opinion.date}</span>
                                </div>
                                <p className="text-gray-700">{opinion.opinion}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="related" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Related Fact-Checks</CardTitle>
                          <CardDescription>
                            Similar claims analyzed by our AI system
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {result.relatedClaims.map((claim, idx) => (
                              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="flex-1">
                                  <p className="text-gray-900 mb-1">{claim.claim}</p>
                                  <div className="flex items-center space-x-2">
                                    <Badge className={`${getVerdictColor(claim.verdict)} text-xs`}>
                                      {claim.verdict.replace('_', ' ')}
                                    </Badge>
                                    <span className="text-xs text-gray-500">
                                      {Math.round(claim.similarity * 100)}% similar
                                    </span>
                                  </div>
                                </div>
                                <a
                                  href={claim.url}
                                  className="text-blue-600 hover:text-blue-800 transition-colors ml-4"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}