// components/ui/ClubCard.tsx
import Link from 'next/link';
import { Users } from 'lucide-react';

import { Club } from '../../app/types';

export default function ClubCard({ club }: { club: Club }) {
  return (
    <Link href={`/clubs/${club.id}`}>
      <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow cursor-pointer">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
            {club.clubName.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-bold">{club.clubName}</h3>
            <p className="text-sm text-gray-500">{club.clubType}</p>
          </div>
        </div>
        <p className="text-gray-600 text-sm line-clamp-3">{club.clubDescription}</p>
        <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
          <Users className="w-4 h-4" /> {club.membersCount || '-'} members
        </div>
      </div>
    </Link>
  );
}
