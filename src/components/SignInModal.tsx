import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { LogIn } from "lucide-react";
import { adminAPI } from "../utils/api";
import { toast } from "sonner@2.0.3";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

export function SignInModal({ isOpen, onClose, onSwitchToSignUp }: SignInModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await adminAPI.login({ email, password });
      
      if (response.success) {
        toast.success('Login successful! Welcome back.');
        onClose();
        // Reload to update header state
        window.location.reload();
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl bg-white border-gray-200">
        <DialogHeader className="space-y-4">
          <DialogTitle className="flex items-center gap-4 text-gray-900 text-3xl mb-2">
            <div className="w-14 h-14 rounded-xl icon-bg-teal flex items-center justify-center shadow-lg">
              <LogIn className="w-7 h-7 text-white" />
            </div>
            Sign In to GiveHope
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-lg leading-relaxed pt-2">
            Welcome back! Sign in to continue supporting causes that matter.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSignIn} className="space-y-8 py-8">
          <div className="space-y-3">
            <Label htmlFor="signin-email" className="text-gray-900 text-base font-medium block">
              Email Address
            </Label>
            <Input
              id="signin-email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-simple h-12 text-base"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="signin-password" className="text-gray-900 text-base font-medium">
                Password
              </Label>
              <button type="button" className="text-sm text-[#00BCD4] hover:text-[#00838F] transition-colors font-medium">
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
              className="input-simple h-12 text-base"
            />
          </div>

          <button
            type="submit"
            className="w-full btn-gradient disabled:opacity-50 h-12 text-base"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
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
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToSignUp}
              className="text-[#00BCD4] hover:text-[#00838F] transition-colors font-semibold"
            >
              Sign up now
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
