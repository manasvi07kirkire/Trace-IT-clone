"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface StatsBarProps {
  value: number;
  label: string;
  color: string;
  delay: number;
}

const StatsBar = ({ value, label, color, delay }: StatsBarProps) => {
  return (
    <div className="relative h-full flex-1">
      <div className="absolute bottom-0 left-0 w-full h-full bg-gray-800/30 rounded-lg overflow-hidden">

        <motion.div
          className={cn(
            "absolute bottom-0 left-0 w-full bg-gradient-to-t transition-all duration-1000",
            color
          )}
          style={{ height: `${value}%` }}
          initial={{ height: 0 }}
          animate={{ height: `${value}%` }}
          transition={{ duration: 0.5, delay, ease: "easeOut" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/60 rounded-full px-3 py-1 backdrop-blur-sm">
              <span className="text-white font-bold text-sm">{value}%</span>
            </div>
          </div>
        </motion.div>

      </div>

      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
        <div className="bg-gray-900 rounded-lg px-3 py-1 shadow-lg">
          <span className="text-gray-300 text-sm">{label}</span>
        </div>
      </div>
    </div>
  );
};

interface StatisticsCardProps {
  className?: string;
}

const StatisticsCard = ({ className }: StatisticsCardProps) => {
  const [stats, setStats] = useState<any[]>([]);

  const transformStats = (storedMetrics: any[]) => {
    return storedMetrics.map((metric: any, index: number) => {
      // Extract numeric value from the metric value (e.g., "1,234" -> 1234, "89%" -> 89)
      let value = parseInt(metric.value.replace(/[^0-9]/g, ''));
      
      // If the value is a percentage, use it directly, otherwise scale it to a reasonable percentage
      if (metric.value.includes('%')) {
        value = parseInt(metric.value.replace('%', ''));
      } else {
        // Scale large numbers to a percentage (e.g., 1234 -> 85%)
        value = Math.min(95, Math.max(15, (value / 100) % 100));
      }
      
      const colors = [
        "from-cyan-400 to-cyan-600",
        "from-purple-400 to-purple-600", 
        "from-green-400 to-green-600",
        "from-blue-400 to-blue-600"
      ];
      
      return {
        value: value,
        label: metric.title,
        color: colors[index % colors.length],
        delay: 0.2 * (index + 1),
      };
    });
  };

  useEffect(() => {
    // Load metrics from localStorage
    const storedMetrics = JSON.parse(localStorage.getItem('traceit_community_metrics') || '[]');
    
    if (storedMetrics.length > 0) {
      // Transform admin data to component format
      const transformedStats = transformStats(storedMetrics);
      setTimeout(() => {
        setStats(transformedStats);
      }, 0);
    } else {
      // Fallback to hardcoded values
      setTimeout(() => {
        setStats([
          { value: 85, label: "Items Recovered", color: "from-cyan-400 to-cyan-600", delay: 0.2 },
          { value: 92, label: "Active Users", color: "from-purple-400 to-purple-600", delay: 0.4 },
          { value: 78, label: "Success Rate", color: "from-green-400 to-green-600", delay: 0.6 },
          { value: 95, label: "User Satisfaction", color: "from-blue-400 to-blue-600", delay: 0.8 },
        ]);
      }, 0);
    }
  }, []);

  // Listen for storage events for real-time updates
  useEffect(() => {
    const handleStorageChange = (e: any) => {
      if (e.key === 'traceit_community_metrics') {
        const storedMetrics = JSON.parse(e.newValue || '[]');
        if (storedMetrics.length > 0) {
          const transformedStats = transformStats(storedMetrics);
          setStats(transformedStats);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <section className={cn("py-20", className)}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Community Impact
            </span>
          </h2>

          <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
            See how TraceIT is making a difference in communities worldwide with real-time statistics and success metrics.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-64">
            {stats.map((stat, index) => (
              <StatsBar
                key={index}
                value={stat.value}
                label={stat.label}
                color={stat.color}
                delay={stat.delay}
              />
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default StatisticsCard;