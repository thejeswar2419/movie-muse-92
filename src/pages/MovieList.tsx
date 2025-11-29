import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MovieCard } from "@/components/MovieCard";
import { Film } from "lucide-react";

interface Movie {
  id: string;
  title: string;
  release_year: number;
  description: string;
  poster_url: string | null;
}

interface Review {
  movie_id: string;
  rating: number;
}

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch movies
      const { data: moviesData, error: moviesError } = await supabase
        .from("movies")
        .select("*")
        .order("release_year", { ascending: false });

      if (moviesError) throw moviesError;

      // Fetch reviews
      const { data: reviewsData, error: reviewsError } = await supabase
        .from("reviews")
        .select("movie_id, rating");

      if (reviewsError) throw reviewsError;

      setMovies(moviesData || []);
      setReviews(reviewsData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateMovieStats = (movieId: string) => {
    const movieReviews = reviews.filter((r) => r.movie_id === movieId);
    const reviewCount = movieReviews.length;
    const overallRating =
      reviewCount > 0
        ? movieReviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
        : 0;

    return { overallRating, reviewCount };
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Film className="mx-auto h-12 w-12 animate-pulse text-primary" />
          <p className="mt-4 text-muted-foreground">Loading movies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Film className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">CineReview</h1>
          </div>
          <p className="mt-2 text-muted-foreground">
            Discover and review the greatest films of all time
          </p>
        </div>
      </header>

      {/* Movie Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">Featured Movies</h2>
          <p className="mt-1 text-muted-foreground">
            Browse our curated collection
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {movies.map((movie) => {
            const { overallRating, reviewCount } = calculateMovieStats(movie.id);
            return (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                releaseYear={movie.release_year}
                posterUrl={movie.poster_url || undefined}
                overallRating={overallRating}
                reviewCount={reviewCount}
              />
            );
          })}
        </div>

        {movies.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No movies available yet.</p>
          </div>
        )}
      </main>
    </div>
  );
}
