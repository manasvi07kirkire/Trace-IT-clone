"use client";



import { useState, useEffect } from "react";

import { Heart, TrendingUp, Users, Target, Edit, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";



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

  const [metrics, setMetrics] = useState<CommunityMetric[]>([]);

  const [initiatives, setInitiatives] = useState<CommunityInitiative[]>([]);

  const [settings, setSettings] = useState({

    sectionTitle: "Community Impact",

    sectionSubtitle: "See how TraceIT is making a difference in communities worldwide with real-time statistics and success metrics.",

  });



  useEffect(() => {

    // Load metrics from localStorage

    const storedMetrics = JSON.parse(localStorage.getItem('traceit_community_metrics') || '[]');

    if (storedMetrics.length > 0) {

      setMetrics(storedMetrics);

    } else {

      const defaultMetrics = [

        {

          id: "1",

          title: "Items Recovered",

          value: "1,234",

          description: "Successfully returned items",

          trend: "up" as const,

          change: "+15.3%",

        },

        {

          id: "2",

          title: "Active Users",

          value: "5,678",

          description: "People using TraceIT",

          trend: "up" as const,

          change: "+8.7%",

        },

        {

          id: "3",

          title: "Campus Partners",

          value: "42",

          description: "Educational institutions",

          trend: "up" as const,

          change: "+3 new",

        },

        {

          id: "4",

          title: "Success Rate",

          value: "89%",

          description: "Items successfully returned",

          trend: "up" as const,

          change: "+12.1%",

        },

      ];

      setMetrics(defaultMetrics);

      localStorage.setItem('traceit_community_metrics', JSON.stringify(defaultMetrics));

    }



    // Load initiatives from localStorage

    const storedInitiatives = JSON.parse(localStorage.getItem('traceit_community_initiatives') || '[]');

    if (storedInitiatives.length > 0) {

      setInitiatives(storedInitiatives);

    } else {

      const defaultInitiatives = [

        {

          id: "1",

          name: "Campus Lost & Found Integration",

          description: "Partnering with universities to streamline lost item recovery",

          beneficiaries: 1500,

          status: "active" as const,

          date: "2024-01-15",

        },

        {

          id: "2",

          name: "Community Awareness Program",

          description: "Educating communities about responsible item reporting",

          beneficiaries: 800,

          status: "active" as const,

          date: "2024-01-10",

        },

        {

          id: "3",

          name: "Mobile App Development",

          description: "Creating accessible mobile solutions for everyone",

          beneficiaries: 200,

          status: "completed" as const,

          date: "2023-12-15",

        },

      ];

      setInitiatives(defaultInitiatives);

      localStorage.setItem('traceit_community_initiatives', JSON.stringify(defaultInitiatives));

    }



    // Load settings from localStorage

    const storedSettings = JSON.parse(localStorage.getItem('traceit_community_settings') || '{}');

    if (Object.keys(storedSettings).length > 0) {

      setSettings(storedSettings);

    } else {

      localStorage.setItem('traceit_community_settings', JSON.stringify(settings));

    }

  }, []);



  // Save to localStorage whenever data changes

  useEffect(() => {
    localStorage.setItem('traceit_community_metrics', JSON.stringify(metrics));
  }, [metrics]);


  useEffect(() => {
    localStorage.setItem('traceit_community_initiatives', JSON.stringify(initiatives));
  }, [initiatives]);


  useEffect(() => {

    localStorage.setItem('traceit_community_settings', JSON.stringify(settings));

  }, [settings]);



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

          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Community Impact</h1>

          <p className="text-gray-400">Track and manage community initiatives</p>

        </div>

        <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0">

          <Plus className="h-4 w-4 mr-2" />

          Add Initiative

        </Button>

      </div>



      {/* Metrics Grid */}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

        {metrics.map((metric) => (

          <Card key={metric.id} className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

              <CardTitle className="text-sm font-medium text-gray-300">{metric.title}</CardTitle>

              <Heart className="h-4 w-4 text-cyan-400" />

            </CardHeader>

            <CardContent>

              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">{metric.value}</div>

              <p className="text-xs text-gray-500">{metric.description}</p>

              <div className="flex items-center mt-2">

                {getTrendIcon(metric.trend)}

                <span className={`text-xs ml-1 ${

                  metric.trend === "up" ? "text-green-400" : 

                  metric.trend === "down" ? "text-red-400" : 

                  "text-gray-400"

                }`}>

                  {metric.change}

                </span>

              </div>

            </CardContent>

          </Card>

        ))}

      </div>



      {/* Section Settings */}

      <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border-gray-700">

        <CardHeader>

          <CardTitle className="text-white">Section Settings</CardTitle>

        </CardHeader>

        <CardContent>

          <div className="space-y-4">

            <div>

              <Label htmlFor="section-title" className="text-gray-300">Section Title</Label>

              <Input

                id="section-title"

                value={settings.sectionTitle}

                onChange={(e) => setSettings({...settings, sectionTitle: e.target.value})}

                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"

              />

            </div>

            <div>

              <Label htmlFor="section-subtitle" className="text-gray-300">Section Subtitle</Label>

              <Input

                id="section-subtitle"

                value={settings.sectionSubtitle}

                onChange={(e) => setSettings({...settings, sectionSubtitle: e.target.value})}

                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"

              />

            </div>

          </div>

        </CardContent>

      </Card>



      {/* Initiatives */}

      <div className="space-y-4">

        <h2 className="text-xl font-semibold text-white">Community Initiatives</h2>

        {initiatives.map((initiative) => (

          <Card key={initiative.id} className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">

            <CardHeader>

              <div className="flex items-center justify-between">

                <CardTitle className="text-lg text-white">{initiative.name}</CardTitle>

                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(initiative.status)}`}>

                  {initiative.status}

                </span>

              </div>

            </CardHeader>

            <CardContent>

              <div className="space-y-4">

                <p className="text-gray-300">{initiative.description}</p>

                <div className="flex items-center justify-between">

                  <div className="flex items-center space-x-4 text-sm text-gray-400">

                    <div className="flex items-center">

                      <Users className="h-4 w-4 mr-1 text-cyan-400" />

                      {initiative.beneficiaries} beneficiaries

                    </div>

                    <div className="flex items-center">

                      <Target className="h-4 w-4 mr-1 text-purple-400" />

                      {initiative.date}

                    </div>

                  </div>

                  <div className="flex space-x-2">

                    <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-cyan-500/10 hover:border-cyan-500 hover:text-cyan-400">

                      <Edit className="h-4 w-4" />

                    </Button>

                    <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-red-500/10 hover:border-red-500 hover:text-red-400">

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

