'use client';

import { useState } from 'react';
import { Search, Shield, CheckCircle, AlertTriangle, XCircle, Sparkles, Globe, Zap, Target, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ThemeToggle } from '@/components/theme-toggle';
import { aiService } from '@/lib/ai-service';

interface FactCheckResult {
  id: string;
  claim: string;
  verdict: 'true' | 'false' | 'mixed' | 'unverified';
  confidence: number;
  sources: string[];
  explanation: string;
  timestamp: string;
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<FactCheckResult | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const handleFactCheck = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    
    try {
      const aiResult = await aiService.processUserQuery(query);
      const result: FactCheckResult = {
        id: Date.now().toString(),
        claim: query,
        verdict: aiResult.verdict,
        confidence: aiResult.confidence,
        sources: aiResult.sources,
        explanation: aiResult.explanation,
        timestamp: new Date().toISOString()
      };
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
      case 'true': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'false': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'mixed': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      default: return <AlertTriangle className="w-5 h-5 text-slate-500" />;
    }
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'true': return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800';
      case 'false': return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800';
      case 'mixed': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800';
      default: return 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-950 dark:text-slate-300 dark:border-slate-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  TruthLens
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">AI Fact Checker</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="outline" className="hidden md:flex">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-950 dark:to-blue-950 px-4 py-2 rounded-full border border-purple-200 dark:border-purple-800">
              <Brain className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Powered by Advanced AI</span>
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          
          <h2 className="text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            Verify Facts with
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 dark:from-blue-400 dark:via-purple-400 dark:to-emerald-400 bg-clip-text text-transparent block mt-2">
              AI Precision
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            Combat misinformation with our cutting-edge AI fact-checking platform. Get instant, reliable 
            verification of claims with confidence scores and credible sources.
          </p>

          {/* Demo Disclaimer */}
          {showDisclaimer && (
            <div className="max-w-2xl mx-auto mb-12">
              <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-lg">
                        <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Enhanced Demo Mode</h4>
                        <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
                          This demonstration uses enhanced AI responses. For full production capabilities, 
                          add your OpenAI API key to activate GPT-4 powered fact-checking.
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowDisclaimer(false)}
                      className="text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900"
                    >
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Search Interface */}
          <div className="max-w-3xl mx-auto mb-16">
            <Card className="border-2 border-blue-100 dark:border-blue-900 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Enter any claim to fact-check..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleFactCheck()}
                      className="text-lg py-4 px-6 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-slate-800 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                  </div>
                  <Button 
                    onClick={handleFactCheck}
                    disabled={isLoading || !query.trim()}
                    size="lg"
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Analyzing...
                      </div>
                    ) : (
                      <>
                        <Target className="w-5 h-5 mr-2" />
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
            <Card className="max-w-4xl mx-auto mb-16 border-2 shadow-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-slate-900 dark:text-white">Analysis Result</CardTitle>
                  <div className="flex items-center space-x-3">
                    {getVerdictIcon(result.verdict)}
                    <Badge className={`${getVerdictColor(result.verdict)} px-4 py-2 text-sm font-semibold`}>
                      {result.verdict.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center">
                    <Search className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                    Claim Analyzed:
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 italic text-lg leading-relaxed">"{result.claim}"</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-slate-900 dark:text-white flex items-center">
                        <Target className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                        Confidence Score:
                      </h3>
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{result.confidence}%</span>
                    </div>
                    <Progress value={result.confidence} className="h-4" />
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-emerald-600 dark:text-emerald-400" />
                      Verified Sources:
                    </h3>
                    <div className="space-y-2">
                      {result.sources.map((source, index) => (
                        <Badge key={index} variant="outline" className="justify-start p-3 w-full bg-white dark:bg-slate-800 border-emerald-200 dark:border-emerald-800">
                          <Globe className="w-3 h-3 mr-2 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-slate-700 dark:text-slate-300">{source}</span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                    AI Analysis:
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">{result.explanation}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Example Claims */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-8">Try These Example Claims</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "The global temperature has increased by 1.1°C since pre-industrial times",
                "Renewable energy accounts for 30% of global electricity generation",
                "The human brain uses 20% of the body's total energy",
                "Electric vehicles produce zero emissions"
              ].map((example, index) => (
                <Card 
                  key={index} 
                  className="cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600" 
                  onClick={() => setQuery(example)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">"{example}"</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white dark:bg-slate-900 py-24 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">How TruthLens Works</h3>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Our advanced AI analyzes claims against verified sources to provide accurate fact-checking results in seconds.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Search className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-xl text-slate-900 dark:text-white mb-4">1. Enter Your Claim</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Type any statement or claim you want to verify into our intelligent search interface.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800 hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-xl text-slate-900 dark:text-white mb-4">2. AI Analysis</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Our advanced AI analyzes the claim against verified sources and scientific data in real-time.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 border-emerald-200 dark:border-emerald-800 hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-xl text-slate-900 dark:text-white mb-4">3. Get Results</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Receive a detailed verdict with confidence score, explanation, and verified sources instantly.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-16 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="w-8 h-8 text-blue-400" />
                <div>
                  <span className="text-2xl font-bold">TruthLens</span>
                  <p className="text-sm text-slate-400">AI Fact Checker</p>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Advanced AI-powered fact-checking to combat misinformation and reveal truth with precision.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-white">Product</h4>
              <ul className="space-y-3 text-slate-300">
                <li><a href="#how-it-works" className="hover:text-blue-400 transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-white">Company</h4>
              <ul className="space-y-3 text-slate-300">
                <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-white">Support</h4>
              <ul className="space-y-3 text-slate-300">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2025 TruthLens. All rights reserved. Revealing truth through advanced artificial intelligence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}