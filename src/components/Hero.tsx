import { ArrowRight, Users, DollarSign, Heart } from "lucide-react";
import { Counter } from "./Counter";
import { useEffect, useState } from "react";
import { campaignAPI, donorAPI } from "../utils/api";

interface HeroProps {
  onNavigate: (page: string) => void;
}

interface Stats {
  totalDonors: number;
  totalFundsRaised: number;
  activeCampaigns: number;
}

export function Hero({ onNavigate }: HeroProps) {
  const [show, setShow] = useState(false);
  const [stats, setStats] = useState<Stats>({
    totalDonors: 50000,
    totalFundsRaised: 10000000,
    activeCampaigns: 500,
  });

  useEffect(() => {
    setShow(true);
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [campaignStatsRes, donorStatsRes] = await Promise.all([
        campaignAPI.getCampaignStats(),
        donorAPI.getDonationStats(),
      ]);

      if (campaignStatsRes.success && donorStatsRes.success) {
        setStats({
          totalDonors: donorStatsRes.data?.totalDonors || 50000,
          totalFundsRaised: donorStatsRes.data?.totalAmount || 10000000,
          activeCampaigns: campaignStatsRes.data?.activeCampaigns || 500,
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
      // Keep default values on error
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20" style={{
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F9FF 30%, #E0F7FA 70%, #B2EBF2 100%)'
    }}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-[#4DD0E1]/20 to-[#00BCD4]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-[#B2EBF2]/30 to-[#80DEEA]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-16">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-[#E0F7FA] mb-10 transition-all duration-800 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="w-2.5 h-2.5 bg-gradient-to-r from-[#00BCD4] to-[#4DD0E1] rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-700">Join 50,000+ donors making a difference</span>
          </div>
          
          {/* Main Heading - Increased Size and Spacing */}
          <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-10 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent transition-all duration-1000 delay-200 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ lineHeight: '1.2' }}>
            Every Donation<br />Creates Hope
          </h1>
          
          {/* Subheading - Better Spacing */}
          <p className={`text-xl md:text-2xl text-gray-600 mb-14 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ lineHeight: '1.8' }}>
            Support meaningful causes and make a real impact. Join our community of changemakers and help build a better tomorrow.
          </p>
          
          {/* CTA Buttons - Even Spacing and Gradient Styling */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 transition-all duration-1000 delay-600 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button 
              onClick={() => onNavigate("explore")}
              className="btn-gradient flex items-center gap-3 justify-center min-w-[240px]"
            >
              Explore Campaigns
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button 
              onClick={() => onNavigate("how-it-works")}
              className="btn-gradient-outline min-w-[240px]"
            >
              How It Works
            </button>
          </div>

          {/* Stats Counter - Modern Cards with Better Spacing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {/* Active Donors Card */}
            <div className={`stats-card transition-all duration-1000 delay-800 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="stats-icon">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="stats-number">
                <Counter end={Math.floor(stats.totalDonors / 1000)} suffix="K+" />
              </div>
              <div className="stats-label">Active Donors</div>
            </div>
            
            {/* Funds Raised Card */}
            <div className={`stats-card transition-all duration-1000 delay-1000 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="stats-icon">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <div className="stats-number">
                <Counter end={Math.floor(stats.totalFundsRaised / 10000000)} suffix=" Cr" prefix="₹" />
              </div>
              <div className="stats-label">Funds Raised</div>
            </div>
            
            {/* Active Campaigns Card */}
            <div className={`stats-card transition-all duration-1000 delay-1200 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="stats-icon">
                <Heart className="w-8 h-8 text-white" fill="white" />
              </div>
              <div className="stats-number">
                <Counter end={stats.activeCampaigns} suffix="+" />
              </div>
              <div className="stats-label">Active Campaigns</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
