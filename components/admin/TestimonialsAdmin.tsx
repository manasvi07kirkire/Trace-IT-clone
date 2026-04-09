"use client";

import { useState, useEffect } from "react";
import { Users, Star, Edit, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  review: string;
  rating: number;
  featured: boolean;
}

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  useEffect(() => {
    // Load testimonials from localStorage
    const storedTestimonials = JSON.parse(localStorage.getItem('traceit_testimonials') || '[]');
    
    if (storedTestimonials.length > 0) {
      setTestimonials(storedTestimonials);
    } else {
      // Initialize with default data if no data exists
      const defaultTestimonials = [
        {
          id: "1",
          name: "Sarah Johnson",
          role: "Campus Administrator",
          avatar: "https://randomuser.me/api/portraits/women/1.jpg",
          review: "TraceIT revolutionized our campus lost & found system. Students can now report and find items within minutes instead of days.",
          rating: 5,
          featured: true,
        },
        {
          id: "2",
          name: "Michael Chen",
          role: "Student",
          avatar: "https://randomuser.me/api/portraits/men/2.jpg",
          review: "The smart search feature is incredible. I found my lost laptop within hours of reporting it. The community aspect really works!",
          rating: 5,
          featured: true,
        },
        {
          id: "3",
          name: "Emily Rodriguez",
          role: "IT Director",
          avatar: "https://randomuser.me/api/portraits/women/3.jpg",
          review: "Implementing TraceIT was seamless. The platform is intuitive and our staff needed minimal training to get started.",
          rating: 5,
          featured: false,
        },
      ];
      setTestimonials(defaultTestimonials);
      localStorage.setItem('traceit_testimonials', JSON.stringify(defaultTestimonials));
    }
  }, []);

  // Save to localStorage whenever testimonials change
  useEffect(() => {
    if (testimonials.length > 0) {
      localStorage.setItem('traceit_testimonials', JSON.stringify(testimonials));
    }
  }, [testimonials]);

  const toggleFeatured = (id: string) => {
    const updatedTestimonials = testimonials.map(testimonial => 
      testimonial.id === id ? { ...testimonial, featured: !testimonial.featured } : testimonial
    );
    setTestimonials(updatedTestimonials);
    localStorage.setItem('traceit_testimonials', JSON.stringify(updatedTestimonials));
  };

  const deleteTestimonial = (id: string) => {
    const updatedTestimonials = testimonials.filter(testimonial => testimonial.id !== id);
    setTestimonials(updatedTestimonials);
    localStorage.setItem('traceit_testimonials', JSON.stringify(updatedTestimonials));
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
  };

  const handleSave = () => {
    if (editingTestimonial) {
      const updatedTestimonials = testimonials.map(testimonial => 
        testimonial.id === editingTestimonial.id ? editingTestimonial : testimonial
      );
      setTestimonials(updatedTestimonials);
      localStorage.setItem('traceit_testimonials', JSON.stringify(updatedTestimonials));
      setEditingTestimonial(null);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Testimonials</h1>
          <p className="text-gray-400">Manage customer testimonials</p>
        </div>
        <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0">
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg text-white">{testimonial.name}</CardTitle>
                  <p className="text-sm text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {testimonial.featured && (
                    <span className="text-xs bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                  <div className="flex">{renderStars(testimonial.rating)}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-300">"{testimonial.review}"</p>
                <div className="text-sm text-gray-500">Avatar: {testimonial.avatar}</div>
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-cyan-500/10 hover:border-cyan-500 hover:text-cyan-400"
                    onClick={() => handleEdit(testimonial)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-purple-500/10 hover:border-purple-500 hover:text-purple-400"
                    onClick={() => toggleFeatured(testimonial.id)}
                  >
                    {testimonial.featured ? "Unfeature" : "Feature"}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-red-500/10 hover:border-red-500 hover:text-red-400"
                    onClick={() => deleteTestimonial(testimonial.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {editingTestimonial && (
        <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Edit Testimonial</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="testimonial-name" className="text-gray-300">Name</Label>
                <Input
                  id="testimonial-name"
                  value={editingTestimonial.name}
                  onChange={(e) => setEditingTestimonial({...editingTestimonial, name: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="testimonial-role" className="text-gray-300">Role</Label>
                <Input
                  id="testimonial-role"
                  value={editingTestimonial.role}
                  onChange={(e) => setEditingTestimonial({...editingTestimonial, role: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="testimonial-avatar" className="text-gray-300">Avatar URL</Label>
                <Input
                  id="testimonial-avatar"
                  value={editingTestimonial.avatar}
                  onChange={(e) => setEditingTestimonial({...editingTestimonial, avatar: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="testimonial-review" className="text-gray-300">Review</Label>
                <textarea
                  id="testimonial-review"
                  className="w-full min-h-[100px] p-2 border rounded bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  value={editingTestimonial.review}
                  onChange={(e) => setEditingTestimonial({...editingTestimonial, review: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="testimonial-rating" className="text-gray-300">Rating (1-5)</Label>
                <Input
                  id="testimonial-rating"
                  type="number"
                  min="1"
                  max="5"
                  value={editingTestimonial.rating}
                  onChange={(e) => setEditingTestimonial({...editingTestimonial, rating: parseInt(e.target.value)})}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div className="flex space-x-2">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0" onClick={handleSave}>Save Changes</Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700" onClick={() => setEditingTestimonial(null)}>Cancel</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
