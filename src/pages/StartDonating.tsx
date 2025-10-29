import { useState } from "react";
import { CampaignCard } from "../components/CampaignCard";
import { DonationModal } from "../components/DonationModal";
import { Heart, Zap, TrendingUp } from "lucide-react";

interface Campaign {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  raised: number;
  goal: number;
  donors: number;
  daysLeft: number;
}

export function StartDonating() {
  const [selectedCampaign, setSelectedCampaign] = useState<{ id: string; title: string } | null>(null);

  const featuredCampaigns: Campaign[] = [
    {
      id: "1",
      title: "Education for Underprivileged Children",
      description: "Help provide quality education, books, and supplies to children in rural communities who lack access to proper schooling.",
      image: "https://images.unsplash.com/photo-1727473704473-e4fe94b45b96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFyaXR5JTIwZWR1Y2F0aW9uJTIwY2hpbGRyZW58ZW58MXx8fHwxNzYxNjgzNjQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Schools",
      raised: 3750000,
      goal: 6250000,
      donors: 892,
      daysLeft: 12,
    },
    {
      id: "2",
      title: "Children's Nutrition Program",
      description: "Provide nutritious meals to malnourished children in urban slums and rural areas.",
      image: "https://images.unsplash.com/photo-1561429743-6ed153ad7071?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwaHVuZ2VyJTIwY29tbXVuaXR5fGVufDF8fHx8MTc2MTcyNzgyMHww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Children",
      raised: 5933000,
      goal: 7083000,
      donors: 1678,
      daysLeft: 15,
    },
    {
      id: "3",
      title: "Medical Equipment for Rural Clinics",
      description: "Provide essential medical equipment and supplies to healthcare facilities serving remote communities.",
      image: "https://images.unsplash.com/photo-1512069511692-b82d787265cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGVhbHRoY2FyZXxlbnwxfHx8fDE3NjE3MjU2NTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Health Funds",
      raised: 3241000,
      goal: 4165000,
      donors: 567,
      daysLeft: 8,
    },
  ];

  const urgentCampaigns: Campaign[] = [
    {
      id: "4",
      title: "Children's Hospital Emergency Fund",
      description: "Support critical medical care for children with life-threatening conditions.",
      image: "https://images.unsplash.com/photo-1759200285182-7ab556184858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXNhc3RlciUyMHJlbGllZiUyMGVtZXJnZW5jeXxlbnwxfHx8fDE3NjE3Mjc4MjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Children",
      raised: 7858000,
      goal: 10000000,
      donors: 2103,
      daysLeft: 5,
    },
    {
      id: "5",
      title: "Clean Water Initiative",
      description: "Build wells and water purification systems in communities without access to safe drinking water.",
      image: "https://images.unsplash.com/photo-1712471010531-bad62e5b357b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHdhdGVyJTIwd2VsbHxlbnwxfHx8fDE3NjE2OTIxMzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Health Funds",
      raised: 5233000,
      goal: 8330000,
      donors: 1245,
      daysLeft: 18,
    },
  ];

  const trendingCampaigns: Campaign[] = [
    {
      id: "6",
      title: "School Infrastructure Development",
      description: "Build new classrooms and improve school facilities for children in underserved areas.",
      image: "https://images.unsplash.com/photo-1684997827975-21b5a6e434e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudCUyMGZvcmVzdHxlbnwxfHx8fDE3NjE3Mjc4MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Schools",
      raised: 2375000,
      goal: 5000000,
      donors: 423,
      daysLeft: 25,
    },
  ];

  const handleDonate = (id: string) => {
    const allCampaigns = [...featuredCampaigns, ...urgentCampaigns, ...trendingCampaigns];
    const campaign = allCampaigns.find((c) => c.id === id);
    if (campaign) {
      setSelectedCampaign({ id: campaign.id, title: campaign.title });
    }
  };

  return (
    <div className="page-transition min-h-screen bg-black pt-24 pb-20">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-60 right-1/4 w-96 h-96 bg-[#00BFFF]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-60 left-1/4 w-96 h-96 bg-[#9D4EDD]/10 rounded-full blur-[120px]"></div>
      </div>

      <section className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in">
            <h1 className="text-6xl mb-4 gradient-text">Start Donating Today</h1>
            <p className="text-xl text-[#B0B0B0] max-w-2xl mx-auto">
              Choose from our curated selection of campaigns and start making a difference right away.
            </p>
          </div>

          {/* Featured Campaigns Section */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center glow-blue"
                   style={{ background: 'linear-gradient(135deg, #00BFFF20, #00BFFF05)' }}>
                <Heart className="w-7 h-7 text-[#00BFFF]" />
              </div>
              <h2 className="text-4xl text-white">Featured Campaigns</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  {...campaign}
                  onDonate={handleDonate}
                />
              ))}
            </div>
          </div>

          {/* Urgent Campaigns Section */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                   style={{ background: 'linear-gradient(135deg, #FF555520, #FF555505)', boxShadow: '0 0 20px rgba(255, 85, 85, 0.3)' }}>
                <Zap className="w-7 h-7 text-[#FF5555]" />
              </div>
              <h2 className="text-4xl text-white">Urgent Campaigns</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {urgentCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  {...campaign}
                  onDonate={handleDonate}
                />
              ))}
            </div>
          </div>

          {/* Trending Campaigns Section */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center glow-purple"
                   style={{ background: 'linear-gradient(135deg, #9D4EDD20, #9D4EDD05)' }}>
                <TrendingUp className="w-7 h-7 text-[#9D4EDD]" />
              </div>
              <h2 className="text-4xl text-white">Trending Campaigns</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 max-w-md">
              {trendingCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  {...campaign}
                  onDonate={handleDonate}
                />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="glass neon-border rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00BFFF]/10 to-[#9D4EDD]/10"></div>
            <div className="relative z-10">
              <h2 className="text-5xl mb-4 gradient-text">Can't find what you're looking for?</h2>
              <p className="text-xl text-[#B0B0B0] mb-8">
                Browse all campaigns or start your own to raise funds for your cause
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 text-lg rounded-lg btn-gradient text-white">
                  Browse All Campaigns
                </button>
                <button className="px-8 py-4 text-lg rounded-lg border border-[#9D4EDD]/30 text-[#9D4EDD] hover:bg-[#9D4EDD]/10 transition-all duration-300">
                  Start Your Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DonationModal
        isOpen={!!selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
        campaign={selectedCampaign}
      />
    </div>
  );
}
