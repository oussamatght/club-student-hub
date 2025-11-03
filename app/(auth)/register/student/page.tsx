'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { api } from '@/lib/api';
import { setUser } from '@/lib/auth';

export default function StudentRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    university: '',
    fieldOfStudy: '',
    matricule: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.registerStudent(formData);
      setUser(res.user);
      router.push('/dashboard');
    } catch (err: unknown | Error) {
      setError(err instanceof Error ? err.message || 'Registration failed. Please try again.' : 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blue-700">Student Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            {error && <Alert variant="destructive"></Alert>}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>First Name</Label>
                <Input name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>

            <Label>Email</Label>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <Label>Password</Label>
            <Input type="password" name="password" value={formData.password} onChange={handleChange} required />

            <Label>University</Label>
            <Input name="university" value={formData.university} onChange={handleChange} required />

            <Label>Field of Study</Label>
            <Input name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} required />

            <Label>Matricule</Label>
            <Input name="matricule" value={formData.matricule} onChange={handleChange} required />

            <Button className="w-full" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>

            <p className="text-sm text-center text-gray-600">
              Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
