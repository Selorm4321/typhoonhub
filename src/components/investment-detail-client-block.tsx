'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Investment } from '@/lib/types/investment';
import InvestModal from './invest-modal';

export default function InvestmentDetailClientBlock({ investment }: { investment: Investment }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <InvestModal
        investment={investment}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <Button onClick={() => setIsModalOpen(true)} size="lg" className="mt-4 w-full">
        Invest Now
      </Button>
    </>
  );
}
