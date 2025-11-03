// components/ui/PostCard.tsx
import { Heart, MessageCircle } from 'lucide-react';
import { Post } from '../../app/types';
export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow cursor-pointer">
      <h3 className="text-lg font-bold mb-2">{post.title}</h3>
      <p className="text-gray-600 text-sm line-clamp-3 mb-3">{post.description}</p>
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Heart className="w-4 h-4" /> {post.numberOfLikes}
        </span>
        <span className="flex items-center gap-1">
          <MessageCircle className="w-4 h-4" /> {post.numberOfComments}
        </span>
      </div>
    </div>
  );
}
