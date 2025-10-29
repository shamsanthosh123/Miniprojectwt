import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
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
    // Simulate sign in
    setTimeout(() => {
      setIsLoading(false);
      alert("Successfully signed in!");
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LogIn className="w-5 h-5 text-teal-600" />
            Sign In to GiveHope
          </DialogTitle>
          <DialogDescription>
            Welcome back! Sign in to continue supporting causes that matter.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSignIn} className="space-y-4 py-4">
          <div>
            <Label htmlFor="signin-email">Email Address</Label>
            <Input
              id="signin-email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="signin-password">Password</Label>
              <button type="button" className="text-sm text-teal-600 hover:text-teal-700">
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
            />
          </div>

          <Button 
            type="submit"
            className="w-full" 
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>

          <Separator className="my-4" />

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToSignUp}
              className="text-teal-600 hover:text-teal-700"
            >
              Sign up now
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
