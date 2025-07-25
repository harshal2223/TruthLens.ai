import { Button } from '@/components/ui/button';
import { Shield, ArrowRight } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-gray-900 dark:text-white" />
              <span className="text-xl font-semibold text-gray-900 dark:text-white">TruthLens</span>
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

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          {/* Date and Category */}
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <span>December 2024</span>
            <span>Product</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-12 leading-tight">
            Introducing TruthLens
          </h1>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center space-x-6 mb-16">
            <Link href="/chat">
              <Button 
                size="lg"
                className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 rounded-full font-medium"
              >
                Try TruthLens
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="lg"
              className="px-8 py-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
            >
              Learn more →
            </Button>
          </div>

          {/* Description */}
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              We've trained a model called TruthLens which fact-checks claims in a conversational way. 
              The format makes it possible for TruthLens to provide comprehensive analysis with 11-point 
              verification, challenge misinformation, and provide verified sources.
            </p>

            {/* Key Features */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Comprehensive Analysis
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  11-point fact-checking format with data tables, project tracking, and verified sources
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Verified Sources
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Government data, audit reports, and credible journalism with proper attribution
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Real Perspective
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  No-nonsense analysis that exposes performative politics and provides real perspective
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}