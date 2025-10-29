import { useState } from "react";
import { CampaignCard } from "../components/CampaignCard";
import { DonationModal } from "../components/DonationModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

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

  const campaigns: Campaign[] = [
    {
      id: "1",
      title: "Education for Underprivileged Children",
      description: "Help provide quality education, books, and supplies to children in rural communities who lack access to proper schooling.",
      image: "https://images.unsplash.com/photo-1727473704473-e4fe94b45b96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFyaXR5JTIwZWR1Y2F0aW9uJTIwY2hpbGRyZW58ZW58MXx8fHwxNzYxNjgzNjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Education",
      raised: 3750000,
      goal: 6250000,
      donors: 892,
      daysLeft: 12,
    },
    {
      id: "2",
      title: "Clean Water Initiative",
      description: "Build wells and water purification systems in communities without access to safe drinking water.",
      image: "https://images.unsplash.com/photo-1712471010531-bad62e5b357b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHdhdGVyJTIwd2VsbHxlbnwxfHx8fDE3NjE2OTIxMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Water",
      raised: 5233000,
      goal: 8330000,
      donors: 1245,
      daysLeft: 18,
    },
    {
      id: "3",
      title: "Medical Equipment for Rural Clinics",
      description: "Provide essential medical equipment and supplies to healthcare facilities serving remote communities.",
      image: "https://images.unsplash.com/photo-1512069511692-b82d787265cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGVhbHRoY2FyZXxlbnwxfHx8fDE3NjE3MjU2NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Healthcare",
      raised: 3241000,
      goal: 4165000,
      donors: 567,
      daysLeft: 8,
    },
    {
      id: "4",
      title: "Reforestation Project",
      description: "Plant 100,000 trees to combat deforestation and restore natural habitats for endangered species.",
      image: "https://images.unsplash.com/photo-1684997827975-21b5a6e434e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudCUyMGZvcmVzdHxlbnwxfHx8fDE3NjE3Mjc4MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Environment",
      raised: 2375000,
      goal: 5000000,
      donors: 423,
      daysLeft: 25,
    },
    {
      id: "5",
      title: "Community Food Bank Expansion",
      description: "Expand our food bank services to reach more families struggling with food insecurity in urban areas.",
      image: "https://images.unsplash.com/photo-1561429743-6ed153ad7071?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwaHVuZ2VyJTIwY29tbXVuaXR5fGVufDF8fHx8MTc2MTcyNzgyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Hunger Relief",
      raised: 5933000,
      goal: 7083000,
      donors: 1678,
      daysLeft: 15,
    },
    {
      id: "6",
      title: "Emergency Disaster Relief Fund",
      description: "Provide immediate assistance to communities affected by natural disasters with shelter, food, and medical care.",
      image: "https://images.unsplash.com/photo-1759200285182-7ab556184858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXNhc3RlciUyMHJlbGllZiUyMGVtZXJnZW5jeXxlbnwxfHx8fDE3NjE3Mjc4MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Emergency",
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

  return (
    <div className="page-transition min-h-screen bg-gradient-to-br from-emerald-50/30 via-teal-50/30 to-cyan-50/30">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl mb-4">Explore Campaigns</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse active campaigns and make a difference in the lives of people who need it most.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Education">Education</TabsTrigger>
              <TabsTrigger value="Healthcare">Health</TabsTrigger>
              <TabsTrigger value="Environment">Environment</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                  <CampaignCard
                    key={campaign.id}
                    {...campaign}
                    onDonate={handleDonate}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="Education" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterByCategory("Education").map((campaign) => (
                  <CampaignCard
                    key={campaign.id}
                    {...campaign}
                    onDonate={handleDonate}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="Healthcare" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterByCategory("Healthcare").map((campaign) => (
                  <CampaignCard
                    key={campaign.id}
                    {...campaign}
                    onDonate={handleDonate}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="Environment" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterByCategory("Environment").map((campaign) => (
                  <CampaignCard
                    key={campaign.id}
                    {...campaign}
                    onDonate={handleDonate}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
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
