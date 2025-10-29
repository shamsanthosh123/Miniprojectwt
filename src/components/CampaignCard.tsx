import { Calendar, Users } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useEffect } from "react";

interface CampaignCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  raised: number;
  goal: number;
  donors: number;
  daysLeft: number;
  onDonate: (id: string) => void;
}

export function CampaignCard({
  id,
  title,
  description,
  image,
  category,
  raised,
  goal,
  donors,
  daysLeft,
  onDonate,
}: CampaignCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const percentage = Math.round((raised / goal) * 100);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`glass neon-border rounded-2xl overflow-hidden card-hover transition-all duration-800 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="relative h-56 overflow-hidden group">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs glass border border-[#00BFFF]/30 text-[#00BFFF]">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl mb-2 text-white">{title}</h3>
        <p className="text-[#B0B0B0] mb-4 line-clamp-2 text-sm">{description}</p>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-[#B0B0B0]">Raised: ₹{raised.toLocaleString()}</span>
              <span className="text-[#00FF9D]">{percentage}%</span>
            </div>
            
            {/* Progress Bar */}
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full progress-glow rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            
            <div className="text-[#B0B0B0] text-sm mt-1">
              Goal: ₹{goal.toLocaleString()}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <div className="flex items-center gap-4 text-sm text-[#B0B0B0]">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-[#00BFFF]" />
                <span>{donors.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-[#9D4EDD]" />
                <span>{daysLeft}d left</span>
              </div>
            </div>
          </div>

          <button 
            className="w-full py-3 rounded-lg btn-gradient text-white mt-2"
            onClick={() => onDonate(id)}
          >
            Donate Now
          </button>
        </div>
      </div>
    </div>
  );
}
