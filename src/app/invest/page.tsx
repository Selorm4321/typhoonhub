
'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { FundingProject } from '@/lib/data';
import FundingProjectCard from '@/components/funding-project-card';
import { Clapperboard, Loader2 } from 'lucide-react';

export default function InvestPage() {
  const [projects, setProjects] = useState<FundingProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'productions'), where('status', '==', 'active'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const projectsData: FundingProject[] = [];
      querySnapshot.forEach((doc) => {
        projectsData.push({ id: doc.id, ...doc.data() } as FundingProject);
      });
      setProjects(projectsData);
      setLoading(false);
    }, (error) => {
        console.error("Error fetching productions:", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <Clapperboard className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 font-headline text-4xl font-bold">Invest in Independent Film</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Become a part of the next wave of cinema. Browse active productions and help bring these unique stories to life.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
      ) : projects.length > 0 ? (
        <div className="space-y-12">
          {projects.map((project) => (
            <FundingProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">No active investment opportunities right now.</p>
          <p className="text-sm text-muted-foreground">
            Please check back soon for new and exciting projects.
          </p>
        </div>
      )}
    </div>
  );
}
