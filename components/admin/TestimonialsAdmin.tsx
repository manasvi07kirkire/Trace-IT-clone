"use client";

import { useState } from "react";
import { Users, Star, Edit, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  featured: boolean;
}

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: "1",
      name: "Sarah Wilson",
      role: "CEO",
      company: "TechCorp",
      content: "TraceIT has transformed how we track our projects. The insights are invaluable!",
      rating: 5,
      featured: true,
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Product Manager",
      company: "StartupXYZ",
      content: "The best tracking solution we've used. Simple, powerful, and reliable.",
      rating: 5,
      featured: true,
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      role: "Operations Director",
      company: "Global Inc",
      content: "Increased our team efficiency by 40%. Highly recommended!",
      rating: 4,
      featured: false,
    },
  ]);

  const toggleFeatured = (id: string) => {
    setTestimonials(testimonials.map(testimonial => 
      testimonial.id === id ? { ...testimonial, featured: !testimonial.featured } : testimonial
    ));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
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
          <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-600">Manage customer testimonials</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <p className="text-sm text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {testimonial.featured && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                  <div className="flex">{renderStars(testimonial.rating)}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">"{testimonial.content}"</p>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleFeatured(testimonial.id)}
                  >
                    {testimonial.featured ? "Unfeature" : "Feature"}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
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
    </div>
  );
}
