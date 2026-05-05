import Image from 'next/image';
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
    <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
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
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {vacature.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4">{vacature.description}</p>

        {/* CTA Buttons */}
        <div className="space-y-2">
          <button className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium">
            Solliciteer direct
          </button>
        </div>
      </div>
    </div>
  );
}
