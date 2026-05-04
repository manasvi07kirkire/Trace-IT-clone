"use client";



import { useState, useEffect } from "react";

import { MessageSquare, Mail, Phone, Calendar, CheckCircle, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";



interface ContactInquiry {

  id: string;

  name: string;

  email: string;

  phone?: string;

  message: string;

  date: string;

  status: "new" | "contacted" | "resolved";

}



export default function ContactAdmin() {

  const [inquiries, setInquiries] = useState<ContactInquiry[]>([

    {

      id: "1",

      name: "John Doe",

      email: "john@example.com",

      phone: "+1 234-567-8900",

      message: "I'm interested in your enterprise plan. Can you provide more details?",

      date: "2024-01-15",

      status: "new",

    },

    {

      id: "2",

      name: "Jane Smith",

      email: "jane@example.com",

      message: "Great product! How do I integrate with my existing workflow?",

      date: "2024-01-14",

      status: "contacted",

    },

    {

      id: "3",

      name: "Bob Johnson",

      email: "bob@example.com",

      phone: "+1 234-567-8901",

      message: "Do you offer custom pricing for non-profits?",

      date: "2024-01-13",

      status: "resolved",

    },

  ]);



  const updateStatus = (id: string, status: ContactInquiry["status"]) => {

    const updatedInquiries = inquiries.map(inquiry => 

      inquiry.id === id ? { ...inquiry, status } : inquiry

    );

    setInquiries(updatedInquiries);

    localStorage.setItem('traceit_contact_inquiries', JSON.stringify(updatedInquiries));

  };

  const deleteInquiry = (id: string) => {

    const updatedInquiries = inquiries.filter(inquiry => inquiry.id !== id);

    setInquiries(updatedInquiries);

    localStorage.setItem('traceit_contact_inquiries', JSON.stringify(updatedInquiries));

  };

  useEffect(() => {
    localStorage.setItem('traceit_contact_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);



  const getStatusColor = (status: ContactInquiry["status"]) => {

    switch (status) {

      case "new": return "bg-blue-100 text-blue-800";

      case "contacted": return "bg-yellow-100 text-yellow-800";

      case "resolved": return "bg-green-100 text-green-800";

    }

  };



  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold text-gray-900">Contact Inquiries</h1>

        <p className="text-gray-600">Manage customer inquiries and support requests</p>

      </div>



      <div className="grid gap-4">

        {inquiries.map((inquiry) => (

          <Card key={inquiry.id}>

            <CardHeader>

              <div className="flex items-center justify-between">

                <CardTitle className="text-lg">{inquiry.name}</CardTitle>

                <span className={`text-xs px-2 py-1 rounded ${getStatusColor(inquiry.status)}`}>

                  {inquiry.status}

                </span>

              </div>

            </CardHeader>

            <CardContent>

              <div className="space-y-4">

                <div className="flex items-center space-x-4 text-sm text-gray-600">

                  <div className="flex items-center">

                    <Mail className="h-4 w-4 mr-1" />

                    {inquiry.email}

                  </div>

                  {inquiry.phone && (

                    <div className="flex items-center">

                      <Phone className="h-4 w-4 mr-1" />

                      {inquiry.phone}

                    </div>

                  )}

                  <div className="flex items-center">

                    <Calendar className="h-4 w-4 mr-1" />

                    {inquiry.date}

                  </div>

                </div>

                <div className="bg-gray-50 p-3 rounded">

                  <p className="text-sm">{inquiry.message}</p>

                </div>

                <div className="flex space-x-2">

                  {inquiry.status === "new" && (

                    <Button 

                      size="sm" 

                      onClick={() => updateStatus(inquiry.id, "contacted")}

                    >

                      Mark as Contacted

                    </Button>

                  )}

                  {inquiry.status === "contacted" && (

                    <Button 

                      size="sm" 

                      onClick={() => updateStatus(inquiry.id, "resolved")}

                    >

                      <CheckCircle className="h-4 w-4 mr-1" />

                      Mark as Resolved

                    </Button>

                  )}

                  {inquiry.status === "resolved" && (

                    <Button 

                      size="sm" 

                      variant="outline"

                      onClick={() => updateStatus(inquiry.id, "new")}

                    >

                      Reopen

                    </Button>

                  )}

                </div>

              </div>

            </CardContent>

          </Card>

        ))}

      </div>

    </div>

  );

}

