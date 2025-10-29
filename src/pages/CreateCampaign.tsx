import { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Upload, FileText, Target, Calendar, Image as ImageIcon } from "lucide-react";

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
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Campaign created successfully! It will be reviewed by our team.");
    }, 2000);
  };

  return (
    <div className="page-transition min-h-screen bg-gradient-to-br from-emerald-50/30 via-teal-50/30 to-cyan-50/30">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl mb-4">Create Your Campaign</h1>
              <p className="text-xl text-gray-600">
                Start your journey to make a difference. Fill in the details below to create your campaign.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campaign Title */}
                <div>
                  <Label htmlFor="title" className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-teal-600" />
                    Campaign Title
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Give your campaign a compelling title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category" className="mb-2 block">
                    Category
                  </Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="environment">Environment</SelectItem>
                      <SelectItem value="water">Water & Sanitation</SelectItem>
                      <SelectItem value="hunger">Hunger Relief</SelectItem>
                      <SelectItem value="emergency">Emergency Relief</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description" className="mb-2 block">
                    Campaign Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Tell your story. Why is this cause important? How will the funds be used?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    required
                  />
                </div>

                {/* Funding Goal */}
                <div>
                  <Label htmlFor="goal" className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-teal-600" />
                    Funding Goal (₹)
                  </Label>
                  <Input
                    id="goal"
                    type="number"
                    placeholder="50000"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    required
                  />
                </div>

                {/* Campaign Duration */}
                <div>
                  <Label htmlFor="duration" className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-teal-600" />
                    Campaign Duration (days)
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="30"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <ImageIcon className="w-4 h-4 text-teal-600" />
                    Campaign Image
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal-500 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                </div>

                {/* Supporting Documents */}
                <div>
                  <Label className="mb-2 block">
                    Supporting Documents (Optional)
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors cursor-pointer">
                    <FileText className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 text-sm mb-1">Upload supporting documents</p>
                    <p className="text-xs text-gray-500">PDFs, reports, certificates</p>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    By creating this campaign, you agree to our{" "}
                    <a href="#" className="text-teal-600 hover:text-teal-700">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-teal-600 hover:text-teal-700">
                      Campaign Guidelines
                    </a>
                    . All campaigns are subject to review before going live.
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Campaign..." : "Create Campaign"}
                </Button>
              </form>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="mb-2">No Platform Fees</h3>
                <p className="text-sm text-gray-600">We don't charge any platform fees for creating campaigns</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-cyan-600" />
                </div>
                <h3 className="mb-2">Quick Approval</h3>
                <p className="text-sm text-gray-600">Most campaigns are reviewed within 24-48 hours</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="mb-2">Easy Updates</h3>
                <p className="text-sm text-gray-600">Update your supporters with progress reports anytime</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
