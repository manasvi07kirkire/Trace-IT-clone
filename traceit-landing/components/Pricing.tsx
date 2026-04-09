"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, ArrowRight, Building2, Users, Shield, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const Pricing = () => {
  const [plans, setPlans] = useState<any[]>([]);

  useEffect(() => {
    // Load pricing plans from localStorage
    const storedPlans = JSON.parse(localStorage.getItem('traceit_pricing_plans') || '[]');
    
    if (storedPlans.length > 0) {
      // Transform admin data to component format
      const transformedPlans = storedPlans.map((plan: any) => ({
        id: `plan-${plan.id}`,
        name: plan.name,
        target: plan.subtitle,
        price: plan.billing ? `${plan.price}${plan.billing}` : plan.price,
        features: plan.features.map((feature: any) => ({
          icon: 'check',
          text: feature
        })),
        highlighted: plan.popular,
        cta: plan.cta,
      }));
      setPlans(transformedPlans);
    } else {
      // Fallback to hardcoded values
      setPlans([
        {
          id: 'free',
          name: 'Free Plan',
          target: 'For basic users',
          price: 'Free',
          features: [
            { icon: 'search', text: 'Report lost items' },
            { icon: 'upload', text: 'Submit found items' },
            { icon: 'link', text: 'Basic item matching' },
            { icon: 'users', text: 'Community support' },
          ],
          highlighted: false,
          cta: 'Get Started',
        },
        {
          id: 'pro',
          name: 'Pro Plan',
          target: 'For frequent users',
          price: '$9.99/mo',
          features: [
            { icon: 'search', text: 'Priority matching' },
            { icon: 'bell', text: 'Instant notifications' },
            { icon: 'image', text: 'Upload multiple item images' },
            { icon: 'zap', text: 'Faster claim verification' },
          ],
          highlighted: true,
          cta: 'Choose Plan',
        },
        {
          id: 'organization',
          name: 'Organization Plan',
          target: 'For campuses, companies, and institutions',
          price: 'Custom',
          features: [
            { icon: 'layout-dashboard', text: 'Dedicated lost & found dashboard' },
            { icon: 'package', text: 'Bulk item management' },
            { icon: 'bar-chart', text: 'Analytics for reported items' },
            { icon: 'shield', text: 'Admin management tools' },
          ],
          highlighted: false,
          cta: 'Contact Sales',
        },
      ]);
    }
  }, []);

  // Listen for storage events for real-time updates
  useEffect(() => {
    const handleStorageChange = (e: any) => {
      if (e.key === 'traceit_pricing_plans') {
        const storedPlans = JSON.parse(e.newValue || '[]');
        if (storedPlans.length > 0) {
          const transformedPlans = storedPlans.map((plan: any) => ({
            id: `plan-${plan.id}`,
            name: plan.name,
            target: plan.subtitle,
            price: plan.billing ? `${plan.price}${plan.billing}` : plan.price,
            features: plan.features.map((feature: any) => ({
              icon: 'check',
              text: feature
            })),
            highlighted: plan.popular,
            cta: plan.cta,
          }));
          setPlans(transformedPlans);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      search: <Check className="w-5 h-5" />,
      upload: <Check className="w-5 h-5" />,
      link: <Check className="w-5 h-5" />,
      users: <Users className="w-5 h-5" />,
      bell: <Zap className="w-5 h-5" />,
      image: <Check className="w-5 h-5" />,
      zap: <Zap className="w-5 h-5" />,
      'layout-dashboard': <Building2 className="w-5 h-5" />,
      package: <Check className="w-5 h-5" />,
      'bar-chart': <Star className="w-5 h-5" />,
      shield: <Shield className="w-5 h-5" />,
    };
    return iconMap[iconName] || <Check className="w-5 h-5" />;
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Simple Pricing for Everyone
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Users can choose a plan that fits their needs, from individual users to organizations.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan: any, index: number) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:scale-105",
                plan.highlighted
                  ? "border-cyan-500 shadow-2xl shadow-cyan-500/20"
                  : "border-gray-800 hover:border-gray-700"
              )}
            >
              {/* Recommended Badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    RECOMMENDED
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.target}</p>
                <div className="text-4xl font-bold text-white mb-6">
                  {plan.price}
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature: any, featureIndex: number) => (
                  <motion.div
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: (index * 0.1) + (featureIndex * 0.05) }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <div className="text-cyan-400 flex-shrink-0">
                      {getIcon(feature.icon)}
                    </div>
                    <span className="text-gray-300">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center",
                  plan.highlighted
                    ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700 shadow-lg"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                )}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 ml-2" />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-4">
            All plans include core TraceIT features with 24/7 support
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="flex items-center text-gray-300">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
