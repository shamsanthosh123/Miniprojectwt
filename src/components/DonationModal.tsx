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
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";
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
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Thank you for donating ₹${amount === "custom" ? customAmount : amount}!`);
      onClose();
    }, 1500);
  };

  if (!campaign) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" fill="currentColor" />
            Support This Campaign
          </DialogTitle>
          <DialogDescription>
            {campaign.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <Label className="mb-3 block">Select Amount</Label>
            <RadioGroup value={amount} onValueChange={setAmount}>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {predefinedAmounts.map((value) => (
                  <Label
                    key={value}
                    htmlFor={value}
                    className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      amount === value
                        ? "border-teal-500 bg-teal-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <RadioGroupItem value={value} id={value} className="sr-only" />
                    <span>₹{value}</span>
                  </Label>
                ))}
              </div>
              
              <Label
                htmlFor="custom"
                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                  amount === "custom"
                    ? "border-teal-500 bg-teal-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <RadioGroupItem value="custom" id="custom" />
                <span>Custom Amount</span>
              </Label>
            </RadioGroup>
          </div>

          {amount === "custom" && (
            <div>
              <Label htmlFor="customAmount">Enter Amount (₹)</Label>
              <Input
                id="customAmount"
                type="number"
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="mt-2"
              />
            </div>
          )}

          <Separator />

          <div>
            <Label htmlFor="name">Your Name</Label>
            <Input id="name" placeholder="John Doe" className="mt-2" />
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="john@example.com" className="mt-2" />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span>Donation Amount:</span>
              <span className="font-semibold">
                ₹{amount === "custom" ? customAmount || "0" : amount}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Processing Fee:</span>
              <span>₹0.00</span>
            </div>
          </div>

          <Button 
            className="w-full" 
            size="lg"
            onClick={handleDonate}
            disabled={isProcessing || (amount === "custom" && !customAmount)}
          >
            {isProcessing ? "Processing..." : "Complete Donation"}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Your donation is secure and will be processed safely. You'll receive a confirmation email.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
