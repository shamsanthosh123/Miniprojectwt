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
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Heart } from "lucide-react";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: {
    id: string;
    title: string;
  } | null;
}

export function DonationModal({ isOpen, onClose, campaign }: DonationModalProps) {
  const [amount, setAmount] = useState("500");
  const [customAmount, setCustomAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const predefinedAmounts = ["100", "250", "500", "1000", "2500"];

  const handleDonate = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Thank you for donating ₹${amount === "custom" ? customAmount : amount}!`);
      onClose();
    }, 1500);
  };

  if (!campaign) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass neon-border bg-[#0A0A0A]/95 border-[#00BFFF]/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white text-2xl">
            <Heart className="w-6 h-6 text-[#FF5555]" fill="currentColor" />
            Support This Campaign
          </DialogTitle>
          <DialogDescription className="text-[#B0B0B0]">
            {campaign.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <Label className="mb-3 block text-white">Select Amount</Label>
            <RadioGroup value={amount} onValueChange={setAmount}>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {predefinedAmounts.map((value) => (
                  <Label
                    key={value}
                    htmlFor={value}
                    className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all duration-300 ${
                      amount === value
                        ? "border-[#00BFFF] bg-[#00BFFF]/10 glow-blue text-white"
                        : "border-white/10 hover:border-white/30 text-[#B0B0B0]"
                    }`}
                  >
                    <RadioGroupItem value={value} id={value} className="sr-only" />
                    <span>₹{value}</span>
                  </Label>
                ))}
              </div>
              
              <Label
                htmlFor="custom"
                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all duration-300 ${
                  amount === "custom"
                    ? "border-[#00BFFF] bg-[#00BFFF]/10 glow-blue text-white"
                    : "border-white/10 hover:border-white/30 text-[#B0B0B0]"
                }`}
              >
                <RadioGroupItem value="custom" id="custom" />
                <span>Custom Amount</span>
              </Label>
            </RadioGroup>
          </div>

          {amount === "custom" && (
            <div>
              <Label htmlFor="customAmount" className="text-white mb-2 block">Enter Amount (₹)</Label>
              <Input
                id="customAmount"
                type="number"
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-[#B0B0B0]/50 input-glow"
              />
            </div>
          )}

          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          <div>
            <Label htmlFor="name" className="text-white mb-2 block">Your Name</Label>
            <Input 
              id="name" 
              placeholder="John Doe" 
              className="bg-white/5 border-white/10 text-white placeholder:text-[#B0B0B0]/50 input-glow" 
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-white mb-2 block">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="john@example.com" 
              className="bg-white/5 border-white/10 text-white placeholder:text-[#B0B0B0]/50 input-glow"
            />
          </div>

          <div className="glass rounded-lg p-4 border border-white/10">
            <div className="flex justify-between mb-2">
              <span className="text-[#B0B0B0]">Donation Amount:</span>
              <span className="font-semibold text-white">
                ₹{amount === "custom" ? customAmount || "0" : amount}
              </span>
            </div>
            <div className="flex justify-between text-sm text-[#B0B0B0]">
              <span>Processing Fee:</span>
              <span>₹0.00</span>
            </div>
          </div>

          <button
            className="w-full py-3 rounded-lg btn-gradient text-white disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleDonate}
            disabled={isProcessing || (amount === "custom" && !customAmount)}
          >
            {isProcessing ? "Processing..." : "Complete Donation"}
          </button>

          <p className="text-xs text-[#B0B0B0] text-center">
            Your donation is secure and will be processed safely. You'll receive a confirmation email.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
