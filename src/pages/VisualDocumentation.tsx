import { useState } from "react";
import { Home, Compass, HelpCircle, Heart, FileText, DollarSign, Shield } from "lucide-react";

interface VisualDocumentationProps {
  onNavigate?: (page: string) => void;
}

export function VisualDocumentation({ onNavigate }: VisualDocumentationProps = {}) {
  const [selectedPage, setSelectedPage] = useState<string>("home");

  const pages = [
    { id: "home", name: "Home Page", icon: Home, route: "home" },
    { id: "explore", name: "Explore Campaigns", icon: Compass, route: "explore" },
    { id: "how-it-works", name: "How It Works", icon: HelpCircle, route: "how-it-works" },
    { id: "start-donating", name: "Start Donating", icon: DollarSign, route: "start-donating" },
    { id: "create-campaign", name: "Create Campaign", icon: Heart, route: "create-campaign" },
    { id: "faq", name: "FAQ Page", icon: FileText, route: "faq" },
    { id: "privacy", name: "Privacy Policy", icon: Shield, route: "privacy" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-cyan-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white shadow-lg border border-blue-100 mb-6">
            <FileText className="w-5 h-5 text-[#00BCD4]" />
            <span className="text-base text-gray-700 font-medium">Visual Page Documentation</span>
          </div>
          <h1 className="text-6xl mb-6 text-gray-900">GiveHope Platform Pages</h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Visual overview of all pages in the GiveHope donation platform
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {pages.map((page) => {
            const Icon = page.icon;
            return (
              <button
                key={page.id}
                onClick={() => setSelectedPage(page.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  selectedPage === page.id
                    ? "bg-gradient-to-r from-[#00BCD4] to-[#4DD0E1] text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <Icon className="w-5 h-5" />
                {page.name}
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-12 justify-center">
          <button
            onClick={() => {
              const page = pages.find(p => p.id === selectedPage);
              if (page && onNavigate) onNavigate(page.route);
            }}
            className="px-8 py-3 bg-gradient-to-r from-[#00BCD4] to-[#4DD0E1] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
          >
            View Live Page
          </button>
        </div>

        {/* Visual Preview */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          {selectedPage === "home" && <HomePageVisual />}
          {selectedPage === "explore" && <ExplorePageVisual />}
          {selectedPage === "how-it-works" && <HowItWorksVisual />}
          {selectedPage === "start-donating" && <StartDonatingVisual />}
          {selectedPage === "create-campaign" && <CreateCampaignVisual />}
          {selectedPage === "faq" && <FAQPageVisual />}
          {selectedPage === "privacy" && <PrivacyPageVisual />}
        </div>

      </div>
    </div>
  );
}

// Home Page Visual
function HomePageVisual() {
  return (
    <div className="p-8 space-y-8">
      <PageTitle title="Home Page" description="Landing page with hero section and stats" />
      
      {/* Header Preview */}
      <Section title="Header Navigation">
        <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00BCD4] to-[#4DD0E1] flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" fill="white" />
                </div>
                <span className="font-semibold text-gray-900 text-lg">GiveHope</span>
              </div>
              <div className="flex gap-6 text-sm text-gray-600">
                <span>Explore Campaigns</span>
                <span>How It Works</span>
                <span>Start Donating</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="px-4 py-2 border border-gray-300 rounded-lg text-sm">Login</div>
              <div className="px-4 py-2 bg-gradient-to-r from-[#00BCD4] to-[#4DD0E1] text-white rounded-lg text-sm">Sign Up</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Hero Section */}
      <Section title="Hero Section">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-12 text-center">
          <div className="inline-block px-4 py-2 bg-white rounded-full text-sm text-gray-700 mb-6 border border-blue-100">
            ✨ Join 50,000+ donors making a difference
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Every Donation<br />Creates Hope
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Support meaningful causes and make a real difference in communities around the world
          </p>
          <div className="flex gap-4 justify-center mb-12">
            <div className="px-6 py-3 bg-gradient-to-r from-[#00BCD4] to-[#4DD0E1] text-white rounded-xl">
              Explore Campaigns
            </div>
            <div className="px-6 py-3 bg-white border border-gray-300 rounded-xl">
              How It Works
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            <StatCard icon="👥" value="50,000+" label="Active Donors" />
            <StatCard icon="💰" value="₹10 Crore+" label="Funds Raised" />
            <StatCard icon="❤️" value="500+" label="Active Campaigns" />
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section title="Call to Action">
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Make an Impact?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Every contribution, no matter the size, helps create positive change
          </p>
          <div className="flex gap-4 justify-center">
            <div className="px-8 py-4 bg-gradient-to-r from-[#00BCD4] to-[#4DD0E1] text-white rounded-xl">
              Start Donating
            </div>
            <div className="px-8 py-4 bg-white border-2 border-[#00BCD4] text-[#00BCD4] rounded-xl">
              Create Your Campaign
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

// Explore Campaigns Visual
function ExplorePageVisual() {
  return (
    <div className="p-8 space-y-8">
      <PageTitle title="Explore Campaigns Page" description="Browse all active donation campaigns" />
      
      <Section title="Page Header">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Active Campaigns</h1>
          <p className="text-lg text-gray-600">Browse and support causes that matter to you</p>
        </div>
      </Section>

      <Section title="Category Filters">
        <div className="flex flex-wrap gap-3 justify-center">
          {["All Campaigns", "Health", "Education", "Food & Nutrition", "Environment", "Animals", "Other"].map((cat) => (
            <div key={cat} className={`px-5 py-2 rounded-lg ${cat === "All Campaigns" ? "bg-gradient-to-r from-[#00BCD4] to-[#4DD0E1] text-white" : "bg-gray-100 text-gray-700"}`}>
              {cat}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Campaign Cards Grid">
        <div className="grid grid-cols-3 gap-6">
          <CampaignPreview title="Help Build School" progress={75} raised="75,000" goal="100,000" donors={245} />
          <CampaignPreview title="Medical Emergency Fund" progress={60} raised="60,000" goal="100,000" donors={180} />
          <CampaignPreview title="Clean Water Project" progress={85} raised="85,000" goal="100,000" donors={320} />
        </div>
      </Section>
    </div>
  );
}

// How It Works Visual
function HowItWorksVisual() {
  return (
    <div className="p-8 space-y-8">
      <PageTitle title="How It Works Page" description="Platform guide for donors and campaign creators" />
      
      <Section title="Process Steps">
        <div className="grid grid-cols-3 gap-6">
          <ProcessStep icon="🔍" title="Browse Campaigns" description="Explore verified causes that align with your values" />
          <ProcessStep icon="💝" title="Donate Securely" description="Make safe, transparent donations with just a few clicks" />
          <ProcessStep icon="📊" title="Track Impact" description="See real-time updates on how your donation is making a difference" />
        </div>
      </Section>

      <Section title="For Donors">
        <div className="bg-blue-50 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00BCD4] to-[#4DD0E1] flex items-center justify-center text-2xl">
              💙
            </div>
            <h3 className="text-2xl font-bold text-gray-900">For Donors</h3>
          </div>
          <ul className="space-y-3 text-gray-700 mb-6">
            <li className="flex items-center gap-2">
              <span className="text-[#00BCD4]">✓</span> Browse verified campaigns
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#00BCD4]">✓</span> Donate with secure payment methods
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#00BCD4]">✓</span> Track your contribution impact
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#00BCD4]">✓</span> Get regular updates from campaigns
            </li>
          </ul>
          <button className="px-6 py-3 bg-gradient-to-r from-[#00BCD4] to-[#4DD0E1] text-white rounded-xl">
            Start Donating Now
          </button>
        </div>
      </Section>

      <Section title="For Campaign Creators">
        <div className="bg-cyan-50 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00BCD4] to-[#4DD0E1] flex items-center justify-center text-2xl">
              🚀
            </div>
            <h3 className="text-2xl font-bold text-gray-900">For Campaign Creators</h3>
          </div>
          <ul className="space-y-3 text-gray-700 mb-6">
            <li className="flex items-center gap-2">
              <span className="text-[#00BCD4]">✓</span> Create your campaign for free
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#00BCD4]">✓</span> Share your story and goals
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#00BCD4]">✓</span> Receive donations securely
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#00BCD4]">✓</span> Update supporters regularly
            </li>
          </ul>
          <button className="px-6 py-3 bg-gradient-to-r from-[#00BCD4] to-[#4DD0E1] text-white rounded-xl">
            Create Your Campaign
          </button>
        </div>
      </Section>
    </div>
  );
}

// Start Donating Visual
function StartDonatingVisual() {
  return (
    <div className="p-8 space-y-8">
      <PageTitle title="Start Donating Page" description="Choose a cause and start making a difference" />
      
      <Section title="Urgent Campaigns">
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🔥</span>
            <h3 className="text-xl font-bold text-gray-900">Urgent Campaigns</h3>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Emergency Medical Fund</h4>
            <div className="mb-3">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#00BCD4] to-[#4DD0E1]" style={{ width: "45%" }}></div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">₹45,000 raised of ₹100,000</span>
              <span className="text-sm font-semibold text-[#00BCD4]">45%</span>
            </div>
            <button className="w-full py-2 bg-gradient-to-r from-[#00BCD4] to-[#4DD0E1] text-white rounded-lg">
              Donate Now
            </button>
          </div>
        </div>
      </Section>

      <Section title="Browse by Category">
        <div className="grid grid-cols-3 gap-6">
          <CategoryCard icon="🏥" title="Health" count="125 Campaigns" />
          <CategoryCard icon="📚" title="Education" count="89 Campaigns" />
          <CategoryCard icon="🍲" title="Food & Nutrition" count="67 Campaigns" />
          <CategoryCard icon="🌳" title="Environment" count="45 Campaigns" />
          <CategoryCard icon="🐾" title="Animals" count="34 Campaigns" />
          <CategoryCard icon="🏘️" title="Community" count="78 Campaigns" />
        </div>
      </Section>

      <Section title="Active Campaigns">
        <div className="grid grid-cols-3 gap-6">
          <CampaignPreview title="Support Local School" progress={68} raised="68,000" goal="100,000" donors={200} />
          <CampaignPreview title="Rural Healthcare" progress={72} raised="72,000" goal="100,000" donors={156} />
          <CampaignPreview title="Food Distribution" progress={55} raised="55,000" goal="100,000" donors={189} />
        </div>
      </Section>
    </div>
  );
}

// Create Campaign Visual
function CreateCampaignVisual() {
  return (
    <div className="p-8 space-y-8">
      <PageTitle title="Create Campaign Page" description="Launch your fundraising campaign" />
      
      <Section title="Campaign Form">
        <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-3xl mx-auto">
          <FormField label="Campaign Title" placeholder="Give your campaign a compelling title" />
          <FormField label="Category" placeholder="Select a category" type="select" />
          <FormField label="Campaign Description" placeholder="Tell your story..." type="textarea" rows={6} />
          <FormField label="Funding Goal (₹)" placeholder="50000" type="number" />
          <FormField label="Campaign Duration (days)" placeholder="30" type="number" />
          
          <div className="mb-6">
            <label className="block text-gray-900 font-medium mb-3">Campaign Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center bg-gray-50">
              <div className="text-4xl mb-3">📤</div>
              <p className="text-gray-600 font-medium">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB</p>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-900 font-medium mb-3">Supporting Documents (Optional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50">
              <div className="text-3xl mb-2">📄</div>
              <p className="text-gray-600 font-medium">Upload supporting documents</p>
              <p className="text-sm text-gray-500 mt-1">PDFs, reports, certificates</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 mb-6 border border-blue-100">
            <p className="text-gray-700">
              By creating this campaign, you agree to our <span className="text-[#00BCD4] font-semibold">Terms of Service</span> and <span className="text-[#00BCD4] font-semibold">Campaign Guidelines</span>
            </p>
          </div>

          <button className="w-full py-4 bg-gradient-to-r from-[#00BCD4] to-[#4DD0E1] text-white rounded-xl font-medium text-lg">
            Create Campaign
          </button>
        </div>
      </Section>

      <Section title="Platform Benefits">
        <div className="grid grid-cols-3 gap-6">
          <BenefitCard icon="🎯" title="No Platform Fees" description="We don't charge any platform fees" />
          <BenefitCard icon="⚡" title="Quick Approval" description="Reviewed within 24-48 hours" />
          <BenefitCard icon="📤" title="Easy Updates" description="Update supporters anytime" />
        </div>
      </Section>
    </div>
  );
}

// FAQ Page Visual
function FAQPageVisual() {
  return (
    <div className="p-8 space-y-8">
      <PageTitle title="FAQ Page" description="Frequently asked questions and answers" />
      
      <Section title="FAQ Accordion">
        <div className="max-w-3xl mx-auto space-y-4">
          <FAQItem question="What is GiveHope?" expanded />
          <FAQItem question="How do I create an account?" />
          <FAQItem question="Is my donation secure?" />
          <FAQItem question="How do I donate to a campaign?" />
          <FAQItem question="Can I get a tax receipt?" />
          <FAQItem question="How do I start a campaign?" />
          <FAQItem question="What fees does GiveHope charge?" />
          <FAQItem question="How do I withdraw funds?" />
        </div>
      </Section>

      <Section title="Contact Support">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-10 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Still have questions?</h3>
          <p className="text-gray-600 mb-6">Our support team is here to help</p>
          <button className="px-8 py-3 bg-gradient-to-r from-[#00BCD4] to-[#4DD0E1] text-white rounded-xl">
            Contact Support
          </button>
        </div>
      </Section>
    </div>
  );
}

// Privacy Policy Visual
function PrivacyPageVisual() {
  return (
    <div className="p-8 space-y-8">
      <PageTitle title="Privacy Policy Page" description="Privacy policy and data protection information" />
      
      <Section title="Policy Header">
        <div className="text-center py-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: January 2025</p>
        </div>
      </Section>

      <Section title="Table of Contents">
        <div className="bg-blue-50 rounded-xl p-6 max-w-2xl mx-auto">
          <h3 className="font-semibold text-gray-900 mb-4">Table of Contents</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <span className="text-[#00BCD4]">•</span> Information We Collect
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#00BCD4]">•</span> How We Use Your Information
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#00BCD4]">•</span> Data Security
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#00BCD4]">•</span> Your Rights
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#00BCD4]">•</span> Cookies
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#00BCD4]">•</span> Contact Us
            </li>
          </ul>
        </div>
      </Section>

      <Section title="Policy Content">
        <div className="max-w-3xl mx-auto space-y-6">
          <PolicySection title="1. Information We Collect" />
          <PolicySection title="2. How We Use Your Information" />
          <PolicySection title="3. Data Security" />
          <PolicySection title="4. Your Rights" />
        </div>
      </Section>
    </div>
  );
}

// Helper Components
function PageTitle({ title, description }: { title: string; description: string }) {
  return (
    <div className="border-b border-gray-200 pb-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      {children}
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}

function CampaignPreview({ title, progress, raised, goal, donors }: any) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="h-32 bg-gradient-to-br from-blue-100 to-cyan-100"></div>
      <div className="p-4">
        <h4 className="font-semibold text-gray-900 mb-3">{title}</h4>
        <div className="mb-2">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#00BCD4] to-[#4DD0E1]" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <div className="flex items-center justify-between mb-3 text-sm">
          <span className="text-gray-600">₹{raised} / ₹{goal}</span>
          <span className="font-semibold text-[#00BCD4]">{progress}%</span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <span>👥 {donors} donors</span>
          <span>30 days left</span>
        </div>
        <button className="w-full py-2 bg-gradient-to-r from-[#00BCD4] to-[#4DD0E1] text-white rounded-lg text-sm">
          Donate Now
        </button>
      </div>
    </div>
  );
}

function ProcessStep({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-[#00BCD4] flex items-center justify-center text-4xl mx-auto mb-4">
        {icon}
      </div>
      <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

function CategoryCard({ icon, title, count }: { icon: string; title: string; count: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
      <div className="text-4xl mb-3">{icon}</div>
      <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{count}</p>
    </div>
  );
}

function BenefitCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
      <div className="text-4xl mb-3">{icon}</div>
      <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

function FormField({ label, placeholder, type = "text", rows }: any) {
  return (
    <div className="mb-6">
      <label className="block text-gray-900 font-medium mb-3">{label}</label>
      {type === "textarea" ? (
        <div className="border-2 border-gray-200 rounded-xl p-3 bg-white" style={{ minHeight: `${rows * 1.5}rem` }}>
          <span className="text-gray-400 text-sm">{placeholder}</span>
        </div>
      ) : type === "select" ? (
        <div className="border-2 border-gray-200 rounded-xl p-3 bg-white flex items-center justify-between">
          <span className="text-gray-400 text-sm">{placeholder}</span>
          <span className="text-gray-400">▼</span>
        </div>
      ) : (
        <div className="border-2 border-gray-200 rounded-xl p-3 bg-white">
          <span className="text-gray-400 text-sm">{placeholder}</span>
        </div>
      )}
    </div>
  );
}

function FAQItem({ question, expanded = false }: { question: string; expanded?: boolean }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-900">{question}</span>
        <span className="text-gray-400">{expanded ? "▼" : "▶"}</span>
      </div>
      {expanded && (
        <p className="mt-3 text-gray-600 text-sm">
          GiveHope is a donation platform that connects donors with verified campaigns and causes. We provide a transparent and secure way to make a difference in communities around the world.
        </p>
      )}
    </div>
  );
}

function PolicySection({ title }: { title: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h4 className="font-semibold text-gray-900 mb-3">{title}</h4>
      <div className="space-y-2 text-gray-600 text-sm">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Account information (name, email)</li>
          <li>Payment information</li>
          <li>Campaign details</li>
          <li>Communications</li>
        </ul>
      </div>
    </div>
  );
}
