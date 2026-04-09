"use client";

import { useState } from "react";
import { DollarSign, Edit, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

export default function PricingAdmin() {
  const [plans, setPlans] = useState<PricingPlan[]>([
    {
      id: "1",
      name: "Starter",
      price: "$9/month",
      features: ["Basic tracking", "10 projects", "Email support"],
    },
    {
      id: "2",
      name: "Professional",
      price: "$29/month",
      features: ["Advanced tracking", "Unlimited projects", "Priority support", "Analytics"],
      popular: true,
    },
    {
      id: "3",
      name: "Enterprise",
      price: "$99/month",
      features: ["Custom tracking", "Unlimited everything", "Dedicated support", "API access"],
    },
  ]);

  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);

  const handleEdit = (plan: PricingPlan) => {
    setEditingPlan(plan);
  };

  const handleSave = () => {
    if (editingPlan) {
      setPlans(plans.map(plan => 
        plan.id === editingPlan.id ? editingPlan : plan
      ));
      setEditingPlan(null);
    }
  };

  const handleDelete = (id: string) => {
    setPlans(plans.filter(plan => plan.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pricing Plans</h1>
          <p className="text-gray-600">Manage your subscription plans</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Plan
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className={plan.popular ? "border-blue-500" : ""}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{plan.name}</span>
                {plan.popular && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Popular
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-2xl font-bold">{plan.price}</div>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      • {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEdit(plan)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
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
        <Card>
          <CardHeader>
            <CardTitle>Edit Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="plan-name">Plan Name</Label>
                <Input
                  id="plan-name"
                  value={editingPlan.name}
                  onChange={(e) => setEditingPlan({...editingPlan, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="plan-price">Price</Label>
                <Input
                  id="plan-price"
                  value={editingPlan.price}
                  onChange={(e) => setEditingPlan({...editingPlan, price: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="plan-features">Features (one per line)</Label>
                <textarea
                  id="plan-features"
                  className="w-full min-h-[100px] p-2 border rounded"
                  value={editingPlan.features.join('\n')}
                  onChange={(e) => setEditingPlan({...editingPlan, features: e.target.value.split('\n').filter(f => f.trim())})}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleSave}>Save Changes</Button>
                <Button variant="outline" onClick={() => setEditingPlan(null)}>Cancel</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
