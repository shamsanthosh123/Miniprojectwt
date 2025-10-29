import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { SignInModal } from "./components/SignInModal";
import { SignUpModal } from "./components/SignUpModal";
import { Home } from "./pages/Home";
import { ExploreCampaigns } from "./pages/ExploreCampaigns";
import { HowItWorks } from "./pages/HowItWorks";
import { StartDonating } from "./pages/StartDonating";
import { CreateCampaign } from "./pages/CreateCampaign";

type PageType = "home" | "explore" | "how-it-works" | "start-donating" | "create-campaign";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as PageType);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/30 via-teal-50/30 to-cyan-50/30">
      <Header 
        onSignInClick={() => setShowSignIn(true)} 
        onNavigate={handleNavigate}
      />
      
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
