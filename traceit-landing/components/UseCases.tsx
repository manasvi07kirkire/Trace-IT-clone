"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, Shield, Zap } from "lucide-react";

const useCases = [
  {
    title: "Student Life",
    description: "From dorm rooms to libraries, track your belongings across campus locations.",
    icon: <BookOpen className="w-8 h-8 text-cyan-400" />,
    delay: 0.1
  },
  {
    title: "Campus Events",
    description: "Concerts, sports games, and study groups - never lose track of your items again.",
    icon: <Users className="w-8 h-8 text-cyan-400" />,
    delay: 0.2
  },
  {
    title: "Daily Commute",
    description: "Between classes, dining halls, and student centers - keep everything secure.",
    icon: <Shield className="w-8 h-8 text-cyan-400" />,
    delay: 0.3
  },
  {
    title: "Study Sessions",
    description: "Library, computer labs, and group study areas - focus on learning, not on finding lost items.",
    icon: <Zap className="w-8 h-8 text-cyan-400" />,
    delay: 0.4
  }
];

export default function UseCases() {
  return (
    <section id="use-cases" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Perfect for Every Situation
            </span>
          </h2>
          
          <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
            TraceIT adapts to your lifestyle. Whether you're studying, socializing, or commuting, 
            we've got you covered with smart lost and found tracking.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: useCase.delay }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">
                  {useCase.icon}
                </div>
                
                <h3 className="text-lg font-semibold text-white text-center mb-2">
                  {useCase.title}
                </h3>
                
                <p className="text-gray-300 text-center leading-relaxed text-sm">
                  {useCase.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
