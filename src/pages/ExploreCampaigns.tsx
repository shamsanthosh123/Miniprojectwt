import { useState, useEffect, useRef } from "react";
import { CampaignCard } from "../components/CampaignCard";
import { DonationModal } from "../components/DonationModal";
import { CampaignCardSkeleton } from "../components/LoadingSkeleton";
import { Search, Filter, GraduationCap, HeartPulse, CloudRain, Footprints, Users, Leaf, Home, Utensils, HelpingHand, Brain } from "lucide-react";
import { campaignAPI } from "../utils/api";
import { toast } from "sonner@2.0.3";

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

interface ExploreCampaignsProps {
  onNavigate?: (page: string) => void;
}

export function ExploreCampaigns({ onNavigate }: ExploreCampaignsProps = {}) {
  const [selectedCampaign, setSelectedCampaign] = useState<{ id: string; title: string } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [revealedCards, setRevealedCards] = useState<boolean[]>([]);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Fetch campaigns from backend
  useEffect(() => {
    fetchCampaigns();
  }, [selectedCategory]);

  const fetchCampaigns = async () => {
    setIsLoading(true);
    try {
      const params: any = { status: 'active' };
      if (selectedCategory && selectedCategory !== 'all') {
        params.category = selectedCategory;
      }

      const response = await campaignAPI.getAllCampaigns(params);
      
      if (response.success && response.data) {
        // Transform backend data to match frontend format
        const transformedCampaigns = response.data.map((campaign: any) => {
          const daysLeft = Math.max(0, Math.ceil((new Date(campaign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));
          
          return {
            id: campaign._id,
            title: campaign.title,
            description: campaign.description,
            image: campaign.image || getDefaultImageForCategory(campaign.category),
            category: campaign.category,
            raised: campaign.collected || 0,
            goal: campaign.goal,
            donors: campaign.donorCount || 0,
            daysLeft: daysLeft,
          };
        });
        
        setCampaigns(transformedCampaigns);
        setRevealedCards(new Array(transformedCampaigns.length).fill(false));
      } else {
        // Fallback to mock data if backend fails
        setCampaigns(getMockCampaigns());
        setRevealedCards(new Array(getMockCampaigns().length).fill(false));
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      toast.error("Failed to load campaigns. Showing sample data.");
      // Fallback to mock data
      setCampaigns(getMockCampaigns());
      setRevealedCards(new Array(getMockCampaigns().length).fill(false));
    } finally {
      setIsLoading(false);
    }
  };

  const getDefaultImageForCategory = (category: string): string => {
    const imageMap: { [key: string]: string } = {
      schools: "https://images.unsplash.com/photo-1727473704473-e4fe94b45b96?w=1080",
      children: "https://images.unsplash.com/photo-1561429743-6ed153ad7071?w=1080",
      health: "https://images.unsplash.com/photo-1512069511692-b82d787265cf?w=1080",
      other: "https://images.unsplash.com/photo-1684997827975-21b5a6e434e9?w=1080",
    };
    return imageMap[category.toLowerCase()] || "https://images.unsplash.com/photo-1684997827975-21b5a6e434e9?w=1080";
  };

  const getMockCampaigns = (): Campaign[] => [
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

  const donationCategories = [
    { name: "Education for Children", icon: GraduationCap, color: "#00BCD4" },
    { name: "Health & Medical Aid", icon: HeartPulse, color: "#00BCD4" },
    { name: "Disaster Relief", icon: CloudRain, color: "#00BCD4" },
    { name: "Animal Welfare", icon: Footprints, color: "#00BCD4" },
    { name: "Women Empowerment", icon: Users, color: "#00BCD4" },
    { name: "Environmental Causes", icon: Leaf, color: "#00BCD4" },
    { name: "Old Age Support", icon: HelpingHand, color: "#00BCD4" },
    { name: "Food & Hunger Programs", icon: Utensils, color: "#00BCD4" },
    { name: "Shelter for Homeless", icon: Home, color: "#00BCD4" },
    { name: "Mental Health & Wellbeing", icon: Brain, color: "#00BCD4" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = categoryRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setRevealedCards((prev) => {
                const newRevealed = [...prev];
                newRevealed[index] = true;
                return newRevealed;
              });
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    categoryRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      categoryRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="page-transition min-h-screen bg-gray-50 pt-24 pb-20">
      <section className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 fade-in">
            <h1 className="text-5xl md:text-6xl mb-4 text-gray-900">Explore Campaigns</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse active campaigns and make a difference in the lives of people who need it most.
            </p>
          </div>

          {/* Emotional Donation Explanation */}
          <div className="max-w-4xl mx-auto mb-16 bg-gradient-to-br from-[#E0F7FA] to-white rounded-3xl p-10 text-center border border-gray-100 shadow-sm">
            <p className="text-2xl text-gray-900 mb-4 leading-relaxed">
              "Every donation, no matter how small, changes someone's story."
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Your kindness builds schools, feeds children, and brings hope to families in need.
              Join hands with millions who are making the world brighter — one donation at a time.
            </p>
          </div>

          {/* Donation Categories */}
          <div className="mb-16">
            <h2 className="text-4xl text-gray-900 text-center mb-10">Choose Your Cause</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {donationCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div
                    key={index}
                    ref={(el) => (categoryRefs.current[index] = el)}
                    className={`bg-white rounded-2xl p-6 text-center cursor-pointer card-simple transition-all duration-700 ${
                      revealedCards[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{
                      transitionDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="w-14 h-14 rounded-full bg-[#B2EBF2] flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-[#00838F]" />
                    </div>
                    <h3 className="text-gray-700 text-sm font-medium">{category.name}</h3>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Search and Filter */}
          <div className="max-w-5xl mx-auto mb-12 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search campaigns..."
                className="w-full pl-12 pr-4 py-3 input-simple"
              />
            </div>
            <button className="px-6 py-3 bg-white rounded-lg border-2 border-gray-200 flex items-center gap-2 text-gray-600 hover:border-gray-300 transition-colors">
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
                    ? "bg-gray-900 text-white"
                    : "bg-white border-2 border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {category === "all" ? "All Campaigns" : category}
              </button>
            ))}
          </div>

          {/* Campaign Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <CampaignCardSkeleton key={i} />
              ))}
            </div>
          ) : campaigns.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No campaigns found in this category.</p>
              <button 
                onClick={() => setSelectedCategory("all")}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-[#00BCD4] to-[#4DD0E1] text-white rounded-lg"
              >
                View All Campaigns
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterByCategory(selectedCategory).map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  {...campaign}
                  onDonate={handleDonate}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <DonationModal
        isOpen={!!selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
        campaign={selectedCampaign}
        onDonationSuccess={fetchCampaigns}
      />
    </div>
  );
}
