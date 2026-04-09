"use client";

import { useState } from "react";
import { FileText, Edit, Plus, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  published: boolean;
  views: number;
}

export default function BlogsAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: "1",
      title: "Getting Started with TraceIT",
      excerpt: "Learn how to set up and use TraceIT for your business needs...",
      author: "John Doe",
      date: "2024-01-15",
      published: true,
      views: 1250,
    },
    {
      id: "2",
      title: "Advanced Tracking Features",
      excerpt: "Discover the powerful features that make TraceIT stand out...",
      author: "Jane Smith",
      date: "2024-01-12",
      published: true,
      views: 890,
    },
    {
      id: "3",
      title: "Case Study: Company X Success",
      excerpt: "How Company X increased efficiency by 40% with TraceIT...",
      author: "Bob Johnson",
      date: "2024-01-10",
      published: false,
      views: 0,
    },
  ]);

  const togglePublished = (id: string) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, published: !post.published } : post
    ));
  };

  const deletePost = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-600">Manage your blog content</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{post.title}</CardTitle>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    post.published 
                      ? "bg-green-100 text-green-800" 
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Eye className="h-4 w-4 mr-1" />
                    {post.views}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span>By {post.author}</span>
                    <span>{post.date}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => togglePublished(post.id)}
                    >
                      {post.published ? "Unpublish" : "Publish"}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deletePost(post.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
