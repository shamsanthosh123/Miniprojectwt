import { Heart, Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00BFFF] to-[#9D4EDD] rounded-lg flex items-center justify-center glow-blue">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <span className="text-xl font-bold gradient-text">GiveHope</span>
            </div>
            <p className="text-sm text-[#B0B0B0] mb-4">
              Empowering communities through transparent and impactful donations.
            </p>
            <div className="flex items-center gap-3">
              <SocialIcon Icon={Facebook} />
              <SocialIcon Icon={Twitter} />
              <SocialIcon Icon={Instagram} />
              <SocialIcon Icon={Linkedin} />
            </div>
          </div>

          <div>
            <h3 className="text-white mb-4 font-semibold">Platform</h3>
            <ul className="space-y-2 text-sm">
              <FooterLink>Browse Campaigns</FooterLink>
              <FooterLink>Start a Campaign</FooterLink>
              <FooterLink>How It Works</FooterLink>
              <FooterLink>Success Stories</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-4 font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <FooterLink>Help Center</FooterLink>
              <FooterLink>Contact Us</FooterLink>
              <FooterLink>Trust & Safety</FooterLink>
              <FooterLink>FAQs</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-4 font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm text-[#B0B0B0]">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00BFFF]" />
                <span>support@givehope.org</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#9D4EDD]" />
                <span>+91 1800 123 4567</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#00FF9D] mt-1" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#B0B0B0]">
            © 2025 GiveHope. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-[#B0B0B0]">
            <a href="#" className="hover:text-[#00BFFF] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#00BFFF] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#00BFFF] transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ Icon }: { Icon: any }) {
  return (
    <a 
      href="#" 
      className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center text-[#B0B0B0] hover:text-[#00BFFF] hover:border-[#00BFFF]/50 transition-all duration-300 hover:glow-blue"
    >
      <Icon className="w-4 h-4" />
    </a>
  );
}

function FooterLink({ children }: { children: React.ReactNode }) {
  return (
    <li>
      <a href="#" className="text-[#B0B0B0] hover:text-[#00BFFF] transition-colors inline-block">
        {children}
      </a>
    </li>
  );
}
