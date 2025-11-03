'use client';
import ClubCard from '@/components/ui/ClubCard';
import EventCard from '@/components/ui/EventCard';
import PostCard from '@/components/ui/PostCard';

const mockClubs = [
  { id: '1', clubName: 'Tech Innovators', clubType: 'Technology', clubDescription: 'Exploring AI and robotics.', clubEmail: 'techinnovators@example.com', university: 'University of Technology' },
  { id: '2', clubName: 'Art Club', clubType: 'Arts', clubDescription: 'Creative art enthusiasts.', clubEmail: 'artclub@example.com', university: 'Art University' },
];

const mockEvents = [
  { id: '1', eventName: 'AI Workshop', eventDescription: 'Learn AI basics.', eventStartDate: '2025-11-10', eventEndDate: '2025-11-10', eventType: 'Workshop', eventLocation: 'Tech Hub' },
  { id: '2', eventName: 'Art Exhibition', eventDescription: 'Show your artwork.', eventStartDate: '2025-11-12', eventEndDate: '2025-11-12', eventType: 'Exhibition', eventLocation: 'Art Gallery' },
];

const mockPosts = [
  {
    id: '1',
    title: 'Introduction to AI',
    description: 'Learn the basics of artificial intelligence.',
    postType: 'article',
    content: 'Artificial intelligence (AI) refers to the simulation of human intelligence in machines. It is a field of computer science that aims to create intelligent machines that can perform tasks that typically require human intelligence.',
    numberOfLikes: 20,
    numberOfComments: 10
  },
  {
    id: '2',
    title: 'Top 10 AI Applications',
    description: 'Explore the most popular AI applications.',
    postType: 'article',
    content: 'Artificial intelligence (AI) has numerous applications across various industries. Here are the top 10 AI applications:',
    numberOfLikes: 15,
    numberOfComments: 8
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Clubs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockClubs.map((club) => <ClubCard key={club.id} club={club} />)}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockEvents.map((event) => <EventCard key={event.id} event={event} />)}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPosts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      </section>
    </div>
  );
}
