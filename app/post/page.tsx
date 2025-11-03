'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/Alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api } from '@/lib/api';
import { getUser, isAuthenticated } from '@/lib/auth';
import { Post } from '../types';
import { Heart, MessageCircle, Search, PlusCircle, ArrowLeft, Share2, TrendingUp, Filter } from 'lucide-react';

export default function PostsPage() {
  const router = useRouter();
  const user = getUser();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await api.getPosts();
        const examplePosts: Post[] = [
          {
            id: 'example-1',
            title: 'Welcome to the Community!',
            description: 'This is an example post to get you started. Feel free to create your own posts.',
            postType: 'Announcement',
            numberOfLikes: 5,
            numberOfComments: 2,
            content: 'Join our weekly challenge to improve your skills and connect with others!',

          },
          {
            id: 'example-2',
            title: 'Weekly Challenge',
            description: 'Join our weekly challenge to improve your skills and connect with others!',
            postType: 'Discussion',
            numberOfLikes: 8,
            numberOfComments: 3,
            content: 'Join our weekly challenge to improve your skills and connect with others!',
          },
        ];
        const combinedPosts = [...examplePosts, ...data];
        setPosts(combinedPosts);
        setFilteredPosts(combinedPosts);
      } catch (err: unknown | Error) {
        setError(err instanceof Error ? err.message || 'Failed to load posts.' : 'Failed to load posts.');
        const examplePosts: Post[] = [
          {
            id: 'example-1',
            title: 'Welcome to the Community!',
            description: 'This is an example post to get you started. Feel free to create your own posts.',
            postType: 'Announcement',
            numberOfLikes: 5,
            numberOfComments: 2,
            content: 'Join our weekly challenge to improve your skills and connect with others!',

          },
          {
            id: 'example-2',
            title: 'Weekly Challenge',
            description: 'Join our weekly challenge to improve your skills and connect with others!',
            postType: 'Discussion',
            numberOfLikes: 8,
            numberOfComments: 3,
            content: 'Join our weekly challenge to improve your skills and connect with others!',

          },
        ];
        setPosts(examplePosts);
        setFilteredPosts(examplePosts);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  useEffect(() => {
    let filtered = posts;
    if (searchTerm) {
      filtered = filtered.filter(
        (post:        Post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterType !== 'all') {
      filtered = filtered.filter((post: Post) => post.postType === filterType);
    }
    setFilteredPosts(filtered);
  }, [searchTerm, filterType, posts]);

  const handleLike = async (postId: string) => {
    try {
      await api.likePost(postId);
      const data = await api.getPosts();
      setPosts(data);
    } catch (err: unknown | Error) {
      setError(err instanceof Error ? err.message || 'Failed to like post.' : 'Failed to like post.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-pink-50 to-red-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-600 mx-auto"></div>
          <p className="mt-6 text-lg text-gray-600 font-medium">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50 to-red-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                Community Feed
              </h1>
              <p className="text-gray-600 mt-1">Stay updated with the latest posts and announcements</p>
            </div>
          </div>
          <Link href="/post/create">
            <Button className="bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700">
              <PlusCircle className="w-5 h-5 mr-2" />
              Create Post
            </Button>
          </Link>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {filteredPosts.map((post: Post) => (
            <Card key={post.id} className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden">
              <CardContent>
                <h3 className="text-xl font-bold text-gray-900">{post.title}</h3>
                <p className="text-gray-700 mb-2">{post.description}</p>
                <div className="flex items-center gap-4">
                  <Button size="sm" onClick={() => handleLike(post.id)}>
                    <Heart className="w-4 h-4 mr-1" /> {post.numberOfLikes}
                  </Button>
                  <div className="flex items-center gap-1 text-gray-500">
                    <MessageCircle className="w-4 h-4" /> {post.numberOfComments}
                  </div>
                  {post.numberOfLikes > 10 && (
                    <div className="ml-auto text-green-600 flex items-center gap-1 text-xs font-semibold">
                      <TrendingUp className="w-4 h-4" /> Trending
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No posts found. Be the first to create a post!
          </p>
        )}
      </div>
    </div>
  );
}
