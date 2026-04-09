"use client";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    // Load testimonials from localStorage
    const storedTestimonials = JSON.parse(localStorage.getItem('traceit_testimonials') || '[]');
    
    if (storedTestimonials.length > 0) {
      // Transform admin data to component format
      const transformedTestimonials = storedTestimonials.map((testimonial: any) => ({
        text: testimonial.review,
        image: testimonial.avatar,
        name: testimonial.name,
        role: testimonial.role,
        rating: testimonial.rating,
        featured: testimonial.featured,
      }));
      setTestimonials(transformedTestimonials);
    } else {
      // Fallback to hardcoded values
      setTestimonials([
        {
          text: "TraceIT revolutionized our campus lost & found system. Students can now report and find items within minutes instead of days.",
          image: "https://randomuser.me/api/portraits/women/1.jpg",
          name: "Sarah Johnson",
          role: "Campus Administrator",
        },
        {
          text: "The smart search feature is incredible. I found my lost laptop within hours of reporting it. The community aspect really works!",
          image: "https://randomuser.me/api/portraits/men/2.jpg",
          name: "Michael Chen",
          role: "Student",
        },
        {
          text: "Implementing TraceIT was seamless. The platform is intuitive and our staff needed minimal training to get started.",
          image: "https://randomuser.me/api/portraits/women/3.jpg",
          name: "Emily Rodriguez",
          role: "IT Director",
        },
        {
          text: "The photo matching feature is game-changing. I was able to identify my lost backpack from the detailed photos uploaded.",
          image: "https://randomuser.me/api/portraits/men/4.jpg",
          name: "David Kim",
          role: "Graduate Student",
        },
        {
          text: "TraceIT's notification system keeps everyone informed. We've seen a 90% increase in successful item returns.",
          image: "https://randomuser.me/api/portraits/women/5.jpg",
          name: "Lisa Anderson",
          role: "Student Affairs Coordinator",
        },
        {
          text: "The platform's analytics help us track lost item patterns and improve our campus services.",
          image: "https://randomuser.me/api/portraits/women/6.jpg",
          name: "Jennifer Martinez",
          role: "Operations Manager",
        },
        {
          text: "As a security officer, TraceIT makes my job easier. The centralized system helps us manage found items efficiently.",
          image: "https://randomuser.me/api/portraits/men/7.jpg",
          name: "Robert Taylor",
          role: "Security Officer",
        },
        {
          text: "The mobile app is fantastic. I can report lost items right from my phone and get instant notifications.",
          image: "https://randomuser.me/api/portraits/women/8.jpg",
          name: "Amanda White",
          role: "Student",
        },
        {
          text: "TraceIT has transformed how we handle lost property. The time savings alone has made it worth every penny.",
          image: "https://randomuser.me/api/portraits/men/9.jpg",
          name: "James Wilson",
          role: "Facilities Manager",
        },
      ]);
    }
  }, []);

  // Listen for storage events for real-time updates
  useEffect(() => {
    const handleStorageChange = (e: any) => {
      if (e.key === 'traceit_testimonials') {
        const storedTestimonials = JSON.parse(e.newValue || '[]');
        if (storedTestimonials.length > 0) {
          const transformedTestimonials = storedTestimonials.map((testimonial: any) => ({
            text: testimonial.review,
            image: testimonial.avatar,
            name: testimonial.name,
            role: testimonial.role,
            rating: testimonial.rating,
            featured: testimonial.featured,
          }));
          setTestimonials(transformedTestimonials);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

  return (
    <section className="bg-black my-20 relative">
      <div className="container z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg border-white/20 text-white bg-white/10 backdrop-blur-sm">Testimonials</div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-white">
            What our users say
          </h2>
          <p className="text-center mt-5 opacity-75 text-white/80">
            See how TraceIT is helping communities reunite with their belongings.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
