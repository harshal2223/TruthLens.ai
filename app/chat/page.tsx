'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic, Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';
import { aiService, type UserQueryResult } from '@/lib/ai-service';
import Link from 'next/link';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  result?: UserQueryResult;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await aiService.processUserQuery(input.trim());
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I've analyzed your claim and provided a comprehensive fact-check below.`,
        result,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Fact check failed:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Sorry, I encountered an error while fact-checking your claim. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'true': return 'text-green-600 dark:text-green-400';
      case 'false': return 'text-red-600 dark:text-red-400';
      case 'mixed': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const renderComprehensiveResult = (result: UserQueryResult) => {
    if (!result.comprehensive) return null;

    return (
      <div className="space-y-6 mt-6">
        {/* Basic Result */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Verdict</h3>
            <span className={`font-bold text-lg ${getVerdictColor(result.verdict)}`}>
              {result.verdict.toUpperCase()}
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            <strong>Confidence:</strong> {result.confidence}%
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            {result.explanation}
          </p>
        </div>

        {/* 🔴 Straight Talk */}
        <div className="border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-r-lg">
          <h3 className="text-red-800 dark:text-red-300 font-bold mb-3">
            🔴 Straight Talk
          </h3>
          <p className="text-red-700 dark:text-red-300 leading-relaxed">
            {result.comprehensive.straightTalk}
          </p>
        </div>

        {/* 🔵 Snapshot Table */}
        <div className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r-lg">
          <h3 className="text-blue-800 dark:text-blue-300 font-bold mb-4">
            🔵 Snapshot (Data Overview)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="border border-gray-300 dark:border-gray-600 p-3 text-left font-semibold text-gray-900 dark:text-white">Metric/Indicator</th>
                  <th className="border border-gray-300 dark:border-gray-600 p-3 text-left font-semibold text-gray-900 dark:text-white">Claim/Promise</th>
                  <th className="border border-gray-300 dark:border-gray-600 p-3 text-left font-semibold text-gray-900 dark:text-white">Ground Reality</th>
                  <th className="border border-gray-300 dark:border-gray-600 p-3 text-left font-semibold text-gray-900 dark:text-white">Implication</th>
                </tr>
              </thead>
              <tbody>
                {result.comprehensive.snapshot.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="border border-gray-300 dark:border-gray-600 p-3 font-medium text-gray-900 dark:text-white">{row.metric}</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">{row.claim}</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">{row.reality}</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3 text-sm text-gray-700 dark:text-gray-300">{row.implication}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 🟡 Claim vs Reality */}
        <div className="border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-r-lg">
          <h3 className="text-yellow-800 dark:text-yellow-300 font-bold mb-4">
            🟡 Claim vs Reality
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {result.comprehensive.claimVsReality.content}
          </p>
          <div className="space-y-3">
            {result.comprehensive.claimVsReality.claims.map((claim, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Promise:</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{claim.promise}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Reality:</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{claim.reality}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Source:</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{claim.source}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continue with other sections... */}
        {/* 🟠 Ground Reality */}
        <div className="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20 p-4 rounded-r-lg">
          <h3 className="text-orange-800 dark:text-orange-300 font-bold mb-4">
            🟠 What's Really Happening
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {result.comprehensive.groundReality}
          </p>
        </div>

        {/* ⚫ Stupid & Performative */}
        <div className="border-l-4 border-gray-800 dark:border-gray-400 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-r-lg">
          <h3 className="text-gray-800 dark:text-gray-300 font-bold mb-4">
            ⚫ What's Stupid & Performative
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {result.comprehensive.stupidPerformative}
          </p>
        </div>

        {/* 🟣 Real Perspective */}
        <div className="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r-lg">
          <h3 className="text-purple-800 dark:text-purple-300 font-bold mb-4">
            🟣 Real Perspective
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {result.comprehensive.realPerspective}
          </p>
        </div>

        {/* 🟢 Project Tracker (if available) */}
        {result.comprehensive.projectTracker && (
          <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r-lg">
            <h3 className="text-green-800 dark:text-green-300 font-bold mb-4">
              🟢 Project Tracker
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="border border-gray-300 dark:border-gray-600 p-3 text-left font-semibold text-gray-900 dark:text-white">Year</th>
                    <th className="border border-gray-300 dark:border-gray-600 p-3 text-left font-semibold text-gray-900 dark:text-white">Project</th>
                    <th className="border border-gray-300 dark:border-gray-600 p-3 text-left font-semibold text-gray-900 dark:text-white">Type</th>
                    <th className="border border-gray-300 dark:border-gray-600 p-3 text-left font-semibold text-gray-900 dark:text-white">Status</th>
                    <th className="border border-gray-300 dark:border-gray-600 p-3 text-left font-semibold text-gray-900 dark:text-white">Cost</th>
                    <th className="border border-gray-300 dark:border-gray-600 p-3 text-left font-semibold text-gray-900 dark:text-white">Outcome vs Promise</th>
                  </tr>
                </thead>
                <tbody>
                  {result.comprehensive.projectTracker.map((project, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">{project.year}</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 font-medium text-gray-900 dark:text-white">{project.projectName}</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">{project.type}</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">{project.status}</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">{project.cost}</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-sm text-gray-700 dark:text-gray-300">{project.outcomeVsPromise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 🟩 Solution */}
        <div className="border-l-4 border-green-600 bg-green-50 dark:bg-green-900/20 p-4 rounded-r-lg">
          <h3 className="text-green-800 dark:text-green-300 font-bold mb-4">
            🟩 Solution
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {result.comprehensive.solution}
          </p>
        </div>

        {/* 🔗 Verified Links */}
        <div className="border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r-lg">
          <h3 className="text-blue-800 dark:text-blue-300 font-bold mb-4">
            🔗 Verified Links
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {result.comprehensive.verifiedLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">{link.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{link.type} Source</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* 🧭 Related Topics */}
        <div className="border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-r-lg">
          <h3 className="text-indigo-800 dark:text-indigo-300 font-bold mb-4">
            🧭 Related Topics
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {result.comprehensive.relatedTopics.map((topic, index) => (
              <button
                key={index}
                onClick={() => setInput(topic)}
                className="text-left p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <p className="text-gray-700 dark:text-gray-300">{topic}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-800">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-gray-900 dark:text-white" />
                <span className="text-xl font-semibold text-gray-900 dark:text-white">TruthLens</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Interface */}
      <div className="flex flex-col h-[calc(100vh-80px)]">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 py-8">
            {messages.length === 0 ? (
              /* Welcome Screen */
              <div className="text-center py-16">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                  TruthLens
                </h1>
                
                {/* Example Prompts */}
                <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {[
                    "Smart Cities Mission in India is successful",
                    "Digital India has transformed governance",
                    "Clean India mission achieved its goals",
                    "India's infrastructure development is world-class"
                  ].map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(example)}
                      className="p-4 text-left bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                    >
                      <p className="text-gray-700 dark:text-gray-300 text-sm">"{example}"</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Messages */
              <div className="space-y-6">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-4xl w-full ${message.type === 'user' ? 'flex justify-end' : ''}`}>
                      {message.type === 'user' ? (
                        <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white p-4 rounded-lg max-w-2xl">
                          <p className="leading-relaxed">{message.content}</p>
                        </div>
                      ) : (
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 w-full">
                          <div className="flex items-start space-x-3 mb-4">
                            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                              <Shield className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white">TruthLens</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">AI Fact Checker</p>
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{message.content}</p>
                          {message.result && renderComprehensiveResult(message.result)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 max-w-2xl">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                          <Shield className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                          <span className="text-gray-600 dark:text-gray-300">Analyzing claim...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything"
                className="w-full pr-32 py-4 text-base border-gray-300 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400 bg-white dark:bg-gray-800 rounded-lg"
                disabled={isLoading}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                  disabled={isLoading}
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                  disabled={isLoading}
                >
                  <Mic className="w-4 h-4" />
                </Button>
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  size="sm"
                  className="h-8 w-8 p-0 bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-gray-900"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              TruthLens can make mistakes. Verify important information with official sources.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}