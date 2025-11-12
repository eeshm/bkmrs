
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Bookmark, Chrome, Sparkles, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onImport: () => void;
  onStartFresh: () => void;
}

export function WelcomeScreen({ onImport, onStartFresh }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-lienar-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Logo & Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20 mb-4">
            <Bookmark className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Welcome to Floatmark
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Your bookmarks, beautifully organized.
          </p>
        </div>

        {/* Action Card */}
        <Card className="border-slate-200 dark:border-slate-800 shadow-xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl">Get Started</CardTitle>
            <CardDescription>
              Choose how you'd like to begin your journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={onImport}
              className="w-full h-14 text-base font-medium bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 transition-all duration-300"
              size="lg"
            >
              <Chrome className="w-5 h-5 mr-2" />
              Import Bookmarks from Chrome
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              onClick={onStartFresh}
              variant="outline"
              className="w-full h-14 text-base font-medium border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
              size="lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Fresh
            </Button>
          </CardContent>
        </Card>

        {/* Privacy Note */}
        <Alert className="border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <AlertDescription className="text-sm text-slate-600 dark:text-slate-400 text-center">
            🔒 We never upload bookmarks without your consent. Everything stays local.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
