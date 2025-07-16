'use client'

import { useState } from 'react'
import { Search, FileText, AlertTriangle, CheckCircle, XCircle, Info, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'

interface ArticleAnalyzerProps {
  articleId: number
  articleTitle: string
}

interface FactCheckResult {
  id: string
  claim: string
  verdict: 'TRUE' | 'FALSE' | 'PARTIALLY_TRUE' | 'MISLEADING' | 'UNVERIFIED'
  confidenceScore: number
  summary: string
  detailedAnalysis: string
  keyPoints: string[]
  sources: any[]
}

export default function ArticleAnalyzer({ articleId, articleTitle }: ArticleAnalyzerProps) {
  const [analyzing, setAnalyzing] = useState(false)
  const [results, setResults] = useState<FactCheckResult[]>([])
  const [extractedClaims, setExtractedClaims] = useState<string[]>([])

  const analyzeArticle = async () => {
    setAnalyzing(true)
    
    try {
      const response = await fetch('/api/articles/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ articleId }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze article')
      }

      const data = await response.json()
      setResults(data.results)
      setExtractedClaims(data.extractedClaims || [])
    } catch (error) {
      console.error('Analysis error:', error)
    } finally {
      setAnalyzing(false)
    }
  }

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'TRUE': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'FALSE': return <XCircle className="w-4 h-4 text-red-500" />
      case 'PARTIALLY_TRUE': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'MISLEADING': return <AlertTriangle className="w-4 h-4 text-orange-500" />
      case 'UNVERIFIED': return <Info className="w-4 h-4 text-gray-500" />
      default: return <Info className="w-4 h-4 text-gray-500" />
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

  const calculateOverallScore = () => {
    if (results.length === 0) return 0
    return Math.round(results.reduce((sum, result) => sum + result.confidenceScore, 0) / results.length)
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-2 font-playfair">
            AI Article Analysis
          </h2>
          <p className="text-gray-400">
            Comprehensive fact-checking analysis of this article
          </p>
        </div>
        <Button
          onClick={analyzeArticle}
          disabled={analyzing}
          className="bg-[#1DE9B6] text-black hover:bg-[#1DE9B6]/90"
        >
          {analyzing ? (
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
          ) : (
            <Search className="w-4 h-4 mr-2" />
          )}
          {analyzing ? 'Analyzing...' : 'Analyze Article'}
        </Button>
      </div>

      {results.length > 0 && (
        <div className="space-y-6">
          {/* Overall Score */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Overall Analysis Score</CardTitle>
              <CardDescription className="text-gray-400">
                Based on {results.length} fact-checked claims
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Credibility Score</span>
                <span className="text-[#1DE9B6] font-bold text-lg">{calculateOverallScore()}%</span>
              </div>
              <Progress value={calculateOverallScore()} className="h-3" />
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                {['TRUE', 'FALSE', 'PARTIALLY_TRUE', 'MISLEADING', 'UNVERIFIED'].map(verdict => {
                  const count = results.filter(r => r.verdict === verdict).length
                  return (
                    <div key={verdict} className="text-center">
                      <div className="text-white font-bold text-lg">{count}</div>
                      <div className="text-gray-400 text-xs">{verdict.replace('_', ' ')}</div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Results */}
          <div className="space-y-4">
            {results.map((result, index) => (
              <Card key={result.id} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">
                      Claim #{index + 1}
                    </CardTitle>
                    <Badge className={`${getVerdictColor(result.verdict)} flex items-center space-x-1`}>
                      {getVerdictIcon(result.verdict)}
                      <span className="text-xs">{result.verdict.replace('_', ' ')}</span>
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-300 italic">
                    "{result.claim}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-300 text-sm">Confidence</span>
                        <span className="text-[#1DE9B6] font-bold">{result.confidenceScore}%</span>
                      </div>
                      <Progress value={result.confidenceScore} className="h-2" />
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-2">Analysis Summary</h4>
                      <p className="text-gray-300 text-sm">{result.summary}</p>
                    </div>

                    <Tabs defaultValue="analysis" className="w-full">
                      <TabsList className="grid w-full grid-cols-3 bg-gray-700">
                        <TabsTrigger value="analysis" className="text-gray-300">Analysis</TabsTrigger>
                        <TabsTrigger value="sources" className="text-gray-300">Sources</TabsTrigger>
                        <TabsTrigger value="points" className="text-gray-300">Key Points</TabsTrigger>
                      </TabsList>

                      <TabsContent value="analysis" className="mt-4">
                        <div className="text-gray-300 text-sm whitespace-pre-line">
                          {result.detailedAnalysis}
                        </div>
                      </TabsContent>

                      <TabsContent value="sources" className="mt-4">
                        <div className="space-y-2">
                          {result.sources.map((source, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                              <div>
                                <div className="text-white text-sm font-medium">{source.name}</div>
                                <div className="text-gray-400 text-xs">{source.type}</div>
                              </div>
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#1DE9B6] hover:text-[#1DE9B6]/80"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="points" className="mt-4">
                        <ul className="space-y-2">
                          {result.keyPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-[#1DE9B6] rounded-full mt-2 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}