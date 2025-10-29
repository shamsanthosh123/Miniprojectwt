import { ArrowRight, Users, Target, Heart } from "lucide-react";
import { Counter } from "./Counter";
import { useEffect, useState } from "react";

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00BFFF]/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9D4EDD]/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00FF9D]/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8 transition-all duration-800 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="w-2 h-2 bg-[#00FF9D] rounded-full animate-pulse"></span>
            <span className="text-sm text-[#B0B0B0]">Join 50,000+ donors making a difference</span>
          </div>
          
          {/* Main Heading */}
          <h1 
            className={`text-6xl md:text-7xl lg:text-8xl mb-6 transition-all duration-1000 delay-200 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ lineHeight: "1.1" }}
          >
            <span className="block mb-3">Make a Change.</span>
            <span className="block gradient-text">Start Donating Today.</span>
          </h1>
          
          {/* Subheading */}
          <p 
            className={`text-xl md:text-2xl text-[#B0B0B0] mb-12 max-w-3xl mx-auto transition-all duration-1000 delay-400 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Together we can build a better future for schools, children, and health.
          </p>
          
          {/* CTA Button */}
          <div 
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 transition-all duration-1000 delay-600 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <button 
              onClick={() => onNavigate("start-donating")}
              className="px-10 py-5 text-xl rounded-lg btn-gradient text-white flex items-center gap-2 group shadow-2xl"
              style={{
                boxShadow: "0 10px 40px rgba(0, 191, 255, 0.3), 0 5px 20px rgba(157, 78, 221, 0.3)"
              }}
            >
              Start Donating
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Stats Counter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div 
              className={`glass neon-border rounded-2xl p-8 card-hover transition-all duration-1000 delay-800 ${
                showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#00BFFF]/20 to-[#00BFFF]/5 rounded-xl flex items-center justify-center mx-auto mb-4 glow-blue">
                <Users className="w-8 h-8 text-[#00BFFF]" />
              </div>
              <Counter end={50} suffix="K+" />
              <div className="text-[#B0B0B0] mt-2">Active Donors</div>
            </div>
            
            <div 
              className={`glass neon-border rounded-2xl p-8 card-hover transition-all duration-1000 delay-1000 ${
                showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#9D4EDD]/20 to-[#9D4EDD]/5 rounded-xl flex items-center justify-center mx-auto mb-4 glow-purple">
                <Target className="w-8 h-8 text-[#9D4EDD]" />
              </div>
              <Counter end={10} suffix=" Crore" prefix="₹" />
              <div className="text-[#B0B0B0] mt-2">Funds Raised</div>
            </div>
            
            <div 
              className={`glass neon-border rounded-2xl p-8 card-hover transition-all duration-1000 delay-1200 ${
                showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#00FF9D]/20 to-[#00FF9D]/5 rounded-xl flex items-center justify-center mx-auto mb-4 glow-green">
                <Heart className="w-8 h-8 text-[#00FF9D]" />
              </div>
              <Counter end={500} suffix="+" />
              <div className="text-[#B0B0B0] mt-2">Active Campaigns</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-gradient-to-b from-[#00BFFF] to-transparent rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
