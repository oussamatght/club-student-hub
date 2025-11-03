'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { api } from '@/lib/api';
import { getUser } from '@/lib/auth';
import { Post } from '../../types';
import { ArrowLeft, Loader2, FileText, AlertCircle, Eye , EyeOff,Heart, MessageCircle} from 'lucide-react';

export default function CreatePostPage() {
  const router = useRouter();
  const user = getUser();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    postType: '',
    numberOfLikes: 0,
    numberOfComments: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    } else if (formData.title.length < 5) {
      errors.title = 'Title must be at least 5 characters';
    } else if (formData.title.length > 100) {
      errors.title = 'Title must be less than 100 characters';
    }

    if (!formData.postType) {
      errors.postType = 'Post type is required';
    }

    if (!formData.description.trim()) {
      errors.description = 'Content is required';
    } else if (formData.description.length < 10) {
      errors.description = 'Content must be at least 10 characters';
    } else if (formData.description.length > 5000) {
      errors.description = 'Content must be less than 5000 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      setError('Please fix the validation errors below');
      return;
    }

    setLoading(true);
    try {
      await api.createPost(formData);
      router.push('/post');
    } catch (err: unknown | Error) {
      setError(err instanceof Error ? err.message || 'Failed to create post. Please try again:' : 'Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (validationErrors[name]) {
      setValidationErrors({ ...validationErrors, [name]: '' });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    if (validationErrors[name]) {
      setValidationErrors({ ...validationErrors, [name]: '' });
    }
  };

  const getCharacterCount = () => {
    return formData.description.length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50 to-red-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/post">
            <Button variant="outline" size="icon" className="shadow-md hover:shadow-lg">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
            <p className="text-gray-600">Share updates, announcements, or start discussions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div>
            <Card className="shadow-2xl border-0">
              <CardHeader className="bg-gradient-to-r from-pink-50 to-red-50">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <FileText className="w-6 h-6" />
                  Post Details
                </CardTitle>
                <CardDescription>Fill in the information about your post</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <Alert variant="destructive" className="shadow-md">
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="title">Post Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Enter an engaging title..."
                      value={formData.title}
                      onChange={handleChange}
                      required
                      maxLength={100}
                      className={`text-lg ${validationErrors.title ? 'border-red-500' : ''}`}
                    />
                    <div className="flex justify-between items-center">
                      {validationErrors.title && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {validationErrors.title}
                        </p>
                      )}
                      <p className={`text-xs ml-auto ${formData.title.length > 90 ? 'text-red-600' : 'text-gray-500'}`}>
                        {formData.title.length}/100
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postType">Post Type *</Label>
                    <Select
                      value={formData.postType}
                      onValueChange={(value: string) => handleSelectChange('postType', value)}
                    >
                      <SelectTrigger className={validationErrors.postType ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select post type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Announcement">📢 Announcement</SelectItem>
                        <SelectItem value="Update">📰 Update</SelectItem>
                        <SelectItem value="Discussion">💬 Discussion</SelectItem>
                        <SelectItem value="Question">❓ Question</SelectItem>
                        <SelectItem value="Achievement">🏆 Achievement</SelectItem>
                        <SelectItem value="Event">🎉 Event</SelectItem>
                        <SelectItem value="Opportunity">💼 Opportunity</SelectItem>
                        <SelectItem value="Other">📝 Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {validationErrors.postType && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {validationErrors.postType}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Content *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="What's on your mind? Share your thoughts, updates, or questions with the community..."
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={12}
                      maxLength={5000}
                      className={`resize-none ${validationErrors.description ? 'border-red-500' : ''}`}
                    />
                    <div className="flex justify-between items-center">
                      {validationErrors.description && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {validationErrors.description}
                        </p>
                      )}
                      <p className={`text-xs ml-auto ${getCharacterCount() > 4800 ? 'text-red-600' : 'text-gray-500'}`}>
                        {getCharacterCount()}/5000 characters
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-red-50 border border-pink-200 rounded-lg p-4">
                    <h4 className="font-semibold text-pink-900 mb-2">💡 Tips for Great Posts</h4>
                    <ul className="text-sm text-pink-800 space-y-1 list-disc list-inside">
                      <li>Use a clear, descriptive title</li>
                      <li>Structure your content with paragraphs</li>
                      <li>Add relevant details and context</li>
                      <li>Be respectful and professional</li>
                      <li>Include links or resources if applicable</li>
                    </ul>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 h-12 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Publishing...
                        </>
                      ) : (
                        <>
                          <FileText className="mr-2 h-5 w-5" />
                          Publish Post
                        </>
                      )}
                    </Button>
                    <Link href="/post" className="flex-1">
                      <Button type="button" variant="outline" className="w-full h-12 text-lg font-semibold">
                        Cancel
                      </Button>
                    </Link>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {showPreview ? 'Hide Preview' : 'Show Preview'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Live Preview */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Live Preview
                </CardTitle>
                <CardDescription>
                  {showPreview || (formData.title || formData.description) 
                    ? 'This is how your post will appear' 
                    : 'Start typing to see preview'}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {(showPreview || formData.title || formData.description) ? (
                  <div className="border-2 rounded-xl p-6 bg-white shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {user?.firstName?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">
                          {user?.firstName} {user?.lastName || 'You'}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          {formData.postType && (
                            <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full font-semibold">
                              {formData.postType}
                            </span>
                          )}
                          <span>• Just now</span>
                        </div>
                      </div>
                    </div>
                    {formData.title && (
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{formData.title}</h3>
                    )}
                    {formData.description && (
                      <p className="text-gray-700 whitespace-pre-line leading-relaxed mb-4">
                        {formData.description}
                      </p>
                    )}
                    <div className="flex items-center gap-6 pt-4 border-t-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Heart className="w-5 h-5" />
                        <span className="font-bold">0</span>
                        <span className="text-xs">Likes</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MessageCircle className="w-5 h-5" />
                        <span className="font-bold">0</span>
                        <span className="text-xs">Comments</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Your post preview will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {formData.description && (
              <Card className="mt-6 shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Post Statistics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Words:</span>
                      <span className="font-bold text-gray-900">
                        {formData.description.trim().split(/\s+/).filter((word: string) => word.length > 0).length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Characters:</span>
                      <span className="font-bold text-gray-900">{getCharacterCount()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Paragraphs:</span>
                      <span className="font-bold text-gray-900">
                        {formData.description.split('\n\n').filter((p: string )=> p.trim().length > 0).length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Est. reading time:</span>
                      <span className="font-bold text-gray-900">
                        {Math.ceil(formData.description.trim().split(/\s+/).length / 200)} min
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}