'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Vacature {
      id: string;
      title: string;
      description: string;
      image?: string;
      link: string;
}

interface VacatureCardProps {
      vacature: Vacature;
      isExpanded: boolean;
      onToggle: () => void;
}

export default function VacatureCard({
      vacature,
      isExpanded,
      onToggle,
}: VacatureCardProps) {
      return (
              <div
                        className={`bg-[#3b696d] text-white overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer ${
                                    isExpanded ? '' : ''
                        }`}
                        onClick={onToggle}
                      >
                  {/* Image section */}
                  {vacature.image && (
                                  <div
                                                className={`relative ${
                                                                isExpanded ? 'w-full h-64' : 'w-40 h-48 absolute -top-12 -right-8'
                                                }`}
                                              >
                                            <Image
                                                            src={vacature.image}
                                                            alt={vacature.title}
                                                            fill
                                                            className="object-cover"
                                                          />
                                  </div>div>
                    )}
              
                  {/* Content */}
                    <div className={isExpanded ? 'p-8' : 'p-8 pr-56'}>
                            <h3 className="text-xl font-bold mb-3" style={{ color: '#fff' }}>
                                {vacature.title}
                            </h3>h3>
                    
                            <p className="text-sm mb-4 text-gray-100 leading-relaxed">
                                {vacature.description}
                            </p>p>
                    
                            <Link
                                          href={vacature.link}
                                          className="inline-block bg-[#fcf8bd] text-[#3b696d] px-5 py-2 font-bold hover:bg-white transition"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                      Solliciteer direct
                            </Link>Link>
                    </div>div>
              
                  {/* Close button - only in expanded */}
                  {isExpanded && (
                                  <button
                                                className="absolute top-4 right-4 w-8 h-8 bg-[#fcf8bd] text-[#3b696d] rounded-full font-bold text-lg hover:bg-white transition z-10"
                                                onClick={(e) => {
                                                                e.stopPropagation();
                                                                onToggle();
                                                }}
                                              >
                                            ×
                                  </button>button>
                    )}
              </div>div>
            );
}</div>'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Vacature {
    id: string;
    title: string;
    description: string;
    image?: string;
    link: string;
}

export default function VacatureCard({ vacature }: { vacature: Vacature }) {
    const [isExpanded, setIsExpanded] = useState(false);
  
    const handleClick = (e: React.MouseEvent) => {
          // Don't toggle if clicking on a link or button
          if ((e.target as HTMLElement).closest('a') || (e.target as HTMLElement).closest('button')) {
                  return;
          }
          setIsExpanded(!isExpanded);
    };
  
    const handleClose = (e: React.MouseEvent) => {
          e.stopPropagation();
          setIsExpanded(false);
    };
  
    return (
          <div
                  className={`bg-white overflow-hidden shadow hover:shadow-lg transition-shadow cursor-pointer ${
                            isExpanded ? 'col-span-full' : ''
                  }`}
                  onClick={handleClick}
                >
            {/* Image - full width when expanded, absolute positioned when collapsed */}
            {vacature.image && (
                          <div className={isExpanded ? 'relative w-full h-64' : 'relative w-full h-48 bg-gray-200'}>
                                    <Image
                                                  src={vacature.image}
                                                  alt={vacature.title}
                                                  fill
                                                  className={`object-cover ${!isExpanded ? 'absolute -top-20 -right-12' : ''}`}
                                                />
                          </div>div>
                )}
          
            {/* Content */}
                <div className={`p-6 ${isExpanded ? 'pt-6' : 'pt-40'}`}>
                        <h3 className="text-lg font-bold mb-2" style={{ color: '#3b696d' }}>
                          {vacature.title}
                        </h3>h3>
                
                        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                          {vacature.description}
                        </p>p>
                
                        <Link
                                    href={vacature.link}
                                    className="inline-block bg-yellow-300 text-gray-800 px-4 py-2 font-bold hover:bg-white transition"
                                  >
                                  Solliciteer direct
                        </Link>Link>
                </div>div>
          
            {/* Close button - only when expanded */}
            {isExpanded && (
                          <button
                                      onClick={handleClose}
                                      className="absolute top-4 right-4 w-8 h-8 bg-yellow-300 text-gray-800 rounded-full font-bold text-lg hover:bg-white transition z-10"
                                    >
                                    ×
                          </button>button>
                )}
          </div>div>
        );
}</div>import Image from 'next/image';
import Link from 'next/link';

interface Vacature {
  id: string;
  title: string;
  description: string;
  image?: string;
  link: string;
}

export default function VacatureCard({ vacature }: { vacature: Vacature }) {
  return (
    <div className="bg-white overflow-hidden shadow hover:shadow-lg transition-shadow">
      {/* Image */}
      {vacature.image && (
        <div className="relative w-full h-48 bg-gray-200">
          <Image
            src={vacature.image}
            alt={vacature.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold mb-2" style={{ color: '#3b696d' }}>
          {vacature.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4">{vacature.description}</p>

        {/* CTA Buttons */}
        <div className="space-y-2">
          <button className="w-full py-2 px-4 text-white text-sm font-medium hover:opacity-90" style={{ backgroundColor: '#3b696d' }}>
            Solliciteer direct
          </button>
        </div>
      </div>
    </div>
  );
}
