
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else {
      setTimeout(() => setLoading(false), 1000);
    }
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">📊 Investment Portfolio</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-lg font-semibold text-gray-400">Total Invested</h3>
            <p className="text-3xl font-bold text-green-400">$0.00</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-lg font-semibold text-gray-400">Active Investments</h3>
            <p className="text-3xl font-bold text-blue-400">0</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-lg font-semibold text-gray-400">Status</h3>
            <p className="text-3xl font-bold text-yellow-400">New Investor</p>
          </div>
        </div>

        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-400 mb-4">No Investments Yet</h3>
          <p className="text-gray-500 mb-6">Start investing in amazing film projects today!</p>
          <Link 
            href="/invest" 
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded"
          >
            Explore Investment Opportunities
          </Link>
        </div>
      </div>
    </div>
  );
}
