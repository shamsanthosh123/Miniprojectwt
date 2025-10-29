import { useState } from "react";
import { CampaignCard } from "../components/CampaignCard";
import { DonationModal } from "../components/DonationModal";
import { Search, Filter } from "lucide-react";

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

export function ExploreCampaigns() {
  const [selectedCampaign, setSelectedCampaign] = useState<{ id: string; title: string } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const campaigns: Campaign[] = [
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
      title: "Clean Water Initiative",
      description: "Build wells and water purification systems in communities without access to safe drinking water.",
      image: "https://images.unsplash.com/photo-1712471010531-bad62e5b357b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHdhdGVyJTIwd2VsbHxlbnwxfHx8fDE3NjE2OTIxMzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Health Funds",
      raised: 5233000,
      goal: 8330000,
      donors: 1245,
      daysLeft: 18,
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
    {
      id: "4",
      title: "School Infrastructure Development",
      description: "Build new classrooms and improve school facilities for children in underserved areas.",
      image: "https://images.unsplash.com/photo-1684997827975-21b5a6e434e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudCUyMGZvcmVzdHxlbnwxfHx8fDE3NjE3Mjc4MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Schools",
      raised: 2375000,
      goal: 5000000,
      donors: 423,
      daysLeft: 25,
    },
    {
      id: "5",
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
      id: "6",
      title: "Children's Hospital Emergency Fund",
      description: "Support critical medical care for children with life-threatening conditions.",
      image: "https://images.unsplash.com/photo-1759200285182-7ab556184858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXNhc3RlciUyMHJlbGllZiUyMGVtZXJnZW5jeXxlbnwxfHx8fDE3NjE3Mjc4MjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Children",
      raised: 7858000,
      goal: 10000000,
      donors: 2103,
      daysLeft: 5,
    },
  ];

  const handleDonate = (id: string) => {
    const campaign = campaigns.find((c) => c.id === id);
    if (campaign) {
      setSelectedCampaign({ id: campaign.id, title: campaign.title });
    }
  };

  const filterByCategory = (category: string) => {
    if (category === "all") return campaigns;
    return campaigns.filter((c) => c.category === category);
  };

  const categories = ["all", "Schools", "Children", "Health Funds"];

  return (
    <div className="page-transition min-h-screen bg-black pt-24 pb-20">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-[#9D4EDD]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-40 left-1/4 w-96 h-96 bg-[#00BFFF]/10 rounded-full blur-[120px]"></div>
      </div>

      <section className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 fade-in">
            <h1 className="text-6xl mb-4 gradient-text">Explore Campaigns</h1>
            <p className="text-xl text-[#B0B0B0] max-w-2xl mx-auto">
              Browse active campaigns and make a difference in the lives of people who need it most.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-5xl mx-auto mb-12 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B0B0B0]" />
              <input
                type="text"
                placeholder="Search campaigns..."
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-[#B0B0B0]/50 input-glow"
              />
            </div>
            <button className="px-6 py-3 glass neon-border rounded-lg flex items-center gap-2 text-[#B0B0B0] hover:text-white transition-colors">
              <Filter className="w-5 h-5" />
              <span>Filter</span>
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-lg transition-all duration-300 ${
                  selectedCategory === category
                    ? "btn-gradient text-white"
                    : "glass border border-white/10 text-[#B0B0B0] hover:text-white hover:border-white/30"
                }`}
              >
                {category === "all" ? "All Campaigns" : category}
              </button>
            ))}
          </div>

          {/* Campaign Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterByCategory(selectedCategory).map((campaign) => (
              <CampaignCard
                key={campaign.id}
                {...campaign}
                onDonate={handleDonate}
              />
            ))}
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
