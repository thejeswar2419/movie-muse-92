import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/StarRating";
import { ReviewCard } from "@/components/ReviewCard";
import { ReviewForm } from "@/components/ReviewForm";
import { ArrowLeft, Calendar, Film } from "lucide-react";

interface Movie {
  id: string;
  title: string;
  release_year: number;
  description: string;
  poster_url: string | null;
}

interface Review {
  id: string;
  user_name: string;
  rating: number;
  review_text: string;
  created_at: string;
}

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchMovieData(id);
    }
  }, [id]);

  const fetchMovieData = async (movieId: string) => {
    try {
      // Fetch movie
      const { data: movieData, error: movieError } = await supabase
        .from("movies")
        .select("*")
        .eq("id", movieId)
        .single();

      if (movieError) throw movieError;

      // Fetch reviews
      const { data: reviewsData, error: reviewsError } = await supabase
        .from("reviews")
        .select("*")
        .eq("movie_id", movieId)
        .order("created_at", { ascending: false });

      if (reviewsError) throw reviewsError;

      setMovie(movieData);
      setReviews(reviewsData || []);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateOverallRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Film className="mx-auto h-12 w-12 animate-pulse text-primary" />
          <p className="mt-4 text-muted-foreground">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Movie not found</h1>
          <Link to="/">
            <Button className="mt-4" variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Movies
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const overallRating = calculateOverallRating();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Movies
            </Button>
          </Link>
        </div>
      </header>

      {/* Movie Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-[300px_1fr]">
          {/* Poster */}
          <div className="aspect-[2/3] overflow-hidden rounded-lg border border-border bg-muted">
            {movie.poster_url ? (
              <img
                src={movie.poster_url}
                alt={movie.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                No Image
              </div>
            )}
          </div>

          {/* Movie Info */}
          <div className="animate-fade-in">
            <h1 className="mb-4 text-4xl font-bold text-foreground">
              {movie.title}
            </h1>

            <div className="mb-6 flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{movie.release_year}</span>
              </div>
            </div>

            {/* Overall Rating */}
            <div className="mb-6 rounded-lg border border-border bg-card p-6">
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                Overall Rating
              </h3>
              <div className="flex items-center gap-4">
                <StarRating rating={Math.round(overallRating)} size="lg" />
                <div>
                  <p className="text-3xl font-bold text-primary">
                    {overallRating > 0 ? overallRating.toFixed(1) : "N/A"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Based on {reviews.length}{" "}
                    {reviews.length === 1 ? "review" : "reviews"}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Synopsis
              </h3>
              <p className="leading-relaxed text-foreground">{movie.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Review Form */}
      <section className="container mx-auto px-4 py-8">
        <ReviewForm
          movieId={movie.id}
          movieTitle={movie.title}
          moviePoster={movie.poster_url || undefined}
          onReviewSubmitted={() => fetchMovieData(movie.id)}
        />
      </section>

      {/* Reviews List */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          User Reviews ({reviews.length})
        </h2>

        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewCard
                key={review.id}
                userName={review.user_name}
                rating={review.rating}
                reviewText={review.review_text}
                createdAt={review.created_at}
              />
            ))
          ) : (
            <div className="rounded-lg border border-border bg-card p-12 text-center">
              <p className="text-muted-foreground">
                No reviews yet. Be the first to review this movie!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
