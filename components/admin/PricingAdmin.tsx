"use client";

import { useState, useEffect } from "react";
import { DollarSign, Edit, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  billing: string;
  features: string[];
  popular: boolean;
  cta: string;
}

export default function PricingAdmin() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);

  useEffect(() => {
    // Load pricing plans from localStorage
    const storedPlans = JSON.parse(localStorage.getItem('traceit_pricing_plans') || '[]');
    
    if (storedPlans.length > 0) {
      setPlans(storedPlans);
    } else {
      // Initialize with default data if no data exists
      const defaultPlans = [
        {
          id: "1",
          name: "Free Plan",
          subtitle: "For basic users",
          price: "Free",
          billing: "",
          features: ["Report lost items", "Submit found items", "Basic item matching", "Community support"],
          popular: false,
          cta: "Get Started",
        },
        {
          id: "2",
          name: "Pro Plan",
          subtitle: "For frequent users",
          price: "$9.99",
          billing: "/mo",
          features: ["Priority matching", "Instant notifications", "Upload multiple item images", "Faster claim verification"],
          popular: true,
          cta: "Choose Plan",
        },
        {
          id: "3",
          name: "Organization Plan",
          subtitle: "For campuses, companies, and institutions",
          price: "Custom",
          billing: "",
          features: ["Dedicated lost & found dashboard", "Bulk item management", "Analytics for reported items", "Admin management tools"],
          popular: false,
          cta: "Contact Sales",
        },
      ];
      setPlans(defaultPlans);
      localStorage.setItem('traceit_pricing_plans', JSON.stringify(defaultPlans));
    }
  }, []);

  // Save to localStorage whenever plans change
  useEffect(() => {
    if (plans.length > 0) {
      localStorage.setItem('traceit_pricing_plans', JSON.stringify(plans));
    }
  }, [plans]);

  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);

  const handleEdit = (plan: PricingPlan) => {
    setEditingPlan(plan);
  };

  const handleSave = () => {
    if (editingPlan) {
      const updatedPlans = plans.map(plan => 
        plan.id === editingPlan.id ? editingPlan : plan
      );
      setPlans(updatedPlans);
      localStorage.setItem('traceit_pricing_plans', JSON.stringify(updatedPlans));
      setEditingPlan(null);
    }
  };

  const handleDelete = (id: string) => {
    const updatedPlans = plans.filter(plan => plan.id !== id);
    setPlans(updatedPlans);
    localStorage.setItem('traceit_pricing_plans', JSON.stringify(updatedPlans));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Pricing Plans</h1>
          <p className="text-gray-400">Manage your subscription plans</p>
        </div>
        <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0">
          <Plus className="h-4 w-4 mr-2" />
          Add Plan
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className={`bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 ${
            plan.popular ? "border-cyan-500/50 shadow-lg shadow-cyan-500/20" : ""
          }`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-white">{plan.name}</span>
                {plan.popular && (
                  <span className="text-xs bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-2 py-1 rounded-full">
                    Popular
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-400">{plan.subtitle}</div>
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  {plan.billing ? `${plan.price}${plan.billing}` : plan.price}
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-300">
                      • {feature}
                    </li>
                  ))}
                </ul>
                <div className="text-sm text-gray-500">CTA: {plan.cta}</div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-cyan-500/10 hover:border-cyan-500 hover:text-cyan-400"
                    onClick={() => handleEdit(plan)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-red-500/10 hover:border-red-500 hover:text-red-400"
                    onClick={() => handleDelete(plan.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {editingPlan && (
        <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Edit Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="plan-name" className="text-gray-300">Plan Name</Label>
                <Input
                  id="plan-name"
                  value={editingPlan.name}
                  onChange={(e) => setEditingPlan({...editingPlan, name: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="plan-subtitle" className="text-gray-300">Subtitle</Label>
                <Input
                  id="plan-subtitle"
                  value={editingPlan.subtitle}
                  onChange={(e) => setEditingPlan({...editingPlan, subtitle: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="plan-price" className="text-gray-300">Price</Label>
                <Input
                  id="plan-price"
                  value={editingPlan.price}
                  onChange={(e) => setEditingPlan({...editingPlan, price: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="plan-billing" className="text-gray-300">Billing (e.g., /mo, /yr)</Label>
                <Input
                  id="plan-billing"
                  value={editingPlan.billing}
                  onChange={(e) => setEditingPlan({...editingPlan, billing: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="plan-cta" className="text-gray-300">CTA Button Text</Label>
                <Input
                  id="plan-cta"
                  value={editingPlan.cta}
                  onChange={(e) => setEditingPlan({...editingPlan, cta: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <Label htmlFor="plan-features" className="text-gray-300">Features (one per line)</Label>
                <textarea
                  id="plan-features"
                  className="w-full min-h-[100px] p-2 border rounded bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  value={editingPlan.features.join('\n')}
                  onChange={(e) => setEditingPlan({...editingPlan, features: e.target.value.split('\n').filter(f => f.trim())})}
                />
              </div>
              <div className="flex space-x-2">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0" onClick={handleSave}>Save Changes</Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700" onClick={() => setEditingPlan(null)}>Cancel</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
