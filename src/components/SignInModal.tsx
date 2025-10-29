import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { LogIn } from "lucide-react";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

export function SignInModal({ isOpen, onClose, onSwitchToSignUp }: SignInModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Successfully signed in!");
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass neon-border bg-[#0A0A0A]/95 border-[#00BFFF]/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white text-2xl">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00BFFF] to-[#9D4EDD] flex items-center justify-center glow-blue">
              <LogIn className="w-5 h-5 text-white" />
            </div>
            Sign In to GiveHope
          </DialogTitle>
          <DialogDescription className="text-[#B0B0B0]">
            Welcome back! Sign in to continue supporting causes that matter.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSignIn} className="space-y-5 py-4">
          <div>
            <Label htmlFor="signin-email" className="text-white mb-2 block">Email Address</Label>
            <Input
              id="signin-email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-[#B0B0B0]/50 input-glow"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="signin-password" className="text-white">Password</Label>
              <button type="button" className="text-sm text-[#00BFFF] hover:text-[#00BFFF]/80 transition-colors">
                Forgot password?
              </button>
            </div>
            <Input
              id="signin-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-[#B0B0B0]/50 input-glow"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg btn-gradient text-white disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#0A0A0A] text-[#B0B0B0]">or</span>
            </div>
          </div>

          <div className="text-center text-sm text-[#B0B0B0]">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToSignUp}
              className="text-[#00BFFF] hover:text-[#00BFFF]/80 transition-colors"
            >
              Sign up now
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
