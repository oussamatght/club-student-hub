
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api } from '@/lib/api';
import { isAuthenticated } from '@/lib/auth';
import { Event } from '../types';
import { Calendar, Search, PlusCircle, ArrowLeft, MapPin, Clock, Filter } from 'lucide-react';
import { Loader2 } from 'lucide-react';

export default function EventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  //useEffect(() => {    if (!isAuthenticated()) {      router.push('/login');      return;    }    loadEvents();  }, []);

  useEffect(() => {
    let filtered = events;
    if (searchTerm) {
      filtered = filtered.filter(
        (event: Event) =>
          event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.eventDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.eventLocation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterType !== 'all') {
      filtered = filtered.filter((event: Event) => event.eventType === filterType);
    }
    setFilteredEvents(filtered);
  }, [searchTerm, filterType, events]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await api.getEvents();
      setEvents(data);
      setFilteredEvents(data);
    } catch (err: unknown | Error) {
      setError(err instanceof Error ? err.message || 'Failed to load events. Please try again.' : 'Failed to load events. Please try again.');
    } finally {
      setLoading(false);
} };
useEffect(() => {
  const sampleEvents = [
    {
      id: '1',
      eventName: 'Sample Workshop',
      eventDescription: 'Learn coding basics.',
      eventLocation: 'Online',
      eventType: 'Workshop',
      eventStartDate: '2025-12-10T10:00:00',
      eventEndDate: '2025-12-10T12:00:00'
    },
    {
      id: '2',
      eventName: 'Sample Conference',
      eventDescription: 'Annual tech conference.',
      eventLocation: 'New York',
      eventType: 'Conference',
      eventStartDate: '2025-11-15T09:00:00',
      eventEndDate: '2025-11-15T17:00:00'
    }
  ];
  setEvents(sampleEvents);
  setFilteredEvents(sampleEvents);
  setLoading(false);
}, []);


  const getEventStatus = (startDate: string, endDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (now < start) return { label: 'Upcoming', color: 'bg-blue-100 text-blue-800 border-blue-300', badge: 'bg-blue-500' };
    if (now >= start && now <= end) return { label: 'Ongoing', color: 'bg-green-100 text-green-800 border-green-300', badge: 'bg-green-500' };
    return { label: 'Past', color: 'bg-gray-100 text-gray-800 border-gray-300', badge: 'bg-gray-500' };
  };

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
          <p className="mt-6 text-lg text-gray-600 font-medium">Loading events...</p>
        </div>
      </div>
    );
  }

 const upcomingCount = events.filter((e: Event) => getEventStatus(e.eventStartDate, e.eventEndDate).label === 'Upcoming').length;
const ongoingCount = events.filter((e: Event) => getEventStatus(e.eventStartDate, e.eventEndDate).label === 'Ongoing').length;
const pastCount = events.filter((e: Event) => getEventStatus(e.eventStartDate, e.eventEndDate).label === 'Past').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="icon" className="shadow-md hover:shadow-lg transition-shadow">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                All Events
              </h1>
              <p className="text-gray-600 mt-1">Discover upcoming workshops, conferences, and activities</p>
            </div>
          </div>
          <Link href="/event/create">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all">
              <PlusCircle className="w-5 h-5 mr-2" />
              Create Event
            </Button>
          </Link>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6 shadow-lg">
          </Alert>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-purple-600">{events.length}</p>
              <p className="text-sm text-gray-600 mt-1">Total Events</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-blue-600">{upcomingCount}</p>
              <p className="text-sm text-gray-600 mt-1">Upcoming</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-green-600">{ongoingCount}</p>
              <p className="text-sm text-gray-600 mt-1">Ongoing</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-gray-600">{pastCount}</p>
              <p className="text-sm text-gray-600 mt-1">Past</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 shadow-xl border-0">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search events by name, description, or location..."
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
                    <SelectItem value="Workshop">Workshop</SelectItem>
                    <SelectItem value="Conference">Conference</SelectItem>
                    <SelectItem value="Seminar">Seminar</SelectItem>
                    <SelectItem value="Competition">Competition</SelectItem>
                    <SelectItem value="Social">Social Gathering</SelectItem>
                    <SelectItem value="Sports">Sports Event</SelectItem>
                    <SelectItem value="Cultural">Cultural Event</SelectItem>
                    <SelectItem value="Career Fair">Career Fair</SelectItem>
                    <SelectItem value="Fundraiser">Fundraiser</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event: Event) => {
            const status = getEventStatus(event.eventStartDate, event.eventEndDate);
            
            return (
              <Link key={event.id} href={`/event/${event.id}`}>
                <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg group overflow-hidden">
                  <div className={`h-3 ${status.badge} group-hover:h-4 transition-all`}></div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between mb-3">
                      <span className={`text-xs px-3 py-1.5 rounded-full font-semibold border ${status.color}`}>
                        {status.label}
                      </span>
                      <span className="text-xs px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full font-semibold">
                        {event.eventType}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-purple-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                      {event.eventName}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 min-h-[4.5rem]">
                      {event.eventDescription}
                    </p>
                    <div className="space-y-2.5 pt-3 border-t">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-purple-500 flex-shrink-0" />
                        <span className="truncate">{formatDate(event.eventStartDate)}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-purple-500 flex-shrink-0" />
                        <span className="truncate">Until {formatDate(event.eventEndDate)}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-purple-500 flex-shrink-0" />
                        <span className="truncate">{event.eventLocation}</span>
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
            );
          })}
        </div>


        {filteredEvents.length === 0 && (
          <Card className="shadow-xl border-0">
            <CardContent className="py-16 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No events found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchTerm || filterType !== 'all'
                  ? 'Try adjusting your search or filter settings'
                  : 'Be the first to create an exciting event for your community!'}
              </p>
              <Link href="/event/create">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg">
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Create Event
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
