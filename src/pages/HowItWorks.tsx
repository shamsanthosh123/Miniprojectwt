import { Search, Heart, TrendingUp, Shield, Users, CheckCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface HowItWorksProps {
  onNavigate?: (page: string) => void;
}

export function HowItWorks({ onNavigate }: HowItWorksProps = {}) {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = stepsRef.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSteps(prev => [...new Set([...prev, index])]);
          }
        },
        { threshold: 0.2 }
      );

      if (ref) observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const steps = [
    {
      icon: Search,
      title: "Choose a Campaign",
      description: "Browse verified campaigns across various causes and categories that matter to you.",
      color: "#00BFFF",
      glow: "glow-blue"
    },
    {
      icon: Heart,
      title: "Donate Securely",
      description: "Select a campaign that resonates with your values and make your contribution safely.",
      color: "#9D4EDD",
      glow: "glow-purple"
    },
    {
      icon: TrendingUp,
      title: "Track Your Impact",
      description: "Receive updates on how your donation is making a real difference in people's lives.",
      color: "#00FF9D",
      glow: "glow-green"
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "100% Secure",
      description: "Your donations are protected with bank-grade security and encryption.",
      color: "#00BFFF"
    },
    {
      icon: Users,
      title: "Verified Campaigns",
      description: "All campaigns are thoroughly verified before being listed on our platform.",
      color: "#9D4EDD"
    },
    {
      icon: CheckCircle,
      title: "Real-time Updates",
      description: "Track your donations and see the impact in real-time with regular updates.",
      color: "#00FF9D"
    },
  ];

  return (
    <div className="page-transition min-h-screen bg-black pt-24 pb-20">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 left-1/3 w-96 h-96 bg-[#00BFFF]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-40 right-1/3 w-96 h-96 bg-[#9D4EDD]/10 rounded-full blur-[120px]"></div>
      </div>

      <section className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in">
            <h1 className="text-6xl mb-4 gradient-text">How It Works</h1>
            <p className="text-xl text-[#B0B0B0] max-w-2xl mx-auto">
              Making a difference is simple. Follow these easy steps to start your journey of giving.
            </p>
          </div>

          {/* Steps */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  ref={el => stepsRef.current[index] = el}
                  className={`relative transition-all duration-800 ${
                    visibleSteps.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="glass neon-border rounded-2xl p-8 card-hover h-full">
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 ${step.glow}`}
                         style={{ background: `linear-gradient(135deg, ${step.color}20, ${step.color}05)` }}>
                      <step.icon className="w-10 h-10" style={{ color: step.color }} />
                    </div>
                    <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center text-white"
                         style={{ background: `linear-gradient(135deg, #00BFFF, #9D4EDD)`, boxShadow: `0 0 20px ${step.color}40` }}>
                      {index + 1}
                    </div>
                    <h3 className="text-2xl mb-3 text-center text-white">{step.title}</h3>
                    <p className="text-[#B0B0B0] text-center">{step.description}</p>
                  </div>
                  
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-white/20 to-transparent"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Section */}
          <div className="glass neon-border rounded-3xl p-12 mb-16">
            <h2 className="text-5xl text-center mb-12 gradient-text">Why Choose GiveHope?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:scale-110"
                       style={{ background: `linear-gradient(135deg, ${feature.color}, ${feature.color}80)`, boxShadow: `0 0 30px ${feature.color}40` }}>
                    <feature.icon className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl mb-3 text-white">{feature.title}</h3>
                  <p className="text-[#B0B0B0]">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="glass neon-border rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00BFFF]/10 to-[#9D4EDD]/10"></div>
            <div className="relative z-10">
              <h2 className="text-5xl mb-4 gradient-text">Ready to Get Started?</h2>
              <p className="text-xl text-[#B0B0B0] mb-8">
                Join thousands of donors who are already making a difference
              </p>
              <button 
                onClick={() => onNavigate?.("start-donating")}
                className="px-10 py-4 text-lg rounded-lg btn-gradient text-white"
              >
                Start Donating Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
