import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { SignInModal } from "./components/SignInModal";
import { SignUpModal } from "./components/SignUpModal";
import { Home } from "./pages/Home";
import { ExploreCampaigns } from "./pages/ExploreCampaigns";
import { HowItWorks } from "./pages/HowItWorks";
import { StartDonating } from "./pages/StartDonating";
import { CreateCampaign } from "./pages/CreateCampaign";
import { FAQPage } from "./pages/FAQPage";
import { ArrowLeft } from "lucide-react";

type PageType = "home" | "explore" | "how-it-works" | "start-donating" | "create-campaign" | "faq";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [pageHistory, setPageHistory] = useState<PageType[]>(["home"]);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleNavigate = (page: string) => {
    const newPage = page as PageType;
    setPageHistory(prev => [...prev, newPage]);
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    if (pageHistory.length > 1) {
      const newHistory = [...pageHistory];
      newHistory.pop(); // Remove current page
      const previousPage = newHistory[newHistory.length - 1];
      setPageHistory(newHistory);
      setCurrentPage(previousPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={handleNavigate} />;
      case "explore":
        return <ExploreCampaigns onNavigate={handleNavigate} />;
      case "how-it-works":
        return <HowItWorks onNavigate={handleNavigate} />;
      case "start-donating":
        return <StartDonating onNavigate={handleNavigate} />;
      case "create-campaign":
        return <CreateCampaign onNavigate={handleNavigate} />;
      case "faq":
        return <FAQPage />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F9FF 100%)' }}>
      <Header 
        onSignInClick={() => setShowSignIn(true)}
        onSignUpClick={() => setShowSignUp(true)}
        onNavigate={handleNavigate}
      />
      
      {/* Back Button */}
      {pageHistory.length > 1 && (
        <button
          onClick={handleBack}
          className="fixed left-6 top-24 z-40 flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm hover:bg-gray-50 transition-all group fade-in shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back</span>
        </button>
      )}
      
      {renderPage()}

      <Footer onNavigate={handleNavigate} />

      <SignInModal
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
        onSwitchToSignUp={() => {
          setShowSignIn(false);
          setShowSignUp(true);
        }}
      />

      <SignUpModal
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSwitchToSignIn={() => {
          setShowSignUp(false);
          setShowSignIn(true);
        }}
      />
    </div>
  );
}
