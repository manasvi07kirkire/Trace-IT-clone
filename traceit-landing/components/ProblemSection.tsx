"use client";

import { motion } from "framer-motion";
import { Search, AlertCircle, Users, ArrowRight } from "lucide-react";

const problems = [
  {
    title: "Lost Your Phone?",
    description: "It happens to everyone. You&apos;re in the library, your phone slips out of your pocket, and suddenly it&apos;s gone.",
    icon: <Search className="w-8 h-8 text-cyan-400" />,
    delay: 0.1
  },
  {
    title: "Missing Keys?",
    description: "You&apos;re rushing to class, Reach for your keys, and they&apos;re not there. Panic starts to set in.",
    icon: <AlertCircle className="w-8 h-8 text-purple-400" />,
    delay: 0.2
  },
  {
    title: "Wallet Disappeared?",
    description: "You had it at lunch, but now it&apos;s nowhere to be found. Important cards and cash inside.",
    icon: <Users className="w-8 h-8 text-cyan-400" />,
    delay: 0.3
  }
];

export default function ProblemSection() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              We've All Been There
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Losing important items is stressful and frustrating. In shared spaces like campuses, 
            it happens every day to someone, somewhere.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: problem.delay }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 mb-6">
                  {problem.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-white text-center mb-3">
                  {problem.title}
                </h3>
                
                <p className="text-gray-300 text-center leading-relaxed">
                  {problem.description}
                </p>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: problem.delay + 0.3 }}
                  className="flex items-center justify-center mt-4"
                >
                  <ArrowRight className="w-5 h-5 text-cyan-400" />
                  <span className="text-cyan-400 ml-2">TraceIT helps</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full px-6 py-3">
            <span className="text-white font-semibold">Stop the Stress</span>
            <span className="text-white font-bold">Start Reconnecting</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
