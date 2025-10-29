import { Button } from "./ui/button";
import { ArrowRight, Users, Target, Heart } from "lucide-react";

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-6 shadow-sm">
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-600">Join 50,000+ donors making a difference</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Every Donation Creates Hope
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Support meaningful causes and make a real impact. Join our community of changemakers and help build a better tomorrow.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="lg" className="text-lg px-8" onClick={() => onNavigate("explore")}>
              Explore Campaigns
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => onNavigate("how-it-works")}>
              How It Works
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
              <div className="text-3xl mb-2">50K+</div>
              <div className="text-gray-600">Active Donors</div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-cyan-600" />
              </div>
              <div className="text-3xl mb-2">₹10Cr</div>
              <div className="text-gray-600">Funds Raised</div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="text-3xl mb-2">500+</div>
              <div className="text-gray-600">Active Campaigns</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
