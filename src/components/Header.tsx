import { Button } from "./ui/button";
import { Heart, Menu } from "lucide-react";

interface HeaderProps {
  onSignInClick: () => void;
  onNavigate: (page: string) => void;
}

export function Header({ onSignInClick, onNavigate }: HeaderProps) {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button 
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" fill="white" />
          </div>
          <span className="text-xl">GiveHope</span>
        </button>
        
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => onNavigate("explore")}
            className="text-gray-600 hover:text-teal-600 transition-colors"
          >
            Explore Campaigns
          </button>
          <button 
            onClick={() => onNavigate("how-it-works")}
            className="text-gray-600 hover:text-teal-600 transition-colors"
          >
            How It Works
          </button>
          <button 
            onClick={() => onNavigate("start-donating")}
            className="text-gray-600 hover:text-teal-600 transition-colors"
          >
            Start Donating
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={onSignInClick}>Sign In</Button>
          <Button onClick={() => onNavigate("create-campaign")}>Start Campaign</Button>
          <button className="md:hidden p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
