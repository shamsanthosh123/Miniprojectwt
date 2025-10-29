import { Hero } from "../components/Hero";
import { ArrowRight } from "lucide-react";

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="page-transition">
      <Hero onNavigate={onNavigate} />
      
      {/* Action Buttons Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00BFFF]/10 rounded-full blur-[150px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl mb-6 gradient-text">Ready to Make an Impact?</h2>
            <p className="text-xl text-[#B0B0B0] mb-10 max-w-2xl mx-auto">
              Every contribution, no matter the size, helps create positive change in our world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => onNavigate("start-donating")}
                className="px-10 py-5 text-xl rounded-lg btn-gradient text-white flex items-center gap-2 justify-center group"
                style={{
                  boxShadow: "0 10px 40px rgba(0, 191, 255, 0.3), 0 5px 20px rgba(157, 78, 221, 0.3)"
                }}
              >
                Start Donating
                <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
              </button>
              <button 
                onClick={() => onNavigate("create-campaign")}
                className="px-10 py-5 text-xl rounded-lg border-2 border-[#9D4EDD]/50 text-[#9D4EDD] hover:bg-[#9D4EDD]/10 transition-all duration-300 hover:border-[#9D4EDD] hover:glow-purple"
              >
                Create Your Campaign
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
