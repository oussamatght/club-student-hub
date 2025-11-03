'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/Alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Search, PlusCircle, ArrowLeft, MapPin, Clock, Filter } from 'lucide-react';
import { Loader2 } from 'lucide-react';

interface Club {
  id: string;
  clubName: string;
  clubDescription: string;
  clubLocation: string;
  clubType: string;
  clubStartDate: string;
  clubEndDate: string;
}
const exampleClubs : Club[] = [
      {
        id: 'c1',
        clubName: 'Chess Club',
        clubDescription: 'Weekly chess battles and strategy discussions.',
        clubLocation: 'Room 101, Main Building',
        clubType: 'Strategy',
        clubStartDate: '2025-11-05T15:00:00',
        clubEndDate: '2025-11-05T17:00:00',
      },
      {
        id: 'c2',
        clubName: 'Science Club',
        clubDescription: 'Hands-on experiments and fun science activities.',
        clubLocation: 'Lab 3, Science Building',
        clubType: 'Educational',
        clubStartDate: '2025-11-07T14:00:00',
        clubEndDate: '2025-11-07T16:00:00',
      },
      {
        id: 'c3',
        clubName: 'Art Club',
        clubDescription: 'Creative art sessions with painting and drawing.',
        clubLocation: 'Art Room, Creative Center',
        clubType: 'Creative',
        clubStartDate: '2025-11-09T16:00:00',
        clubEndDate: '2025-11-09T18:00:00',
      },
    ];
export default function ClubsPage() {
  const router = useRouter();
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

 useEffect(() => {
    const initClubs = () => {
      setClubs(exampleClubs);
      setFilteredClubs(exampleClubs);
      setLoading(false);
    };
    initClubs();
  }, []);
  useEffect(() => {
    let filtered = clubs;
    if (searchTerm) {
      filtered = filtered.filter(
        (club: Club) =>
          club.clubName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          club.clubDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
          club.clubLocation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterType !== 'all') {
      filtered = filtered.filter((club: Club) => club.clubType === filterType);
    }
    
  }, [searchTerm, filterType, clubs]);

   
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto"></div>
          <p className="mt-6 text-lg text-gray-600 font-medium">Loading clubs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                All Clubs
              </h1>
              <p className="text-gray-600 mt-1">Discover clubs you can join in your community</p>
            </div>
          </div>
          
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6 shadow-lg">
            {error}
          </Alert>
        )}

        <Card className="mb-8 shadow-xl border-0">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search clubs by name, description, or location..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-2 focus:border-purple-500"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="h-12 pl-10 border-2">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Strategy">Strategy</SelectItem>
                    <SelectItem value="Educational">Educational</SelectItem>
                    <SelectItem value="Creative">Creative</SelectItem>
                    <SelectItem value="Social">Social</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map((club: Club) => (
            <Link key={club.id} href={`/clubs/${club.id}`}>
              <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg group overflow-hidden">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full font-semibold">
                      {club.clubType}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-purple-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                    {club.clubName}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 min-h-[4.5rem]">
                    {club.clubDescription}
                  </p>
                  <div className="space-y-2.5 pt-3 border-t">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-purple-500 flex-shrink-0" />
                      <span className="truncate">{formatDate(club.clubStartDate)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-purple-500 flex-shrink-0" />
                      <span className="truncate">Until {formatDate(club.clubEndDate)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-purple-500 flex-shrink-0" />
                      <span className="truncate">{club.clubLocation}</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-purple-50 group-hover:text-purple-700 group-hover:border-purple-300 transition-all font-semibold"
                  >
                    View Details →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
