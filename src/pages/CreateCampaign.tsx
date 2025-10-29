import { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Upload, FileText, Target, Calendar, Image as ImageIcon, Sparkles } from "lucide-react";

export function CreateCampaign() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [goal, setGoal] = useState("");
  const [duration, setDuration] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Campaign created successfully! It will be reviewed by our team.");
    }, 2000);
  };

  return (
    <div className="page-transition min-h-screen bg-black pt-24 pb-20">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#00BFFF]/10 rounded-full blur-[150px]"></div>
      </div>

      <section className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6">
                <Sparkles className="w-4 h-4 text-[#00FF9D]" />
                <span className="text-sm text-[#B0B0B0]">Start your journey to make a difference</span>
              </div>
              <h1 className="text-6xl mb-4 gradient-text">Create Your Campaign</h1>
              <p className="text-xl text-[#B0B0B0]">
                Fill in the details below to create your campaign and start raising funds.
              </p>
            </div>

            <div className="glass neon-border rounded-3xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campaign Title */}
                <div>
                  <Label htmlFor="title" className="flex items-center gap-2 mb-3 text-white">
                    <FileText className="w-4 h-4 text-[#00BFFF]" />
                    Campaign Title
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Give your campaign a compelling title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-[#B0B0B0]/50 input-glow"
                  />
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category" className="mb-3 block text-white">
                    Category
                  </Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger id="category" className="bg-white/5 border-white/10 text-white input-glow">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121212] border-white/10">
                      <SelectItem value="schools" className="text-white hover:bg-white/10">Schools</SelectItem>
                      <SelectItem value="children" className="text-white hover:bg-white/10">Children</SelectItem>
                      <SelectItem value="health" className="text-white hover:bg-white/10">Health Funds</SelectItem>
                      <SelectItem value="other" className="text-white hover:bg-white/10">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description" className="mb-3 block text-white">
                    Campaign Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Tell your story. Why is this cause important? How will the funds be used?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-[#B0B0B0]/50 input-glow"
                  />
                </div>

                {/* Funding Goal */}
                <div>
                  <Label htmlFor="goal" className="flex items-center gap-2 mb-3 text-white">
                    <Target className="w-4 h-4 text-[#9D4EDD]" />
                    Funding Goal (₹)
                  </Label>
                  <Input
                    id="goal"
                    type="number"
                    placeholder="50000"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-[#B0B0B0]/50 input-glow"
                  />
                </div>

                {/* Campaign Duration */}
                <div>
                  <Label htmlFor="duration" className="flex items-center gap-2 mb-3 text-white">
                    <Calendar className="w-4 h-4 text-[#00FF9D]" />
                    Campaign Duration (days)
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="30"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-[#B0B0B0]/50 input-glow"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <Label className="flex items-center gap-2 mb-3 text-white">
                    <ImageIcon className="w-4 h-4 text-[#00BFFF]" />
                    Campaign Image
                  </Label>
                  <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-[#00BFFF]/50 transition-all duration-300 cursor-pointer group">
                    <Upload className="w-12 h-12 text-[#B0B0B0] mx-auto mb-4 group-hover:text-[#00BFFF] transition-colors" />
                    <p className="text-[#B0B0B0] mb-2 group-hover:text-white transition-colors">Click to upload or drag and drop</p>
                    <p className="text-sm text-[#B0B0B0]/70">PNG, JPG up to 10MB</p>
                  </div>
                </div>

                {/* Supporting Documents */}
                <div>
                  <Label className="mb-3 block text-white">
                    Supporting Documents (Optional)
                  </Label>
                  <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-[#9D4EDD]/50 transition-all duration-300 cursor-pointer group">
                    <FileText className="w-10 h-10 text-[#B0B0B0] mx-auto mb-3 group-hover:text-[#9D4EDD] transition-colors" />
                    <p className="text-[#B0B0B0] text-sm mb-1 group-hover:text-white transition-colors">Upload supporting documents</p>
                    <p className="text-xs text-[#B0B0B0]/70">PDFs, reports, certificates</p>
                  </div>
                </div>

                {/* Terms */}
                <div className="glass rounded-xl p-4 border border-white/10">
                  <p className="text-sm text-[#B0B0B0]">
                    By creating this campaign, you agree to our{" "}
                    <a href="#" className="text-[#00BFFF] hover:text-[#00BFFF]/80 transition-colors">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[#00BFFF] hover:text-[#00BFFF]/80 transition-colors">
                      Campaign Guidelines
                    </a>
                    . All campaigns are subject to review before going live.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 text-lg rounded-lg btn-gradient text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Campaign..." : "Create Campaign"}
                </button>
              </form>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="glass neon-border rounded-xl p-6 text-center card-hover">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 glow-blue"
                     style={{ background: 'linear-gradient(135deg, #00BFFF20, #00BFFF05)' }}>
                  <Target className="w-6 h-6 text-[#00BFFF]" />
                </div>
                <h3 className="mb-2 text-white">No Platform Fees</h3>
                <p className="text-sm text-[#B0B0B0]">We don't charge any platform fees for creating campaigns</p>
              </div>
              <div className="glass neon-border rounded-xl p-6 text-center card-hover">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 glow-purple"
                     style={{ background: 'linear-gradient(135deg, #9D4EDD20, #9D4EDD05)' }}>
                  <FileText className="w-6 h-6 text-[#9D4EDD]" />
                </div>
                <h3 className="mb-2 text-white">Quick Approval</h3>
                <p className="text-sm text-[#B0B0B0]">Most campaigns are reviewed within 24-48 hours</p>
              </div>
              <div className="glass neon-border rounded-xl p-6 text-center card-hover">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 glow-green"
                     style={{ background: 'linear-gradient(135deg, #00FF9D20, #00FF9D05)' }}>
                  <Upload className="w-6 h-6 text-[#00FF9D]" />
                </div>
                <h3 className="mb-2 text-white">Easy Updates</h3>
                <p className="text-sm text-[#B0B0B0]">Update your supporters with progress reports anytime</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
