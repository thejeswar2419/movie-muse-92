import { Card } from "@/components/ui/card";
import { StarRating } from "./StarRating";

interface ReviewCardProps {
  userName: string;
  rating: number;
  reviewText: string;
  createdAt: string;
}

export const ReviewCard = ({
  userName,
  rating,
  reviewText,
  createdAt,
}: ReviewCardProps) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="border-border bg-card p-6 animate-fade-in">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h4 className="font-semibold text-foreground">{userName}</h4>
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
        </div>
        <StarRating rating={rating} size="sm" />
      </div>
      <p className="text-foreground leading-relaxed">{reviewText}</p>
    </Card>
  );
};
