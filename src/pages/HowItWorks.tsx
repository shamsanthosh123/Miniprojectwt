import { Search, Heart, TrendingUp, Shield, Users, CheckCircle } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Browse Campaigns",
      description: "Explore verified campaigns across various causes and categories that matter to you.",
    },
    {
      icon: Heart,
      title: "Choose Your Cause",
      description: "Select a campaign that resonates with your values and passion for making a difference.",
    },
    {
      icon: TrendingUp,
      title: "Make a Donation",
      description: "Contribute any amount securely. Every rupee counts towards creating positive change.",
    },
    {
      icon: CheckCircle,
      title: "Track Impact",
      description: "Receive updates on how your donation is making a real difference in people's lives.",
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "100% Secure",
      description: "Your donations are protected with bank-grade security and encryption.",
    },
    {
      icon: Users,
      title: "Verified Campaigns",
      description: "All campaigns are thoroughly verified before being listed on our platform.",
    },
    {
      icon: TrendingUp,
      title: "Real-time Updates",
      description: "Track your donations and see the impact in real-time with regular updates.",
    },
  ];

  return (
    <div className="page-transition min-h-screen bg-gradient-to-br from-emerald-50/30 via-teal-50/30 to-cyan-50/30">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl mb-4">How It Works</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Making a difference is simple. Follow these easy steps to start your journey of giving.
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-8 h-8 text-teal-600" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                    <h3 className="text-xl mb-3 text-center">{step.title}</h3>
                    <p className="text-gray-600 text-center text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-12 mb-16">
            <h2 className="text-4xl text-center mb-12">Why Choose GiveHope?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl shadow-lg p-12 text-white text-center">
            <h2 className="text-4xl mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of donors who are already making a difference
            </p>
            <button className="px-8 py-4 bg-white text-teal-600 rounded-lg hover:bg-gray-50 transition-colors">
              Start Donating Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
