'use client';

import { useState } from 'react';
import VacatureCard from './VacatureCard';

interface Vacature {
    id: string;
    title: string;
    description: string;
    image?: string;
    link: string;
  }

interface RollenGridProps {
    vacatures: Vacature[];
  }

export default function RollenGrid({ vacatures }: RollenGridProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    return (
          <div className="grid grid-cols-2 gap-8 md:gap-6 sm:grid-cols-1">
            {vacatures.map((vacature) => (
                      <div
                        key={vacature.id}
                        className={expandedId === vacature.id ? 'col-span-full' : ''}
                      >
                        <VacatureCard
                          vacature={vacature}
                          isExpanded={expandedId === vacature.id}
                          onToggle={() =>
                                                  setExpandedId(expandedId === vacature.id ? null : vacature.id)
                                                }
                        />
                      </div>
                    ))}
          </div>
        );
  }
