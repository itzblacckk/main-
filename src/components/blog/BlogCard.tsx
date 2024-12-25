import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User } from 'lucide-react';
import { BlogPost } from '../../types';
import { Card, CardContent, CardFooter } from '../ui/Card';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="flex flex-col min-h-[28rem] h-full">
      <img 
        src={post.imageUrl} 
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <CardContent className="flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2 line-clamp-2 flex-none">{post.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-4 flex-grow">{post.content}</p>
        <div className="flex items-center space-x-4 text-sm text-gray-500 flex-none">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            {post.author}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Link 
          to={`/blog/${post.id}`}
          className="text-blue-600 hover:text-blue-800 font-medium bg-white px-4 py-2 rounded-lg shadow-sm transition-colors"
        >
          Read More →
        </Link>
      </CardFooter>
    </Card>
  );
}