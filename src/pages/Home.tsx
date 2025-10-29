import { Hero } from "../components/Hero";

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="page-transition">
      <Hero onNavigate={onNavigate} />
      
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00BFFF]/10 rounded-full blur-[150px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl mb-6 gradient-text">Ready to Make an Impact?</h2>
            <p className="text-xl text-[#B0B0B0] mb-10 max-w-2xl mx-auto">
              Every contribution, no matter the size, helps create positive change in our world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => onNavigate("start-donating")}
                className="px-8 py-4 text-lg rounded-lg btn-gradient text-white"
              >
                Start Donating Today
              </button>
              <button 
                onClick={() => onNavigate("create-campaign")}
                className="px-8 py-4 text-lg rounded-lg border border-[#9D4EDD]/30 text-[#9D4EDD] hover:bg-[#9D4EDD]/10 transition-all duration-300"
              >
                Create Your Campaign
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
