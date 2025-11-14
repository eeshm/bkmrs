
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
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black p-4">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Logo & Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl  font-bold tracking-tight text-black dark:text-white">
            Stash
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-500">
            Internet brain
          </p>
        </div>

        {/* Action Card */}
        <div className="">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl">Get Started</CardTitle>
            <CardDescription>
              Choose how you'd like to begin your journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={onImport}
              className="w-full h-14 text-base font-medium shadow-lg shadow-gray-500/25 transition-all duration-300"
              size="lg"
            >
              <Chrome className="w-5 h-5 mr-2" />
              Import Bookmarks from Chrome
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              onClick={onStartFresh}
              variant="outline"
              className="w-full h-14 text-base font-medium border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              size="lg"
            >
              Start Fresh
            </Button>
          </CardContent>
        </div>

        {/* Privacy Note */}
        <Alert className="border-gray-200 dark:border-gray-800 bg-white dark:bg-black/50">
          <AlertDescription className="text-sm text-gray-600 dark:text-gray-400 text-center flex justify-center">
            Your local knowledge stash
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
