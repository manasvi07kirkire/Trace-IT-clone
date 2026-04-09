"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  Users,
  MessageSquare,
  FileText,
  DollarSign,
  TrendingUp,
  Eye,
  Heart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: "up" | "down" | "neutral";
}

function StatCard({ title, value, change, icon, trend }: StatCardProps) {
  return (
    <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-300">{title}</CardTitle>
        <div className="h-4 w-4 text-cyan-400">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">{value}</div>
        <p className={`text-xs ${
          trend === "up" ? "text-green-400" : 
          trend === "down" ? "text-red-400" : 
          "text-gray-400"
        }`}>
          {change} from last month
        </p>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: "2,543",
    totalInquiries: "189",
    totalBlogs: "24",
    totalTestimonials: "47",
    revenue: "$12,450",
    communityImpact: "1,234"
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Dashboard</h1>
        <p className="text-gray-400">Welcome to the TraceIT admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          change="+12.5%"
          icon={<Users />}
          trend="up"
        />
        <StatCard
          title="Contact Inquiries"
          value={stats.totalInquiries}
          change="+8.2%"
          icon={<MessageSquare />}
          trend="up"
        />
        <StatCard
          title="Blog Posts"
          value={stats.totalBlogs}
          change="+2 new"
          icon={<FileText />}
          trend="up"
        />
        <StatCard
          title="Testimonials"
          value={stats.totalTestimonials}
          change="+5 new"
          icon={<Heart />}
          trend="up"
        />
        <StatCard
          title="Revenue"
          value={stats.revenue}
          change="+23.1%"
          icon={<DollarSign />}
          trend="up"
        />
        <StatCard
          title="Community Impact"
          value={stats.communityImpact}
          change="+15.3%"
          icon={<TrendingUp />}
          trend="up"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "John Doe", email: "john@example.com", time: "2 hours ago" },
                { name: "Jane Smith", email: "jane@example.com", time: "4 hours ago" },
                { name: "Bob Johnson", email: "bob@example.com", time: "6 hours ago" },
              ].map((inquiry, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
                  <div>
                    <p className="font-medium text-white">{inquiry.name}</p>
                    <p className="text-sm text-gray-400">{inquiry.email}</p>
                  </div>
                  <p className="text-sm text-gray-500">{inquiry.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New testimonial added", time: "1 hour ago", icon: <Heart className="h-4 w-4 text-cyan-400" /> },
                { action: "Blog post published", time: "3 hours ago", icon: <FileText className="h-4 w-4 text-purple-400" /> },
                { action: "Pricing updated", time: "5 hours ago", icon: <DollarSign className="h-4 w-4 text-green-400" /> },
                { action: "New user registered", time: "8 hours ago", icon: <Users className="h-4 w-4 text-yellow-400" /> },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
                  <div className="">{activity.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-300">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
