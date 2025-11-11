import { useState, useEffect, useRef } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Upload, FileText, Target, Calendar, Image as ImageIcon, Sparkles, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { campaignAPI } from "../utils/api";
import { toast } from "sonner@2.0.3";

interface CreateCampaignProps {
  onNavigate?: (page: string) => void;
}

export function CreateCampaign({ onNavigate }: CreateCampaignProps = {}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [goal, setGoal] = useState("");
  const [duration, setDuration] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [creatorEmail, setCreatorEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [revealedStories, setRevealedStories] = useState<boolean[]>(new Array(3).fill(false));
  const storyRefs = useRef<(HTMLDivElement | null)[]>([]);

  const successStories = [
    {
      title: "Clean Water for Kenya",
      description: "Provided clean drinking water to 10,000+ families",
      image: "https://images.unsplash.com/photo-1712471010531-bad62e5b357b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHdhdGVyJTIwd2VsbHxlbnwxfHx8fDE3NjE2OTIxMzN8MA&ixlib=rb-4.1.0&q=80&w=400",
      raised: "₹2.5 Cr",
    },
    {
      title: "Books for Every Child",
      description: "Distributed 50,000 books across rural schools",
      image: "https://images.unsplash.com/photo-1727473704473-e4fe94b45b96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFyaXR5JTIwZWR1Y2F0aW9uJTIwY2hpbGRyZW58ZW58MXx8fHwxNzYxNjgzNjQyfDA&ixlib=rb-4.1.0&q=80&w=400",
      raised: "₹1.8 Cr",
    },
    {
      title: "Hospital Fund for Rural India",
      description: "Built 5 new healthcare centers in remote areas",
      image: "https://images.unsplash.com/photo-1512069511692-b82d787265cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGVhbHRoY2FyZXxlbnwxfHx8fDE3NjE3MjU2NTB8MA&ixlib=rb-4.1.0&q=80&w=400",
      raised: "₹3.2 Cr",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = storyRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setRevealedStories((prev) => {
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

    storyRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      storyRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!title.trim()) {
      toast.error("Please enter a campaign title");
      return;
    }
    if (!category) {
      toast.error("Please select a category");
      return;
    }
    if (!description.trim()) {
      toast.error("Please enter a campaign description");
      return;
    }
    if (!goal || parseFloat(goal) <= 0) {
      toast.error("Please enter a valid funding goal");
      return;
    }
    if (!duration || parseInt(duration) <= 0) {
      toast.error("Please enter a valid campaign duration");
      return;
    }
    if (!creatorName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!creatorEmail.trim() || !creatorEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await campaignAPI.createCampaign({
        title: title.trim(),
        description: description.trim(),
        category,
        goal: parseFloat(goal),
        duration: parseInt(duration),
        creatorName: creatorName.trim(),
        creatorEmail: creatorEmail.trim(),
      });

      if (response.success) {
        toast.success("Campaign created successfully! It will be reviewed by our team within 24-48 hours.");
        
        // Reset form
        setTitle("");
        setDescription("");
        setCategory("");
        setGoal("");
        setDuration("");
        setCreatorName("");
        setCreatorEmail("");
        
        // Navigate to explore page after a short delay
        setTimeout(() => {
          if (onNavigate) {
            onNavigate("explore");
          }
        }, 2000);
      } else {
        toast.error(response.message || "Failed to create campaign");
      }
    } catch (error: any) {
      console.error("Campaign creation error:", error);
      toast.error(error.message || "Failed to create campaign. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-transition min-h-screen pt-24 pb-20" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F9FF 100%)' }}>
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#4DD0E1]/10 rounded-full blur-[150px]"></div>
      </div>

      <section className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 fade-in">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-[#E0F7FA] mb-8">
                <Sparkles className="w-5 h-5 text-[#00BCD4]" />
                <span className="text-base text-gray-700 font-medium">Start your journey to make a difference</span>
              </div>
              <h1 className="text-6xl mb-6 text-gray-900" style={{ lineHeight: '1.2' }}>Create Your Campaign</h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Fill in the details below to create your campaign and start raising funds.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Campaign Title */}
                <div className="space-y-3">
                  <Label htmlFor="title" className="flex items-center gap-2 text-gray-900 text-base font-medium">
                    <FileText className="w-5 h-5 text-[#00BCD4]" />
                    Campaign Title
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Give your campaign a compelling title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="input-simple h-14 text-base"
                  />
                </div>

                {/* Category */}
                <div className="space-y-3">
                  <Label htmlFor="category" className="text-gray-900 text-base font-medium block">
                    Category
                  </Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger id="category" className="input-simple h-14 text-base">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="schools" className="text-gray-900 hover:bg-gray-100">Schools</SelectItem>
                      <SelectItem value="children" className="text-gray-900 hover:bg-gray-100">Children</SelectItem>
                      <SelectItem value="health" className="text-gray-900 hover:bg-gray-100">Health Funds</SelectItem>
                      <SelectItem value="other" className="text-gray-900 hover:bg-gray-100">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <Label htmlFor="description" className="text-gray-900 text-base font-medium block">
                    Campaign Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Tell your story. Why is this cause important? How will the funds be used?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={8}
                    required
                    className="input-simple text-base resize-none"
                  />
                </div>

                {/* Funding Goal */}
                <div className="space-y-3">
                  <Label htmlFor="goal" className="flex items-center gap-2 text-gray-900 text-base font-medium">
                    <Target className="w-5 h-5 text-[#00BCD4]" />
                    Funding Goal (₹)
                  </Label>
                  <Input
                    id="goal"
                    type="number"
                    placeholder="50000"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    required
                    className="input-simple h-14 text-base"
                  />
                </div>

                {/* Campaign Duration */}
                <div className="space-y-3">
                  <Label htmlFor="duration" className="flex items-center gap-2 text-gray-900 text-base font-medium">
                    <Calendar className="w-5 h-5 text-[#00BCD4]" />
                    Campaign Duration (days)
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="30"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                    className="input-simple h-14 text-base"
                  />
                </div>

                {/* Creator Name */}
                <div className="space-y-3">
                  <Label htmlFor="creatorName" className="text-gray-900 text-base font-medium block">
                    Your Name *
                  </Label>
                  <Input
                    id="creatorName"
                    type="text"
                    placeholder="John Doe"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    required
                    className="input-simple h-14 text-base"
                  />
                </div>

                {/* Creator Email */}
                <div className="space-y-3">
                  <Label htmlFor="creatorEmail" className="text-gray-900 text-base font-medium block">
                    Your Email *
                  </Label>
                  <Input
                    id="creatorEmail"
                    type="email"
                    placeholder="john@example.com"
                    value={creatorEmail}
                    onChange={(e) => setCreatorEmail(e.target.value)}
                    required
                    className="input-simple h-14 text-base"
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-gray-900 text-base font-medium">
                    <ImageIcon className="w-5 h-5 text-[#00BCD4]" />
                    Campaign Image
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center hover:border-[#00BCD4] transition-all duration-300 cursor-pointer group bg-gray-50 hover:bg-white">
                    <Upload className="w-14 h-14 text-gray-400 mx-auto mb-4 group-hover:text-[#00BCD4] transition-colors" />
                    <p className="text-gray-600 mb-2 group-hover:text-gray-900 transition-colors font-medium">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                </div>

                {/* Supporting Documents */}
                <div className="space-y-3">
                  <Label className="text-gray-900 text-base font-medium block">
                    Supporting Documents (Optional)
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#00BCD4] transition-all duration-300 cursor-pointer group bg-gray-50 hover:bg-white">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3 group-hover:text-[#00BCD4] transition-colors" />
                    <p className="text-gray-600 mb-1 group-hover:text-gray-900 transition-colors font-medium">Upload supporting documents</p>
                    <p className="text-sm text-gray-500">PDFs, reports, certificates</p>
                  </div>
                </div>

                {/* Terms */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <p className="text-base text-gray-700 leading-relaxed">
                    By creating this campaign, you agree to our{" "}
                    <a href="#" className="text-[#00BCD4] hover:text-[#00838F] transition-colors font-semibold">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[#00BCD4] hover:text-[#00838F] transition-colors font-semibold">
                      Campaign Guidelines
                    </a>
                    . All campaigns are subject to review before going live.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full btn-gradient h-14 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Campaign..." : "Create Campaign"}
                </button>
              </form>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="w-16 h-16 rounded-2xl icon-bg-teal flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3 text-gray-900 text-xl font-semibold">No Platform Fees</h3>
                <p className="text-base text-gray-600 leading-relaxed">We don't charge any platform fees for creating campaigns</p>
              </div>
              <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="w-16 h-16 rounded-2xl icon-bg-teal flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3 text-gray-900 text-xl font-semibold">Quick Approval</h3>
                <p className="text-base text-gray-600 leading-relaxed">Most campaigns are reviewed within 24-48 hours</p>
              </div>
              <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="w-16 h-16 rounded-2xl icon-bg-teal flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3 text-gray-900 text-xl font-semibold">Easy Updates</h3>
                <p className="text-base text-gray-600 leading-relaxed">Update your supporters with progress reports anytime</p>
              </div>
            </div>

            {/* Global Success Stories */}
            <div className="mt-24">
              <div className="flex items-center gap-5 mb-12 justify-center">
                <div className="w-16 h-16 rounded-2xl icon-bg-teal flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-5xl text-gray-900">Global Success Stories</h2>
              </div>
              <p className="text-center text-gray-600 text-xl mb-16 max-w-3xl mx-auto leading-relaxed">
                Be inspired by campaigns that have changed lives and communities around the world
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {successStories.map((story, index) => (
                  <div
                    key={index}
                    ref={(el) => (storyRefs.current[index] = el)}
                    className={`bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-700 ${
                      revealedStories[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{
                      transitionDelay: `${index * 150}ms`,
                    }}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <ImageWithFallback
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00BCD4]/90 text-white border border-white/20 shadow-lg">
                          <TrendingUp className="w-4 h-4" />
                          <span className="font-medium">Success</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-7">
                      <h3 className="text-gray-900 text-xl font-semibold mb-3">{story.title}</h3>
                      <p className="text-base text-gray-600 mb-5 leading-relaxed">{story.description}</p>
                      <div className="flex items-center justify-between pt-5 border-t border-gray-200">
                        <span className="text-gray-600 font-medium">Total Raised</span>
                        <span className="text-[#00BCD4] text-xl font-bold">{story.raised}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
