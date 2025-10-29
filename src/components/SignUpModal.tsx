import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
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
      <DialogContent className="sm:max-w-xl bg-white border-gray-200 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <DialogTitle className="flex items-center gap-4 text-gray-900 text-3xl mb-2">
            <div className="w-14 h-14 rounded-xl icon-bg-teal flex items-center justify-center shadow-lg">
              <UserPlus className="w-7 h-7 text-white" />
            </div>
            Create Your Account
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-lg leading-relaxed pt-2">
            Join our community and start making a difference today.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSignUp} className="space-y-7 py-8">
          <div className="space-y-3">
            <Label htmlFor="signup-name" className="text-gray-900 text-base font-medium block">
              Full Name
            </Label>
            <Input
              id="signup-name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-simple h-12 text-base"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="signup-email" className="text-gray-900 text-base font-medium block">
              Email Address
            </Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-simple h-12 text-base"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="signup-password" className="text-gray-900 text-base font-medium block">
              Password
            </Label>
            <Input
              id="signup-password"
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-simple h-12 text-base"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="signup-confirm-password" className="text-gray-900 text-base font-medium block">
              Confirm Password
            </Label>
            <Input
              id="signup-confirm-password"
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input-simple h-12 text-base"
            />
          </div>

          <div className="flex items-start gap-4 pt-3">
            <Checkbox
              id="terms"
              checked={agreeToTerms}
              onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
              className="border-gray-300 data-[state=checked]:bg-[#00BCD4] data-[state=checked]:border-[#00BCD4] mt-1"
            />
            <label htmlFor="terms" className="text-base text-gray-600 cursor-pointer leading-relaxed">
              I agree to the{" "}
              <a href="#" className="text-[#00BCD4] hover:text-[#00838F] transition-colors font-semibold">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#00BCD4] hover:text-[#00838F] transition-colors font-semibold">
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full btn-gradient disabled:opacity-50 h-12 text-base"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-gray-500 text-base">or</span>
            </div>
          </div>

          <div className="text-center text-base text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToSignIn}
              className="text-[#00BCD4] hover:text-[#00838F] transition-colors font-semibold"
            >
              Sign in
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
