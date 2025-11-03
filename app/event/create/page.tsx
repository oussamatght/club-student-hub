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
import { Event } from '../../types';
import { ArrowLeft, Loader2, Calendar, AlertCircle } from 'lucide-react';

export default function CreateEventPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    eventName: '',
    eventStartDate: '',
    eventEndDate: '',
    eventType: '',
    eventLocation: '',
    eventDescription: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.eventName.trim()) {
      errors.eventName = 'Event name is required';
    } else if (formData.eventName.length < 3) {
      errors.eventName = 'Event name must be at least 3 characters';
    }

    if (!formData.eventStartDate) {
      errors.eventStartDate = 'Start date is required';
    }

    if (!formData.eventEndDate) {
      errors.eventEndDate = 'End date is required';
    }

    if (formData.eventStartDate && formData.eventEndDate) {
      const start = new Date(formData.eventStartDate);
      const end = new Date(formData.eventEndDate);
      const now = new Date();

      if (start < now) {
        errors.eventStartDate = 'Start date cannot be in the past';
      }

      if (end <= start) {
        errors.eventEndDate = 'End date must be after start date';
      }
    }

    if (!formData.eventType) {
      errors.eventType = 'Event type is required';
    }

    if (!formData.eventLocation.trim()) {
      errors.eventLocation = 'Location is required';
    }

    if (!formData.eventDescription.trim()) {
      errors.eventDescription = 'Description is required';
    } else if (formData.eventDescription.length < 20) {
      errors.eventDescription = 'Description must be at least 20 characters';
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
      await api.createEvent(formData);
      router.push('/events');
    } catch (err: unknown | Error) {
      setError(err instanceof Error ? err.message || 'Failed to create event. Please try again.' : 'Failed to create event. Please try again.');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/event">
            <Button variant="outline" size="icon" className="shadow-md hover:shadow-lg">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
            <p className="text-gray-600">Organize an exciting event for your community</p>
          </div>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Calendar className="w-6 h-6" />
              Event Details
            </CardTitle>
            <CardDescription>Fill in the information about your event</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive" className="shadow-md">
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="eventName">Event Name *</Label>
                <Input
                  id="eventName"
                  name="eventName"
                  placeholder="Annual Tech Conference 2025"
                  value={formData.eventName}
                  onChange={handleChange}
                  required
                  className={`text-lg ${validationErrors.eventName ? 'border-red-500' : ''}`}
                />
                {validationErrors.eventName && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {validationErrors.eventName}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventStartDate">Start Date & Time *</Label>
                  <Input
                    id="eventStartDate"
                    name="eventStartDate"
                    type="datetime-local"
                    value={formData.eventStartDate}
                    onChange={handleChange}
                    required
                    className={validationErrors.eventStartDate ? 'border-red-500' : ''}
                  />
                  {validationErrors.eventStartDate && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {validationErrors.eventStartDate}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventEndDate">End Date & Time *</Label>
                  <Input
                    id="eventEndDate"
                    name="eventEndDate"
                    type="datetime-local"
                    value={formData.eventEndDate}
                    onChange={handleChange}
                    required
                    className={validationErrors.eventEndDate ? 'border-red-500' : ''}
                  />
                  {validationErrors.eventEndDate && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {validationErrors.eventEndDate}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventType">Event Type *</Label>
                  <Select
                    value={formData.eventType}
                    onValueChange={(value: string) => handleSelectChange('eventType', value)}
                  >
                    <SelectTrigger className={validationErrors.eventType ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Workshop">🛠️ Workshop</SelectItem>
                      <SelectItem value="Conference">🎤 Conference</SelectItem>
                      <SelectItem value="Seminar">📚 Seminar</SelectItem>
                      <SelectItem value="Competition">🏆 Competition</SelectItem>
                      <SelectItem value="Social">🎉 Social Gathering</SelectItem>
                      <SelectItem value="Sports">⚽ Sports Event</SelectItem>
                      <SelectItem value="Cultural">🎭 Cultural Event</SelectItem>
                      <SelectItem value="Career Fair">💼 Career Fair</SelectItem>
                      <SelectItem value="Fundraiser">💰 Fundraiser</SelectItem>
                      <SelectItem value="Other">📋 Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {validationErrors.eventType && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {validationErrors.eventType}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventLocation">Location *</Label>
                  <Input
                    id="eventLocation"
                    name="eventLocation"
                    placeholder="Main Auditorium, Building A"
                    value={formData.eventLocation}
                    onChange={handleChange}
                    required
                    className={validationErrors.eventLocation ? 'border-red-500' : ''}
                  />
                  {validationErrors.eventLocation && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {validationErrors.eventLocation}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventDescription">Event Description *</Label>
                <Textarea
                  id="eventDescription"
                  name="eventDescription"
                  placeholder="Describe your event in detail: what participants can expect, agenda, speakers, requirements, etc."
                  value={formData.eventDescription}
                  onChange={handleChange}
                  required
                  rows={8}
                  className={`resize-none ${validationErrors.eventDescription ? 'border-red-500' : ''}`}
                />
                {validationErrors.eventDescription && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {validationErrors.eventDescription}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Be descriptive! Include agenda, speakers, requirements, and what makes this event special.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-5">
                <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Event Preview
                </h4>
                <div className="text-sm text-blue-800 space-y-2">
                  <p><strong>Name:</strong> {formData.eventName || 'Not set'}</p>
                  <p><strong>Type:</strong> {formData.eventType || 'Not set'}</p>
                  <p><strong>Location:</strong> {formData.eventLocation || 'Not set'}</p>
                  {formData.eventStartDate && (
                    <p><strong>Start:</strong> {new Date(formData.eventStartDate).toLocaleString()}</p>
                  )}
                  {formData.eventEndDate && (
                    <p><strong>End:</strong> {new Date(formData.eventEndDate).toLocaleString()}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-12 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating Event...
                    </>
                  ) : (
                    <>
                      <Calendar className="mr-2 h-5 w-5" />
                      Create Event
                    </>
                  )}
                </Button>
                <Link href="/events" className="flex-1">
                  <Button type="button" variant="outline" className="w-full h-12 text-lg font-semibold">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 shadow-lg">
          <CardContent className="pt-6">
            <h3 className="font-bold text-purple-900 mb-3 flex items-center gap-2 text-lg">
              💡 Tips for a Great Event
            </h3>
            <ul className="text-sm text-purple-800 space-y-2 list-disc list-inside">
              <li>Choose a clear, descriptive event name that attracts attendees</li>
              <li>Provide detailed information about the agenda and speakers</li>
              <li>Specify any prerequisites, materials needed, or dress code</li>
              <li>Include registration or RSVP information if applicable</li>
              <li>Mention parking, accessibility, or other logistical details</li>
              <li>Add contact information for questions</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
