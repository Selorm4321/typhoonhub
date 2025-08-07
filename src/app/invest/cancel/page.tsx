
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle } from 'lucide-react';
import Link from 'next/link';

export default function InvestmentCancelPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-8 text-center">
        <div className="bg-yellow-600 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Investment Canceled</h1>
        
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <p className="text-gray-400 mb-4">
            Your investment process was canceled. No charges were made to your payment method.
          </p>
          <p className="text-sm text-gray-500">
            You can return anytime to support amazing film projects on Typhoon Hub!
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/invest" 
            className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition-all duration-200"
          >
            🎬 Return to Investment Opportunities
          </Link>
          <Link 
            href="/" 
            className="block w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded transition-all duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
