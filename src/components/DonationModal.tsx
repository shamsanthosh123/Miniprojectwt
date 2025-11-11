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
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Heart } from "lucide-react";
import { donorAPI } from "../utils/api";
import { toast } from "sonner@2.0.3";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: {
    id: string;
    title: string;
  } | null;
  onDonationSuccess?: () => void;
}

export function DonationModal({ isOpen, onClose, campaign, onDonationSuccess }: DonationModalProps) {
  const [amount, setAmount] = useState("500");
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [displayPublicly, setDisplayPublicly] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const predefinedAmounts = ["100", "250", "500", "1000", "2500"];

  const handleDonate = async () => {
    // Validation
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }

    const donationAmount = amount === "custom" ? parseFloat(customAmount) : parseFloat(amount);
    if (isNaN(donationAmount) || donationAmount <= 0) {
      toast.error("Please enter a valid donation amount");
      return;
    }

    setIsProcessing(true);

    try {
      const response = await donorAPI.createDonation({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        amount: donationAmount,
        campaignId: campaign!.id,
        message: message.trim() || undefined,
        displayPublicly,
      });

      if (response.success) {
        toast.success(`Thank you for donating ₹${donationAmount}! Your contribution makes a difference.`);
        
        // Reset form
        setAmount("500");
        setCustomAmount("");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setDisplayPublicly(true);
        
        // Call success callback if provided
        if (onDonationSuccess) {
          onDonationSuccess();
        }
        
        onClose();
      } else {
        toast.error(response.message || "Failed to process donation");
      }
    } catch (error: any) {
      console.error("Donation error:", error);
      toast.error(error.message || "Failed to process donation. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!campaign) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border-gray-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-900 text-2xl">
            <Heart className="w-6 h-6 text-[#00BCD4]" fill="currentColor" />
            Support This Campaign
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {campaign.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <Label className="mb-3 block text-gray-900">Select Amount</Label>
            <RadioGroup value={amount} onValueChange={setAmount}>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {predefinedAmounts.map((value) => (
                  <Label
                    key={value}
                    htmlFor={value}
                    className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                      amount === value
                        ? "border-[#00BCD4] bg-[#E0F7FA] text-gray-900"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}
                  >
                    <RadioGroupItem value={value} id={value} className="sr-only" />
                    <span>₹{value}</span>
                  </Label>
                ))}
              </div>
              
              <Label
                htmlFor="custom"
                className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                  amount === "custom"
                    ? "border-[#00BCD4] bg-[#E0F7FA] text-gray-900"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                <RadioGroupItem value="custom" id="custom" />
                <span>Custom Amount</span>
              </Label>
            </RadioGroup>
          </div>

          {amount === "custom" && (
            <div>
              <Label htmlFor="customAmount" className="text-gray-900 mb-2 block">Enter Amount (₹)</Label>
              <Input
                id="customAmount"
                type="number"
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="input-simple"
              />
            </div>
          )}

          <div className="h-px bg-gray-200"></div>

          <div>
            <Label htmlFor="name" className="text-gray-900 mb-2 block">Your Name *</Label>
            <Input 
              id="name" 
              placeholder="John Doe" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-simple" 
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-gray-900 mb-2 block">Email Address *</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="john@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-simple"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-gray-900 mb-2 block">Phone Number *</Label>
            <Input 
              id="phone" 
              type="tel" 
              placeholder="+91 1234567890" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-simple"
            />
          </div>

          <div>
            <Label htmlFor="message" className="text-gray-900 mb-2 block">Message (Optional)</Label>
            <Textarea 
              id="message" 
              placeholder="Add a message of support..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input-simple min-h-[80px]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="displayPublicly" 
              checked={displayPublicly}
              onCheckedChange={(checked) => setDisplayPublicly(checked as boolean)}
            />
            <Label htmlFor="displayPublicly" className="text-sm text-gray-600 cursor-pointer">
              Display my name publicly as a donor
            </Label>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Donation Amount:</span>
              <span className="font-semibold text-gray-900">
                ₹{amount === "custom" ? customAmount || "0" : amount}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Processing Fee:</span>
              <span>₹0.00</span>
            </div>
          </div>

          <button
            className="w-full py-3 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleDonate}
            disabled={isProcessing || (amount === "custom" && !customAmount)}
          >
            {isProcessing ? "Processing..." : "Complete Donation"}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Your donation is secure and will be processed safely. You'll receive a confirmation email.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
