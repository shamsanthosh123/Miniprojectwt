import { FAQSection } from "../components/FAQSection";
import { HelpCircle, Shield, CreditCard, FileText, Globe } from "lucide-react";

export function FAQPage() {
  const generalFAQs = [
    {
      question: "What is GiveHope?",
      answer: "GiveHope is a donation platform that connects donors with verified campaigns for causes like education, healthcare, disaster relief, and more. We make it easy for anyone to support meaningful causes and make a positive impact."
    },
    {
      question: "Where is your organization located?",
      answer: "We are based in Mumbai, Maharashtra, India. You can reach us at support@givehope.org or call us at +91 1800 123 4567."
    },
    {
      question: "How can I start my campaign?",
      answer: "Starting a campaign is simple! Click on 'Start Campaign' in the header, fill out the campaign details including title, description, goal amount, and upload supporting images and documents. Our team will review your campaign within 24-48 hours."
    },
    {
      question: "Is my donation secure?",
      answer: "Absolutely! All donations are processed through secure, encrypted payment gateways. We use industry-standard security measures to protect your personal and financial information. We never store your payment details on our servers."
    },
  ];

  const donationFAQs = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, UPI, net banking, and digital wallets. All payments are processed securely through our trusted payment partners."
    },
    {
      question: "Can I get a tax deduction receipt?",
      answer: "Yes, for eligible campaigns, we provide tax deduction receipts under Section 80G of the Income Tax Act. You'll receive your receipt via email within 7 working days of your donation."
    },
    {
      question: "Can I donate anonymously?",
      answer: "Yes, you have the option to donate anonymously. Simply check the 'Donate Anonymously' box during the donation process, and your name will not be displayed publicly."
    },
    {
      question: "What is the minimum donation amount?",
      answer: "The minimum donation amount is ₹100. However, you can donate any amount you're comfortable with through our custom donation option."
    },
  ];

  const campaignFAQs = [
    {
      question: "How long does it take to get my campaign approved?",
      answer: "Most campaigns are reviewed and approved within 24-48 hours. We'll notify you via email once your campaign is live. If we need additional information, we'll contact you."
    },
    {
      question: "Are there any fees for creating a campaign?",
      answer: "No! GiveHope does not charge any platform fees for creating campaigns. We believe in maximizing the impact of every donation."
    },
    {
      question: "How do I receive the funds raised?",
      answer: "Once your campaign ends or reaches its goal, funds are transferred to your registered bank account within 7-10 business days after verification of withdrawal request and supporting documents."
    },
    {
      question: "Can I update my campaign after it's live?",
      answer: "Yes, you can update your campaign description, add photos, and post updates to keep your supporters informed about the progress. However, changing the goal amount requires admin approval."
    },
  ];

  const safetyFAQs = [
    {
      question: "How do you verify campaigns?",
      answer: "All campaigns go through a thorough verification process. We check supporting documents, verify the identity of campaign creators, and ensure the cause is legitimate before approving any campaign."
    },
    {
      question: "What happens if a campaign is fraudulent?",
      answer: "If we identify or are notified of a fraudulent campaign, we immediately suspend it, refund all donations, and take legal action against the perpetrators. We have a zero-tolerance policy for fraud."
    },
    {
      question: "How can I report a suspicious campaign?",
      answer: "If you come across a suspicious campaign, please report it immediately through the 'Report Campaign' button on the campaign page or contact us at safety@givehope.org. We investigate all reports thoroughly."
    },
  ];

  return (
    <div className="page-transition min-h-screen bg-black pt-24 pb-20">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 left-1/4 w-96 h-96 bg-[#00BFFF]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-[#9D4EDD]/10 rounded-full blur-[120px]"></div>
      </div>

      <section className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6">
              <HelpCircle className="w-4 h-4 text-[#00BFFF]" />
              <span className="text-sm text-[#B0B0B0]">We're here to help</span>
            </div>
            <h1 className="text-6xl mb-4 gradient-text">Frequently Asked Questions</h1>
            <p className="text-xl text-[#B0B0B0] max-w-2xl mx-auto">
              Find answers to common questions about donations, campaigns, and our platform.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {/* General Questions */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center glow-blue"
                     style={{ background: 'linear-gradient(135deg, #00BFFF20, #00BFFF05)' }}>
                  <Globe className="w-6 h-6 text-[#00BFFF]" />
                </div>
                <h2 className="text-3xl text-white">General Questions</h2>
              </div>
              <FAQSection faqs={generalFAQs} />
            </div>

            {/* Donation Questions */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center glow-purple"
                     style={{ background: 'linear-gradient(135deg, #9D4EDD20, #9D4EDD05)' }}>
                  <CreditCard className="w-6 h-6 text-[#9D4EDD]" />
                </div>
                <h2 className="text-3xl text-white">Donation Questions</h2>
              </div>
              <FAQSection faqs={donationFAQs} />
            </div>

            {/* Campaign Questions */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center glow-green"
                     style={{ background: 'linear-gradient(135deg, #00FF9D20, #00FF9D05)' }}>
                  <FileText className="w-6 h-6 text-[#00FF9D]" />
                </div>
                <h2 className="text-3xl text-white">Campaign Questions</h2>
              </div>
              <FAQSection faqs={campaignFAQs} />
            </div>

            {/* Trust & Safety Questions */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                     style={{ background: 'linear-gradient(135deg, #FFB84D20, #FFB84D05)', boxShadow: '0 0 20px rgba(255, 184, 77, 0.3)' }}>
                  <Shield className="w-6 h-6 text-[#FFB84D]" />
                </div>
                <h2 className="text-3xl text-white">Trust & Safety</h2>
              </div>
              <FAQSection faqs={safetyFAQs} />
            </div>
          </div>

          {/* Contact CTA */}
          <div className="max-w-4xl mx-auto mt-16">
            <div className="glass neon-border rounded-3xl p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00BFFF]/5 to-[#9D4EDD]/5"></div>
              <div className="relative z-10">
                <h3 className="text-3xl mb-4 gradient-text">Still have questions?</h3>
                <p className="text-lg text-[#B0B0B0] mb-6">
                  Our support team is ready to help you
                </p>
                <button className="px-8 py-3 rounded-lg btn-gradient text-white">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
