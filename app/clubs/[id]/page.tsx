'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api } from '@/lib/api';
import { getUser, isAuthenticated } from '../../../lib/auth';
import { Club, Event, Post } from '../../types';
import { ArrowLeft, Edit, Trash2, Users, Calendar, FileText, Mail, MapPin } from 'lucide-react';
import { unique } from 'next/dist/build/utils';

export default function ClubDetailPage() {
  const router = useRouter();
  const params = useParams();
  const clubId = params.id as string;
  
  const [club, setClub] = useState(null);
  const [events, setEvents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = getUser();

 // useEffect(() => {if (!isAuthenticated()) {router.push('/login');   return; } loadClubDetails();}, [clubId]);
useEffect(() => {
  setClub({
    id: "1",
    clubName: "Chess Club",
    clubType: "Student Club",
    university: "My University",
    clubEmail: "chess@university.edu",
    clubDescription: "A club for chess enthusiasts.",
  });

  setEvents([
    {
      id: "2",
      eventName: "Chess Tournament",
      eventDescription: "Annual chess tournament.",
      eventStartDate: new Date().toISOString(),
      eventLocation: "Auditorium",
      eventType: "Tournament",
    },
  ]);

  setPosts([
    {
      id: "3",
      title: "Welcome Post",
      description: "Welcome to our club!",
      numberOfLikes: 10,
      numberOfComments: 2,
      postType: "Announcement",
    },
  ]);

  setLoading(false);
}, []);

  const loadClubDetails = async () => {
    try {
      setLoading(true);
      const [clubData, eventsData, postsData] = await Promise.all([
        api.getClub(clubId),
        api.getEvents(),
        api.getPosts(),
      ]);

      setClub(clubData);
      setEvents(eventsData);
      setPosts(postsData);
    } catch (err: unknown | Error) {
      setError(err instanceof Error ? err.message || 'Failed to load club details. Please try again.' : 'Failed to load club details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this club?')) return;

    try {
      await api.deleteClub(clubId);
      router.push('/clubs');
    } catch (err:  unknown |Error) {    
      setError(err instanceof Error ? err.message || 'Failed to delete . Please try again.' : 'Failed to delete . Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading club details...</p>
        </div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <p className="text-gray-600 mb-4">Club not found</p>
            <Link href="/clubs">
              <Button>Back to Clubs</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/clubs">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
          </Alert>
        )}

        {/* Club Header Card */}
        <Card className="mb-8 shadow-2xl border-0 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-4xl -mt-16 border-4 border-white shadow-lg">
                  {club.clubName.charAt(0)}
                </div>
                <div className="pt-2">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{club.clubName}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {club.clubType}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {club.university}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {club.clubEmail}
                    </span>
                  </div>
                  <p className="text-gray-700 max-w-3xl">{club.clubDescription}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleDelete}>
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="about" className="space-y-6">
          <TabsList className="bg-white shadow-md">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="events">Events ({events.length})</TabsTrigger>
            <TabsTrigger value="posts">Posts ({posts.length})</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 shadow-lg">
                <CardHeader>
                  <CardTitle>About This Club</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600">{club.clubDescription}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Club Type</h3>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {club.clubType}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">University</h3>
                    <p className="text-gray-600">{club.university}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-700">Events</span>
                    <span className="font-bold text-blue-600">{events.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-gray-700">Posts</span>
                    <span className="font-bold text-purple-600">{posts.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                    <span className="text-gray-700">Members</span>
                    <span className="font-bold text-pink-600">-</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Club Events</CardTitle>
                    <CardDescription>Upcoming and past events</CardDescription>
                  </div>
                  <Link href="/events/create">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                      Create Event
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {events.length > 0 ? (
                  events.map((event: Event) => (
                    <Link key={event.id} href={`/events/${event.id}`}>
                      <div className="p-4 border rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all cursor-pointer">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{event.eventName}</h4>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{event.eventDescription}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(event.eventStartDate).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {event.eventLocation}
                              </span>
                              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">
                                {event.eventType}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No events yet</p>
                    <Link href="/events/create">
                      <Button>Create First Event</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Posts Tab */}
          <TabsContent value="posts">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Club Posts</CardTitle>
                    <CardDescription>Updates and announcements</CardDescription>
                  </div>
                  <Link href="/posts/create">
                    <Button className="bg-gradient-to-r from-pink-600 to-red-600">
                      Create Post
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {posts.length > 0 ? (
                  posts.map((post:Post) => (
                    <div key={post.id} className="p-4 border rounded-lg hover:border-pink-300 transition-colors">
                      <h4 className="font-semibold text-gray-900 mb-2">{post.title}</h4>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">{post.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>❤️ {post.numberOfLikes} likes</span>
                        <span>💬 {post.numberOfComments} comments</span>
                        <span className="ml-auto px-2 py-1 bg-pink-100 text-pink-700 rounded text-xs">
                          {post.postType}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No posts yet</p>
                    <Link href="/posts/create">
                      <Button>Create First Post</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Club Members</CardTitle>
                <CardDescription>Active members of this club</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Member list coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}