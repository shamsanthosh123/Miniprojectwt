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
import { ArrowLeft } from "lucide-react";

type PageType = "home" | "explore" | "how-it-works" | "start-donating" | "create-campaign";

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
        return <ExploreCampaigns />;
      case "how-it-works":
        return <HowItWorks />;
      case "start-donating":
        return <StartDonating />;
      case "create-campaign":
        return <CreateCampaign />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header 
        onSignInClick={() => setShowSignIn(true)} 
        onNavigate={handleNavigate}
      />
      
      {/* Back Button */}
      {pageHistory.length > 1 && (
        <button
          onClick={handleBack}
          className="fixed left-6 top-24 z-40 flex items-center gap-2 px-4 py-2 glass rounded-full text-sm hover:bg-white/10 transition-all duration-300 group"
          style={{ animation: "fadeSlideIn 0.6s ease-out" }}
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back</span>
        </button>
      )}
      
      {renderPage()}

      <Footer />

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
