# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/348c0893-f047-4ed5-8aa3-25065353da22

## App Description

Movie Muse is a full-stack web application that allows users to submit and browse movie reviews. Users can rate movies, write detailed reviews, and view all submitted reviews in a clean, intuitive interface. The application demonstrates modern web development practices with real-time database integration.

## Features

- ✨ Submit movie reviews with ratings (1-5 stars)
- 📝 Add detailed review text and personal comments
- 🎬 Store movie information (title, genre, release year)
- 📊 View all submitted reviews in an organized list
- 🔥 Real-time data persistence with Firebase/Supabase
- 📱 Responsive design that works on all devices
- 🎨 Modern UI built with React and Tailwind CSS

## Database Schema

The application uses the following database structure:

**Reviews Collection/Table:**
- `id` - Unique identifier (auto-generated)
- `movieTitle` - String (movie name)
- `genre` - String (action, comedy, drama, etc.)
- `releaseYear` - Number (year of release)
- `rating` - Number (1-5 stars)
- `reviewText` - Text (user's review)
- `reviewerName` - String (name of the person reviewing)
- `createdAt` - Timestamp (when review was submitted)


## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/348c0893-f047-4ed5-8aa3-25065353da22) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/348c0893-f047-4ed5-8aa3-25065353da22) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)


