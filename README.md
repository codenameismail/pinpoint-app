# Pin Point

A beautiful React Native app for saving and managing your favorite places. Capture memories with photos, mark locations on interactive maps, and organize your special spots—all with a sleek, modern interface.

<!-- ![Pin Point Screenshot](assets/images/screenshot.png) -->

## Features

✨ **Modern UI** - Built with NativeWind (Tailwind CSS for React Native)  
🔐 **Secure Authentication** - Sign up and login with Supabase  
📍 **Interactive Maps** - Pick locations or use your current position  
📷 **Photo Upload** - Capture or select images, stored securely in the cloud  
💾 **Persistent Storage** - Your favorites are saved online and offline  
🎯 **Location Services** - GPS integration for precise location marking

## Tech Stack

- **React Native** with Expo SDK 54
- **Supabase** for authentication and cloud storage
- **Zustand** for state management
- **NativeWind** for styling (Tailwind CSS)
- **React Native Maps** for interactive maps
- **Expo Camera, Location, Media Library**

## Screenshots

_Add screenshots here when ready_

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- iOS Simulator or Android Emulator (or physical device)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/pin-point.git
   cd pin-point
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` with your Supabase credentials:

   ```
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase Database**

   Run this SQL in your Supabase SQL Editor:

   ```sql
   -- Create favorites table
   create table public.favorites (
     id uuid default gen_random_uuid() primary key,
     user_id uuid references auth.users(id) on delete cascade not null,
     title text not null,
     description text,
     image_uri text,
     location jsonb,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

   -- Enable RLS
   alter table public.favorites enable row level security;

   -- Create policies
   create policy "Users can view own favorites" on public.favorites
     for select using (auth.uid() = user_id);

   create policy "Users can insert own favorites" on public.favorites
     for insert with check (auth.uid() = user_id);

   create policy "Users can delete own favorites" on public.favorites
     for delete using (auth.uid() = user_id);
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── store/         # Zustand state management
├── utils/         # Utility functions
├── data/          # Static data and constants
└── app/           # Expo Router pages
```

## Key Features Implemented

- **Authentication Flow**: Complete sign-up/sign-in with Supabase
- **Image Management**: Camera integration with cloud storage
- **Map Integration**: Interactive location picking
- **State Management**: Zustand stores for favorites and drafts
- **Offline Support**: AsyncStorage for local data persistence
- **Form Validation**: Input validation with error handling

## What I Learned

This project was built as a learning exercise to master React Native development. Key concepts explored:

- Modern React Native with Expo
- State management with Zustand
- Authentication and real-time databases with Supabase
- Mobile-specific features (camera, location, maps)
- Styling with NativeWind/Tailwind CSS
- File uploads and cloud storage

## Future Enhancements

- [ ] Reverse geocoding for automatic address lookup
- [ ] Social sharing features
- [ ] Favorites categorization
- [ ] Offline map caching
- [ ] Push notifications for location reminders

---

Built with ❤️ as a React Native learning project
