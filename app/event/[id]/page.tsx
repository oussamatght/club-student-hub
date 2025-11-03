'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { api } from '@/lib/api';
import { isAuthenticated } from '@/lib/auth';
import { Event } from '../../types';
import { ArrowLeft, Edit, Trash2, Calendar, MapPin, Clock, Users, Share2, Bookmark, CheckCircle, Building, Tag } from 'lucide-react';

export default function EventDetailPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false);

  //useEffect(() => {if (!isAuthenticated()) {      router.push('/login');      return;    }loadEventDetails();}, [eventId]);
useEffect(() => {
  setEvent([
    {
      id: "1",
      eventName: "Tech Innovators Conference 2025",
      eventDescription: "A conference bringing together the brightest minds in AI, robotics, and software innovation. Includes keynote speakers, networking sessions, and product demos.",
      eventStartDate: new Date("2025-04-15T09:00:00").toISOString(),
      eventEndDate: new Date("2025-04-15T17:00:00").toISOString(),
      eventLocation: "Grand Convention Center, San Francisco",
      eventType: "Conference",
    },
    {
      id: "2",
      eventName: "Charity Fun Run for Education",
      eventDescription: "Join us for a 5K charity run to support underprivileged students. Refreshments and music after the run!",
      eventStartDate: new Date("2025-05-10T07:00:00").toISOString(),
      eventEndDate: new Date("2025-05-10T11:00:00").toISOString(),
      eventLocation: "Central Park, New York",
      eventType: "Fundraiser",
    },
    {
      id: "3",
      eventName: "Summer Coding Bootcamp",
      eventDescription: "A two-week intensive bootcamp where participants learn full-stack web development using React, Node.js, and MongoDB.",
      eventStartDate: new Date("2025-07-01T09:00:00").toISOString(),
      eventEndDate: new Date("2025-07-14T17:00:00").toISOString(),
      eventLocation: "Tech Hub, Boston",
      eventType: "Workshop",
    },
    {
      id: "4",
      eventName: "Cultural Fest 2025",
      eventDescription: "Experience a day of music, art, and food from around the world. Featuring dance performances, international cuisine, and cultural exhibits.",
      eventStartDate: new Date("2025-09-20T10:00:00").toISOString(),
      eventEndDate: new Date("2025-09-20T22:00:00").toISOString(),
      eventLocation: "University Main Grounds",
      eventType: "Cultural",
    },
    {
      id: "5",
      eventName: "AI Ethics Seminar",
      eventDescription: "A thought-provoking seminar discussing the moral implications and societal impact of artificial intelligence technologies.",
      eventStartDate: new Date("2025-03-18T14:00:00").toISOString(),
      eventEndDate: new Date("2025-03-18T16:00:00").toISOString(),
      eventLocation: "Room 204, Engineering Building",
      eventType: "Seminar",
    },
    {
      id: "6",
      eventName: "Startup Pitch Competition",
      eventDescription: "Aspiring entrepreneurs present their startup ideas to investors for a chance to win funding and mentorship opportunities.",
      eventStartDate: new Date("2025-06-05T10:00:00").toISOString(),
      eventEndDate: new Date("2025-06-05T18:00:00").toISOString(),
      eventLocation: "Innovation Hall, Silicon Valley",
      eventType: "Competition",
    },
    {
      id: "7",
      eventName: "Mental Health Awareness Talk",
      eventDescription: "An open discussion with mental health professionals focusing on stress management, resilience, and self-care strategies.",
      eventStartDate: new Date("2025-05-25T15:00:00").toISOString(),
      eventEndDate: new Date("2025-05-25T17:00:00").toISOString(),
      eventLocation: "Community Center, Chicago",
      eventType: "Social",
    },
    {
      id: "8",
      eventName: "University Career Fair 2025",
      eventDescription: "Meet recruiters from top companies offering internships and full-time positions across multiple industries.",
      eventStartDate: new Date("2025-10-03T09:00:00").toISOString(),
      eventEndDate: new Date("2025-10-03T16:00:00").toISOString(),
      eventLocation: "Student Union Hall",
      eventType: "Career Fair",
    },
    {
      id: "9",
      eventName: "Inter-University Football Championship",
      eventDescription: "Annual sports tournament featuring football teams from leading universities competing for the championship cup.",
      eventStartDate: new Date("2025-08-10T08:00:00").toISOString(),
      eventEndDate: new Date("2025-08-12T18:00:00").toISOString(),
      eventLocation: "National Stadium, Los Angeles",
      eventType: "Sports",
    },
    {
      id: "10",
      eventName: "Community Art Workshop",
      eventDescription: "A hands-on art workshop where local artists teach painting, sculpture, and digital art techniques to beginners.",
      eventStartDate: new Date("2025-11-15T13:00:00").toISOString(),
      eventEndDate: new Date("2025-11-15T17:00:00").toISOString(),
      eventLocation: "Art Studio, Downtown",
      eventType: "Workshop",
    },
  ]);

  setLoading(false);
}, []);

  const loadEventDetails = async () => {
    try {
      setLoading(true);
      const data = await api.getEvent(eventId);
      setEvent(data);
    } catch (err:unknown | Error) {
      setError(typeof err === 'string' ? err || 'Failed to delete event. Please try again.' : 'Failed to delete event. Please try again.');
    
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this event? This action cannot be undone.')) return;
    try {
      await api.deleteEvent(eventId);
      router.push('/events');
    } catch (err:unknown | Error) {
      setError(typeof err === 'string' ? err || 'Failed to delete event. Please try again.' : 'Failed to delete event. Please try again.');
    }
  };

  const handleRegister = () => {
    setRegistered(!registered);
  };

  const getEventStatus = (startDate: string, endDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (now < start) return { 
      label: 'Upcoming', 
      color: 'bg-blue-500', 
      textColor: 'text-blue-600', 
      bgColor: 'bg-blue-50', 
      borderColor: 'border-blue-200' 
    };
    if (now >= start && now <= end) return { 
      label: 'Ongoing', 
      color: 'bg-green-500', 
      textColor: 'text-green-600', 
      bgColor: 'bg-green-50', 
      borderColor: 'border-green-200' 
    };
    return { 
      label: 'Completed', 
      color: 'bg-gray-500', 
      textColor: 'text-gray-600', 
      bgColor: 'bg-gray-50', 
      borderColor: 'border-gray-200' 
    };
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
    return `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto"></div>
          <p className="mt-6 text-lg text-gray-600 font-medium">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-purple-50">
        <Card className="max-w-md w-full shadow-2xl">
          <CardContent className="pt-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Event not found</h3>
            <p className="text-gray-600 mb-6">The event you are looking for  does not exist or has been removed</p>
            <Link href="/event">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600">Back to Events</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const status = getEventStatus(event.eventStartDate, event.eventEndDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/event">
            <Button variant="outline" size="icon" className="shadow-md hover:shadow-lg transition-shadow">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6 shadow-lg">
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Header Card */}
            <Card className="shadow-2xl border-0 overflow-hidden">
              <div className={`h-3 ${status.color}`}></div>
              <CardContent className="pt-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-sm px-4 py-2 rounded-full font-bold ${status.color} text-white shadow-lg`}>
                        {status.label}
                      </span>
                      <span className="text-sm px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-bold border-2 border-purple-200">
                        {event.eventType}
                      </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">{event.eventName}</h1>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="icon" className="shadow-md hover:shadow-lg hover:bg-blue-50">
                      <Edit className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleDelete} className="shadow-md hover:shadow-lg hover:bg-red-50">
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </Button>
                  </div>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className={`flex items-center gap-4 p-5 ${status.bgColor} rounded-xl border-2 ${status.borderColor}`}>
                    <div className={`w-14 h-14 ${status.color} rounded-full flex items-center justify-center shadow-lg`}>
                      <Calendar className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Start Date</p>
                      <p className="font-bold text-gray-900 text-sm">{formatDate(event.eventStartDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-5 bg-pink-50 rounded-xl border-2 border-pink-200">
                    <div className="w-14 h-14 bg-pink-500 rounded-full flex items-center justify-center shadow-lg">
                      <Clock className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Duration</p>
                      <p className="font-bold text-gray-900 text-sm">{getDuration(event.eventStartDate, event.eventEndDate)}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
                  <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Location</p>
                    <p className="font-bold text-gray-900 text-lg">{event.eventLocation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description Card */}
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <Building className="w-5 h-5 text-white" />
                  </div>
                  About This Event
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-700 whitespace-pre-line leading-relaxed text-lg">{event.eventDescription}</p>
              </CardContent>
            </Card>

            {/* Event Details Card */}
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Tag className="w-5 h-5 text-white" />
                  </div>
                  Event Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2 font-semibold">Event Type</p>
                    <p className="font-bold text-gray-900 text-lg">{event.eventType}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2 font-semibold">Status</p>
                    <p className={`font-bold text-lg ${status.textColor}`}>{status.label}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2 font-semibold">Start Date</p>
                    <p className="font-bold text-gray-900">
                      {new Date(event.eventStartDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2 font-semibold">End Date</p>
                    <p className="font-bold text-gray-900">
                      {new Date(event.eventEndDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <Card className="shadow-2xl border-0 sticky top-8">
              <CardHeader className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                <CardTitle className="text-xl">Event Registration</CardTitle>
                <CardDescription className="text-purple-100">
                  {registered ? "You're registered!" : "Join this amazing event"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {status.label === 'Upcoming' && (
                  <>
                    <Button 
                      className={`w-full h-14 text-lg font-bold shadow-lg ${registered ? 'bg-green-600 hover:bg-green-700' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'}`}
                      onClick={handleRegister}
                    >
                      {registered ? (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Registered Successfully
                        </>
                      ) : (
                        'Register Now'
                      )}
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="hover:bg-purple-50 hover:border-purple-300">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" className="hover:bg-blue-50 hover:border-blue-300">
                        <Bookmark className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  </>
                )}
                {status.label === 'Ongoing' && (
                  <div className="text-center p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border-2 border-green-300">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-green-800 font-bold text-lg">Event is Live!</p>
                    <p className="text-green-600 text-sm mt-1">Happening right now</p>
                  </div>
                )}
                {status.label === 'Completed' && (
                  <div className="text-center p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                    <p className="text-gray-600 font-semibold">This event has ended</p>
                    <p className="text-gray-500 text-sm mt-1">Check out other upcoming events</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Attendees Card */}
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Attendees
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center py-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-blue-600" />
                  </div>
                  <p className="text-4xl font-bold text-blue-600 mb-2">-</p>
                  <p className="text-sm text-gray-600">People registered</p>
                </div>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Venue
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="font-bold text-gray-900 mb-4 text-lg">{event.eventLocation}</p>
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-48 flex items-center justify-center border-2 border-gray-300">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 font-medium">Map View</p>
                    <p className="text-gray-500 text-sm">Coming Soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help Card */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-900 flex items-center gap-2">
                  💬 Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-purple-800 mb-4 leading-relaxed">
                  Have questions about this event? Contact the organizers for more information and assistance.
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg">
                  Contact Organizer
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
