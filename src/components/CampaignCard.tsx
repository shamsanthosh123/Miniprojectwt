import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 left-3">
          {category}
        </Badge>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Raised: ₹{raised.toLocaleString()}</span>
              <span>{percentage}%</span>
            </div>
            <Progress value={percentage} className="h-2" />
            <div className="text-gray-500 mt-1">
              Goal: ₹{goal.toLocaleString()}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{donors} donors</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{daysLeft} days left</span>
              </div>
            </div>
          </div>

          <Button 
            className="w-full" 
            onClick={() => onDonate(id)}
          >
            Donate Now
          </Button>
        </div>
      </div>
    </Card>
  );
}
