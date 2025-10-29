import { Shield, Lock, Eye, FileText } from "lucide-react";

export function PrivacyPolicy() {
  return (
    <div className="page-transition min-h-screen bg-black pt-24 pb-20">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-[#00BFFF]/10 rounded-full blur-[120px]"></div>
      </div>

      <section className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6">
                <Shield className="w-4 h-4 text-[#00BFFF]" />
                <span className="text-sm text-[#B0B0B0]">Your privacy matters to us</span>
              </div>
              <h1 className="text-6xl mb-4 gradient-text">Privacy Policy</h1>
              <p className="text-lg text-[#B0B0B0]">
                Last updated: October 29, 2025
              </p>
            </div>

            <div className="glass neon-border rounded-3xl p-8 md:p-12 space-y-8">
              {/* Introduction */}
              <div>
                <p className="text-[#E0E0E0] leading-relaxed">
                  At GiveHope, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform.
                </p>
              </div>

              {/* Information We Collect */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center glow-blue"
                       style={{ background: 'linear-gradient(135deg, #00BFFF20, #00BFFF05)' }}>
                    <FileText className="w-5 h-5 text-[#00BFFF]" />
                  </div>
                  <h2 className="text-2xl text-white">Information We Collect</h2>
                </div>
                <div className="space-y-4 text-[#B0B0B0]">
                  <p className="leading-relaxed">
                    <strong className="text-white">Personal Information:</strong> When you create an account or make a donation, 
                    we collect information such as your name, email address, phone number, and billing information.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-white">Campaign Information:</strong> If you create a campaign, we collect details 
                    about your cause, supporting documents, and bank account information for fund transfers.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-white">Usage Data:</strong> We automatically collect information about how you 
                    interact with our platform, including IP address, browser type, and pages visited.
                  </p>
                </div>
              </div>

              {/* How We Use Your Information */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center glow-purple"
                       style={{ background: 'linear-gradient(135deg, #9D4EDD20, #9D4EDD05)' }}>
                    <Eye className="w-5 h-5 text-[#9D4EDD]" />
                  </div>
                  <h2 className="text-2xl text-white">How We Use Your Information</h2>
                </div>
                <ul className="space-y-3 text-[#B0B0B0] list-disc list-inside">
                  <li>To process donations and campaign creation</li>
                  <li>To communicate with you about your account and campaigns</li>
                  <li>To prevent fraud and ensure platform security</li>
                  <li>To improve our services and user experience</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </div>

              {/* Data Security */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center glow-green"
                       style={{ background: 'linear-gradient(135deg, #00FF9D20, #00FF9D05)' }}>
                    <Lock className="w-5 h-5 text-[#00FF9D]" />
                  </div>
                  <h2 className="text-2xl text-white">Data Security</h2>
                </div>
                <p className="text-[#B0B0B0] leading-relaxed">
                  We implement industry-standard security measures to protect your data, including encryption, 
                  secure servers, and regular security audits. However, no method of transmission over the internet 
                  is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>

              {/* Your Rights */}
              <div>
                <h3 className="text-xl text-white mb-3">Your Rights</h3>
                <p className="text-[#B0B0B0] leading-relaxed mb-3">
                  You have the right to:
                </p>
                <ul className="space-y-2 text-[#B0B0B0] list-disc list-inside">
                  <li>Access and download your personal data</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your data (subject to legal requirements)</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Object to certain data processing activities</li>
                </ul>
              </div>

              {/* Third-Party Services */}
              <div>
                <h3 className="text-xl text-white mb-3">Third-Party Services</h3>
                <p className="text-[#B0B0B0] leading-relaxed">
                  We use trusted third-party services for payment processing, analytics, and email communications. 
                  These providers have their own privacy policies and we ensure they meet our security standards.
                </p>
              </div>

              {/* Cookies */}
              <div>
                <h3 className="text-xl text-white mb-3">Cookies and Tracking</h3>
                <p className="text-[#B0B0B0] leading-relaxed">
                  We use cookies and similar tracking technologies to improve your experience on our platform. 
                  You can control cookie preferences through your browser settings.
                </p>
              </div>

              {/* Contact */}
              <div className="pt-6 border-t border-white/10">
                <h3 className="text-xl text-white mb-3">Contact Us</h3>
                <p className="text-[#B0B0B0] leading-relaxed">
                  If you have any questions about this Privacy Policy or your data, please contact us at:
                  <br />
                  <a href="mailto:privacy@givehope.org" className="text-[#00BFFF] hover:text-[#00BFFF]/80 transition-colors">
                    privacy@givehope.org
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
