import { Button } from "./ui/button";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onSignInClick: () => void;
  onNavigate: (page: string) => void;
}

export function Header({ onSignInClick, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button 
          onClick={() => onNavigate("home")}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#00BFFF] to-[#9D4EDD] glow-blue">
            <Heart className="w-6 h-6 text-white" fill="white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-[#00BFFF] to-[#9D4EDD] bg-clip-text text-transparent">
            GiveHope
          </span>
        </button>
        
        <nav className="hidden lg:flex items-center gap-8">
          <NavLink onClick={() => onNavigate("explore")}>Explore Campaigns</NavLink>
          <NavLink onClick={() => onNavigate("how-it-works")}>How It Works</NavLink>
          <NavLink onClick={() => onNavigate("start-donating")}>Start Donating</NavLink>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onSignInClick}
            className="px-6 py-2.5 rounded-lg border border-[#00BFFF]/30 text-[#00BFFF] hover:bg-[#00BFFF]/10 transition-all duration-300 hover:glow-blue"
          >
            Sign In
          </button>
          <button
            onClick={() => onNavigate("create-campaign")}
            className="px-6 py-2.5 rounded-lg btn-gradient text-white"
          >
            Start Campaign
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 text-[#00BFFF]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass border-t border-white/10">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            <MobileNavLink onClick={() => { onNavigate("explore"); setMobileMenuOpen(false); }}>
              Explore Campaigns
            </MobileNavLink>
            <MobileNavLink onClick={() => { onNavigate("how-it-works"); setMobileMenuOpen(false); }}>
              How It Works
            </MobileNavLink>
            <MobileNavLink onClick={() => { onNavigate("start-donating"); setMobileMenuOpen(false); }}>
              Start Donating
            </MobileNavLink>
            <button
              onClick={() => { onSignInClick(); setMobileMenuOpen(false); }}
              className="px-6 py-2.5 rounded-lg border border-[#00BFFF]/30 text-[#00BFFF] hover:bg-[#00BFFF]/10 transition-all duration-300"
            >
              Sign In
            </button>
            <button
              onClick={() => { onNavigate("create-campaign"); setMobileMenuOpen(false); }}
              className="px-6 py-2.5 rounded-lg btn-gradient text-white"
            >
              Start Campaign
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavLink({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="text-[#B0B0B0] hover:text-[#00BFFF] transition-all duration-300 relative group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00BFFF] to-[#9D4EDD] group-hover:w-full transition-all duration-300"></span>
    </button>
  );
}

function MobileNavLink({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="text-[#B0B0B0] hover:text-[#00BFFF] transition-all duration-300 text-left py-2"
    >
      {children}
    </button>
  );
}
