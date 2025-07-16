'use client';

import { useState } from 'react';
import { Search, Shield, CheckCircle, AlertTriangle, XCircle, Sparkles, Globe, Users, TrendingUp, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { aiService } from '@/lib/ai-service';


export default function FactCheckPage() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFactCheck = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    
    try {
      const result = await aiService.processUserQuery(query);
      setResult(result);
    } catch (error) {
      console.error('Fact check failed:', error);
      alert('Fact check failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'true': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'false': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'mixed': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default: return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'true': return 'bg-green-100 text-green-800 border-green-200';
      case 'false': return 'bg-red-100 text-red-800 border-red-200';
      case 'mixed': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Shield className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TruthLens
                </h1>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/articles" className="text-gray-600 hover:text-blue-600 transition-colors">Articles</Link>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
              <Button variant="outline">Sign In</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-6 h-6 text-purple-500 mr-2" />
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              Advanced AI Analysis
            </Badge>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Verify Information with
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Advanced AI</span>
          </h2>
          
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Enter any statement or claim below and receive instant AI-powered analysis with 
            detailed explanations, confidence scores, and verified source attribution.
          </p>

          {/* Search Interface */}
          <div className="max-w-2xl mx-auto mb-12">
            <Card className="border-2 border-blue-100 shadow-xl">
              <CardContent className="p-6">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Enter a claim to fact-check..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleFactCheck()}
                      className="text-lg py-3 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                  <Button 
                    onClick={handleFactCheck}
                    disabled={isLoading || !query.trim()}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Analyzing...
                      </div>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Fact Check
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          {result && (
            <Card className="max-w-3xl mx-auto mb-12 border-2 shadow-xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Fact Check Result</CardTitle>
                  <div className="flex items-center space-x-2">
                    {getVerdictIcon(result.verdict)}
                    <Badge className={getVerdictColor(result.verdict)}>
                      {result.verdict.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Claim:</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg italic">"{result.claim}"</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Confidence Score:</h3>
                    <span className="text-lg font-bold text-blue-600">{result.confidence}%</span>
                  </div>
                  <Progress value={result.confidence} className="h-3" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Analysis:</h3>
                  <p className="text-gray-700 leading-relaxed">{result.explanation}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Verified Sources:</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {result.sources.map((source, index) => (
                      <Badge key={index} variant="outline" className="justify-start p-2">
                        <Globe className="w-3 h-3 mr-1" />
                        {source}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Example Claims */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Try These Example Claims</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "The global temperature has increased by 1.1°C since pre-industrial times",
                "Renewable energy accounts for 30% of global electricity generation",
                "The human brain uses 20% of the body's total energy",
                "Electric vehicles produce zero emissions"
              ].map((example, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setQuery(example)}>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-700">"{example}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}