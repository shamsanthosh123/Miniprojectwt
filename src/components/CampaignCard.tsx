import { Calendar, Users } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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
  const percentage = Math.round((raised / goal) * 100);

  return (
    <div className="bg-white rounded-2xl overflow-hidden card-simple fade-in">
      <div className="relative h-64 overflow-hidden group">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-5 left-5">
          <span className="px-4 py-2 rounded-full text-sm bg-white/95 backdrop-blur-sm text-gray-700 font-medium shadow-lg">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-7">
        <h3 className="text-2xl mb-3 text-gray-900 font-semibold leading-tight">{title}</h3>
        <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">{description}</p>
        
        <div className="space-y-5">
          <div>
            <div className="flex justify-between mb-3">
              <span className="text-gray-600 font-medium">Raised: ₹{raised.toLocaleString()}</span>
              <span className="text-[#00BCD4] font-semibold text-lg">{percentage}%</span>
            </div>
            
            {/* Progress Bar with Gradient */}
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full progress-bar transition-all duration-1000"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            
            <div className="text-gray-500 mt-2 font-medium">
              Goal: ₹{goal.toLocaleString()}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-5 text-gray-600 font-medium">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#00BCD4]" />
                <span>{donors.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#00BCD4]" />
                <span>{daysLeft}d left</span>
              </div>
            </div>
          </div>

          <button 
            className="w-full btn-gradient mt-2"
            onClick={() => onDonate(id)}
          >
            Donate Now
          </button>
        </div>
      </div>
    </div>
  );
}
