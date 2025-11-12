import { Heart, Menu, X, Shield, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { adminAPI } from "../utils/api";
import { toast } from "sonner@2.0.3";

interface HeaderProps {
  onSignInClick: () => void;
  onSignUpClick: () => void;
  onNavigate: (page: string) => void;
}

export function Header({ onSignInClick, onSignUpClick, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(adminAPI.isAuthenticated());
  }, []);

  const handleLogout = () => {
    adminAPI.logout();
    setIsAdmin(false);
    toast.success('Logged out successfully');
    onNavigate('home');
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => onNavigate("home")} className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center icon-bg-teal shadow-lg transition-transform group-hover:scale-105">
            <Heart className="w-6 h-6 text-white" fill="white" />
          </div>
          <span className="text-2xl font-semibold bg-gradient-to-r from-[#00BCD4] to-[#4DD0E1] bg-clip-text text-transparent">
            GiveHope
          </span>
        </button>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          <button 
            onClick={() => onNavigate("explore")} 
            className="text-gray-700 hover:text-[#00BCD4] transition-colors font-medium"
          >
            Explore Campaigns
          </button>
          <button 
            onClick={() => onNavigate("how-it-works")} 
            className="text-gray-700 hover:text-[#00BCD4] transition-colors font-medium"
          >
            How It Works
          </button>
          <button 
            onClick={() => onNavigate("start-donating")} 
            className="text-gray-700 hover:text-[#00BCD4] transition-colors font-medium"
          >
            Start Donating
          </button>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {isAdmin ? (
            <>
              <button
                onClick={() => onNavigate('admin-dashboard')}
                className="flex items-center gap-2 px-5 py-2.5 text-[#00BCD4] hover:bg-[#E0F7FA] rounded-lg transition-colors font-medium"
              >
                <Shield className="w-4 h-4" />
                Admin Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 btn-auth-secondary"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onSignInClick}
                className="btn-auth-secondary"
              >
                Login
              </button>
              <button
                onClick={onSignUpClick}
                className="btn-auth"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 text-gray-700 hover:text-[#00BCD4] transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-5">
            <button 
              onClick={() => { onNavigate("explore"); setMobileMenuOpen(false); }} 
              className="text-gray-700 hover:text-[#00BCD4] transition-colors font-medium text-left py-2"
            >
              Explore Campaigns
            </button>
            <button 
              onClick={() => { onNavigate("how-it-works"); setMobileMenuOpen(false); }} 
              className="text-gray-700 hover:text-[#00BCD4] transition-colors font-medium text-left py-2"
            >
              How It Works
            </button>
            <button 
              onClick={() => { onNavigate("start-donating"); setMobileMenuOpen(false); }} 
              className="text-gray-700 hover:text-[#00BCD4] transition-colors font-medium text-left py-2"
            >
              Start Donating
            </button>
            
            <div className="flex flex-col gap-3 pt-3 border-t border-gray-100">
              {isAdmin ? (
                <>
                  <button
                    onClick={() => { onNavigate('admin-dashboard'); setMobileMenuOpen(false); }}
                    className="flex items-center justify-center gap-2 btn-auth-secondary text-center"
                  >
                    <Shield className="w-4 h-4" />
                    Admin Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 btn-auth-secondary text-center"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { onSignInClick(); setMobileMenuOpen(false); }}
                    className="btn-auth-secondary text-center"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => { onSignUpClick(); setMobileMenuOpen(false); }}
                    className="btn-auth text-center"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
