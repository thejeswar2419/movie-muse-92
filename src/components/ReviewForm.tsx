import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StarRating } from "./StarRating";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ReviewFormProps {
  movieId: string;
  movieTitle: string;
  moviePoster?: string;
  onReviewSubmitted: () => void;
}

export const ReviewForm = ({
  movieId,
  movieTitle,
  moviePoster,
  onReviewSubmitted,
}: ReviewFormProps) => {
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (reviewText.trim().length < 10) {
      toast.error("Review must be at least 10 characters long");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("reviews").insert({
        movie_id: movieId,
        movie_title: movieTitle,
        movie_poster: moviePoster || null,
        user_name: userName.trim() || "Anonymous",
        rating,
        review_text: reviewText.trim(),
      });

      if (error) throw error;

      toast.success("Review submitted successfully!");
      
      // Reset form
      setUserName("");
      setRating(0);
      setReviewText("");
      
      // Notify parent
      onReviewSubmitted();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-border bg-card p-6">
      <h3 className="mb-6 text-2xl font-bold text-foreground">Write a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <Label htmlFor="userName" className="text-foreground">
            Your Name (Optional)
          </Label>
          <Input
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Leave blank for Anonymous"
            className="mt-2 bg-background border-border text-foreground"
            maxLength={50}
          />
        </div>

        {/* Rating */}
        <div>
          <Label className="text-foreground">Your Rating</Label>
          <div className="mt-2">
            <StarRating
              rating={rating}
              interactive
              onRatingChange={setRating}
              size="lg"
            />
          </div>
        </div>

        {/* Review Text */}
        <div>
          <Label htmlFor="reviewText" className="text-foreground">
            Your Review
          </Label>
          <Textarea
            id="reviewText"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share your thoughts about this movie..."
            className="mt-2 min-h-[120px] bg-background border-border text-foreground"
            maxLength={1000}
            required
          />
          <p className="mt-1 text-xs text-muted-foreground">
            {reviewText.length}/1000 characters
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting || rating === 0}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </Card>
  );
};
