import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { StarRating } from "./StarRating";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  id: string;
  title: string;
  releaseYear: number;
  posterUrl?: string;
  overallRating: number;
  reviewCount: number;
}

export const MovieCard = ({
  id,
  title,
  releaseYear,
  posterUrl,
  overallRating,
  reviewCount,
}: MovieCardProps) => {
  return (
    <Link to={`/movie/${id}`}>
      <Card
        className={cn(
          "group relative overflow-hidden border-border bg-card hover:border-primary/50",
          "transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20",
          "animate-scale-in"
        )}
      >
        {/* Poster */}
        <div className="aspect-[2/3] overflow-hidden bg-muted">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="mb-1 font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="mb-3 text-sm text-muted-foreground">{releaseYear}</p>

          {/* Rating */}
          <div className="flex items-center justify-between">
            <StarRating rating={Math.round(overallRating)} size="sm" />
            <span className="text-sm font-medium text-muted-foreground">
              {overallRating > 0 ? overallRating.toFixed(1) : "N/A"}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
          </p>
        </div>
      </Card>
    </Link>
  );
};
