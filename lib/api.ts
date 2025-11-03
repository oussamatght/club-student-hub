const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
import { Student } from '../app/types';
import { Club } from '../app/types';
import { Event } from '../app/types';
import { Post } from '../app/types';

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
 const headers: HeadersInit = {
  'Content-Type': 'application/json',
  ...options.headers,
};

if (this.token) {
  (headers as Record<string, string>)['Authorization'] = `Bearer ${this.token}`;
}

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

 async login(email: string, password: string) {
  return this.request<{ token: string; user: Student }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

async register(data: Student) {
  return this.request<{ token: string; user: Student }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

  async getProfile() {
    return this.request<Student>('/students/profile');
  }

  async updateProfile(data: Partial<Student>) {
    return this.request<Student>('/students/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getClubs() {
    return this.request<Club[]>('/clubs');
  }

  async getClub(id: string) {
    return this.request<Club>(`/clubs/${id}`);
  }

  async createClub(data: Club) {
    return this.request<Club>('/clubs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateClub(id: string, data: Partial<Club>) {
    return this.request<Club>(`/clubs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteClub(id: string) {
    return this.request<void>(`/clubs/${id}`, {
      method: 'DELETE',
    });
  }

  async getEvents() {
    return this.request<Event[]>('/events');
  }

  async getEvent(id: string) {
    return this.request<Event>(`/events/${id}`);
  }

  async createEvent(data: Event) {
    return this.request<Event>('/events', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateEvent(id: string, data: Partial<Event>) {
    return this.request<Event>(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteEvent(id: string) {
    return this.request<void>(`/events/${id}`, {
      method: 'DELETE',
    });
  }

  // Post endpoints
  async getPosts() {
    return this.request<Post[]>('/posts');
  }

  async getPost(id: string) {
    return this.request<Post>(`/posts/${id}`);
  }

  async createPost(data: Post) {
    return this.request<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async likePost(id: string) {
    return this.request<Post>(`/posts/${id}/like`, {
      method: 'POST',
    });
  }

  async commentPost(id: string, comment: string) {
    return this.request<Post>(`/posts/${id}/comment`, {
      method: 'POST',
      body: JSON.stringify({ comment }),
    });
  }
}

export const api = new ApiClient(API_BASE_URL);