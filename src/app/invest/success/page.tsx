
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    const productionId = searchParams.get('production_id');
    
    if (sessionId && productionId) {
      // Process the successful investment
      console.log('Processing investment:', { sessionId, productionId });
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-xl">Processing your investment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-8 text-center">
        <div className="bg-green-600 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">🎬 Investment Successful!</h1>
        
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Thank you for investing in independent cinema!</h2>
          <p className="text-gray-400 mb-4">
            Your investment has been processed successfully. You'll receive updates about the production progress.
          </p>
          <p className="text-sm text-gray-500">
            Welcome to the Typhoon Hub investor community!
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/invest" 
            className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded"
          >
            View Other Investment Opportunities
          </Link>
          <Link 
            href="/dashboard" 
            className="block w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded"
          >
            View Your Investment Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function InvestmentSuccessPage() {
  return (
     <div className="container mx-auto flex min-h-[80vh] items-center justify-center">
      <Suspense fallback={<Loader2 className="h-16 w-16 animate-spin text-primary" />}>
        <SuccessContent />
      </Suspense>
    </div>
  )
}
