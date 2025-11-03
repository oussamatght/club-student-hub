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
import { Club } from '../../types';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function CreateClubPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    clubName: '',
    clubEmail: '',
    clubPassword: '',
    clubLogo: '',
    clubType: '',
    clubDescription: '',
    university: '',
});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.createClub(formData);
      router.push('/clubs');
    } catch (err: unknown | Error) {
      setError(err instanceof Error ? err.message || 'Failed to create club. Please try again.' : 'Failed to create club. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSelectChange = (name: string, value: string) => {
  setFormData({
    ...formData,
    [name]: value,
  });
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/clubs">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Club</h1>
            <p className="text-gray-600">Start your student organization</p>
          </div>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader>
            <CardTitle>Club Information</CardTitle>
            <CardDescription>Fill in the details about your club</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="clubName">Club Name *</Label>
                <Input
                  id="clubName"
                  name="clubName"
                  placeholder="Tech Innovation Club"
                  value={formData.clubName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clubEmail">Club Email *</Label>
                  <Input
                    id="clubEmail"
                    name="clubEmail"
                    type="email"
                    placeholder="club@university.edu"
                    value={formData.clubEmail}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clubPassword">Club Password *</Label>
                  <Input
                    id="clubPassword"
                    name="clubPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.clubPassword}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clubType">Club Type *</Label>
                  <Select
                    value={formData.clubType}
                    onValueChange={(value: string) => handleSelectChange('clubType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Academic">Academic</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Arts">Arts</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Community Service">Community Service</SelectItem>
                      <SelectItem value="Cultural">Cultural</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="university">University *</Label>
                  <Input
                    id="university"
                    name="university"
                    placeholder="University Name"
                    value={formData.university}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clubLogo">Club Logo URL (Optional)</Label>
                <Input
                  id="clubLogo"
                  name="clubLogo"
                  type="url"
                  placeholder="https://example.com/logo.png"
                  value={formData.clubLogo}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clubDescription">Description *</Label>
                <Textarea
                  id="clubDescription"
                  name="clubDescription"
                  placeholder="Tell us about your club, its mission, and activities..."
                  value={formData.clubDescription}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="resize-none"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Club'
                  )}
                </Button>
                <Link href="/clubs" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}