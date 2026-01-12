'use client';

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { EXHIBITS, Exhibit } from '@/lib/exhibits';
import { PortalCard } from './PortalCard';
import { ExhibitDetail } from './ExhibitDetail';

export function AtlasGrid() {
  const [selectedExhibit, setSelectedExhibit] = useState<Exhibit | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EXHIBITS.map((exhibit) => (
          <PortalCard
            key={exhibit.id}
            exhibit={exhibit}
            onClick={() => setSelectedExhibit(exhibit)}
          />
        ))}
      </div>

      {/* Exhibit Detail Modal with Framer Motion shared layout */}
      <AnimatePresence>
        {selectedExhibit && (
          <ExhibitDetail
            exhibit={selectedExhibit}
            onClose={() => setSelectedExhibit(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
