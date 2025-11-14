import { Heart, Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { memo } from "react";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer = memo(function Footer({ onNavigate }: FooterProps = {}) {
  return (
    <footer className="bg-gradient-to-b from-[#B2EBF2] to-[#80DEEA] border-t border-[#00BCD4]/20 mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Main Footer Content - Better Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center icon-bg-teal shadow-lg">
                <Heart className="w-7 h-7 text-white" fill="white" />
              </div>
              <span className="text-2xl font-semibold bg-gradient-to-r from-[#00BCD4] to-[#4DD0E1] bg-clip-text text-transparent">
                GiveHope
              </span>
            </div>
            <p className="text-base text-gray-800 leading-relaxed max-w-xs">
              Empowering communities through transparent and impactful donations.
            </p>
            <div className="flex items-center gap-4">
              <SocialIcon Icon={Facebook} />
              <SocialIcon Icon={Twitter} />
              <SocialIcon Icon={Instagram} />
              <SocialIcon Icon={Linkedin} />
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-white mb-6">Platform</h3>
            <ul className="space-y-4">
              <FooterLink onClick={() => onNavigate?.("explore")}>Browse Campaigns</FooterLink>
              <FooterLink onClick={() => onNavigate?.("create-campaign")}>Start a Campaign</FooterLink>
              <FooterLink onClick={() => onNavigate?.("how-it-works")}>How It Works</FooterLink>
              <FooterLink>Success Stories</FooterLink>
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-white mb-6">Support</h3>
            <ul className="space-y-4">
              <FooterLink>Help Center</FooterLink>
              <FooterLink>Contact Us</FooterLink>
              <FooterLink>Trust & Safety</FooterLink>
              <li>
                <button 
                  onClick={() => onNavigate?.("faq")}
                  className="text-gray-800 hover:text-white transition-colors font-medium"
                >
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-white mb-6">Contact</h3>
            <ul className="space-y-5">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#00BCD4]" />
                </div>
                <span className="text-gray-800 font-medium">support@givehope.org</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#00BCD4]" />
                </div>
                <span className="text-gray-800 font-medium">+91 1800 123 4567</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#00BCD4]" />
                </div>
                <span className="text-gray-800 font-medium leading-relaxed">Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mb-10"></div>

        {/* Bottom Footer - Better Alignment */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-base text-gray-800 font-medium">
            © 2025 GiveHope. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-gray-800 hover:text-white transition-colors font-medium">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-800 hover:text-white transition-colors font-medium">
              Terms of Service
            </a>
            <a href="#" className="text-gray-800 hover:text-white transition-colors font-medium">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
});

function SocialIcon({ Icon }: { Icon: any }) {
  return (
    <a 
      href="#" 
      className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-white hover:bg-gradient-to-br hover:from-[#00BCD4] hover:to-[#4DD0E1] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <Icon className="w-5 h-5" />
    </a>
  );
}

function FooterLink({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <li>
      <button 
        onClick={onClick} 
        className="text-gray-800 hover:text-white transition-colors font-medium text-left"
      >
        {children}
      </button>
    </li>
  );
}
