"use client";

import { useState } from "react";
import { Heart, TrendingUp, Users, Target, Edit, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CommunityMetric {
  id: string;
  title: string;
  value: string;
  description: string;
  trend: "up" | "down" | "neutral";
  change: string;
}

interface CommunityInitiative {
  id: string;
  name: string;
  description: string;
  beneficiaries: number;
  status: "active" | "completed" | "planned";
  date: string;
}

export default function CommunityAdmin() {
  const [metrics, setMetrics] = useState<CommunityMetric[]>([
    {
      id: "1",
      title: "Lives Impacted",
      value: "10,234",
      description: "People reached through our initiatives",
      trend: "up",
      change: "+15.3%",
    },
    {
      id: "2",
      title: "Carbon Offset",
      value: "5,678 tons",
      description: "CO2 emissions reduced",
      trend: "up",
      change: "+8.7%",
    },
    {
      id: "3",
      title: "Community Projects",
      value: "42",
      description: "Active community initiatives",
      trend: "up",
      change: "+3 new",
    },
    {
      id: "4",
      title: "Volunteer Hours",
      value: "3,456",
      description: "Hours contributed by volunteers",
      trend: "up",
      change: "+12.1%",
    },
  ]);

  const [initiatives, setInitiatives] = useState<CommunityInitiative[]>([
    {
      id: "1",
      name: "Digital Literacy Program",
      description: "Teaching digital skills to underserved communities",
      beneficiaries: 1500,
      status: "active",
      date: "2024-01-15",
    },
    {
      id: "2",
      name: "Green Tech Initiative",
      description: "Promoting sustainable technology practices",
      beneficiaries: 800,
      status: "active",
      date: "2024-01-10",
    },
    {
      id: "3",
      name: "Youth Coding Bootcamp",
      description: "Free coding education for high school students",
      beneficiaries: 200,
      status: "completed",
      date: "2023-12-15",
    },
  ]);

  const getStatusColor = (status: CommunityInitiative["status"]) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "planned": return "bg-gray-100 text-gray-800";
    }
  };

  const getTrendIcon = (trend: CommunityMetric["trend"]) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down": return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      case "neutral": return <TrendingUp className="h-4 w-4 text-gray-600 rotate-90" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community Impact</h1>
          <p className="text-gray-600">Track and manage community initiatives</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Initiative
        </Button>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
              <div className="flex items-center mt-2">
                {getTrendIcon(metric.trend)}
                <span className={`text-xs ml-1 ${
                  metric.trend === "up" ? "text-green-600" : 
                  metric.trend === "down" ? "text-red-600" : 
                  "text-gray-600"
                }`}>
                  {metric.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Initiatives */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Community Initiatives</h2>
        {initiatives.map((initiative) => (
          <Card key={initiative.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{initiative.name}</CardTitle>
                <span className={`text-xs px-2 py-1 rounded ${getStatusColor(initiative.status)}`}>
                  {initiative.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">{initiative.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {initiative.beneficiaries} beneficiaries
                    </div>
                    <div className="flex items-center">
                      <Target className="h-4 w-4 mr-1" />
                      {initiative.date}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
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
