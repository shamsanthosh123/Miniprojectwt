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
import { Checkbox } from "./ui/checkbox";
import { UserPlus } from "lucide-react";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignIn: () => void;
}

export function SignUpModal({ isOpen, onClose, onSwitchToSignIn }: SignUpModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (!agreeToTerms) {
      alert("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Account created successfully!");
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass neon-border bg-[#0A0A0A]/95 border-[#00BFFF]/30 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white text-2xl">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00BFFF] to-[#9D4EDD] flex items-center justify-center glow-blue">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            Create Your Account
          </DialogTitle>
          <DialogDescription className="text-[#B0B0B0]">
            Join our community and start making a difference today.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSignUp} className="space-y-4 py-4">
          <div>
            <Label htmlFor="signup-name" className="text-white mb-2 block">Full Name</Label>
            <Input
              id="signup-name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-[#B0B0B0]/50 input-glow"
            />
          </div>

          <div>
            <Label htmlFor="signup-email" className="text-white mb-2 block">Email Address</Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-[#B0B0B0]/50 input-glow"
            />
          </div>

          <div>
            <Label htmlFor="signup-password" className="text-white mb-2 block">Password</Label>
            <Input
              id="signup-password"
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-[#B0B0B0]/50 input-glow"
            />
          </div>

          <div>
            <Label htmlFor="signup-confirm-password" className="text-white mb-2 block">Confirm Password</Label>
            <Input
              id="signup-confirm-password"
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-[#B0B0B0]/50 input-glow"
            />
          </div>

          <div className="flex items-start gap-2 pt-2">
            <Checkbox
              id="terms"
              checked={agreeToTerms}
              onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
              className="border-white/20 data-[state=checked]:bg-[#00BFFF] data-[state=checked]:border-[#00BFFF]"
            />
            <label htmlFor="terms" className="text-sm text-[#B0B0B0] cursor-pointer leading-relaxed">
              I agree to the{" "}
              <a href="#" className="text-[#00BFFF] hover:text-[#00BFFF]/80 transition-colors">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#00BFFF] hover:text-[#00BFFF]/80 transition-colors">
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg btn-gradient text-white disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
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
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToSignIn}
              className="text-[#00BFFF] hover:text-[#00BFFF]/80 transition-colors"
            >
              Sign in
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
