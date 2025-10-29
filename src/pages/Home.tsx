import { Hero } from "../components/Hero";
import { ArrowRight } from "lucide-react";

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="page-transition">
      <Hero onNavigate={onNavigate} />
      
      {/* Action Section - Increased Spacing and Modern Design */}
      <section className="py-24 bg-white">
        <div className="w-full px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center w-full">
            {/* Heading with Better Spacing */}
            <h2 className="text-5xl md:text-6xl mb-8 text-gray-900" style={{ lineHeight: '1.3' }}>
              Ready to Make an Impact?
            </h2>
            
            {/* Description with Better Line Height */}
            <p className="text-xl md:text-2xl text-gray-600 mb-14 leading-relaxed max-w-3xl mx-auto">
              Every contribution, no matter the size, helps create positive change in our world. Start your journey today.
            </p>
            
            {/* Buttons with Even Spacing */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => onNavigate("start-donating")}
                className="btn-gradient flex items-center gap-3 justify-center min-w-[260px]"
              >
                Start Donating
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button 
                onClick={() => onNavigate("create-campaign")}
                className="btn-gradient-outline min-w-[260px]"
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
