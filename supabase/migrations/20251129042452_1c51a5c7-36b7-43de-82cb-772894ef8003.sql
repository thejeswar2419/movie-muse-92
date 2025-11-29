-- Create movies table for internal movie list
CREATE TABLE public.movies (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  release_year integer NOT NULL,
  description text NOT NULL,
  poster_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view movies
CREATE POLICY "Anyone can view movies"
ON public.movies
FOR SELECT
USING (true);

-- Insert initial movie data (8 popular movies for the MVP)
INSERT INTO public.movies (title, release_year, description, poster_url) VALUES
  ('The Shawshank Redemption', 1994, 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400'),
  ('The Godfather', 1972, 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400'),
  ('The Dark Knight', 2008, 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.', 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400'),
  ('Pulp Fiction', 1994, 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.', 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400'),
  ('Inception', 2010, 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.', 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400'),
  ('Interstellar', 2014, 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity survival.', 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400'),
  ('Parasite', 2019, 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.', 'https://images.unsplash.com/photo-1574267432644-f65bdc5a4c43?w=400'),
  ('Oppenheimer', 2023, 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.', 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400');