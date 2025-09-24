# Pin Point

Pin Point is a modern React Native app for saving and managing your favorite places. Capture memories, attach photos, and mark locations on a map—all in a beautifully designed, mobile-first experience.

<!-- ![Pin Point Screenshot](assets/images/screenshot.png) -->

## Features

- **Sign Up & Login**: Secure authentication with Supabase.
- **Add Favorites**: Save places with title, description, image, and location.
- **Map Integration**: Pick locations via interactive map or use your current location.
- **Image Uploads**: Capture photos or select from gallery, stored securely in the cloud.
- **Persistent Storage**: Favorites are saved online and offline.
- **Responsive UI**: Clean, modern design with NativeWind (Tailwind CSS for React Native).

## Tech Stack

- [React Native](https://reactnative.dev/) (with Expo)
- [Supabase](https://supabase.com/) (Auth & Storage)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) (State Management)
- [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- [React Native Maps](https://github.com/react-native-maps/react-native-maps)
- [Expo Camera, Location, Media Library](https://docs.expo.dev/versions/latest/)

## Getting Started

1. **Clone the repo**  
   `git clone https://github.com/yourusername/pin-point.git`

2. **Install dependencies**  
   `npm install`

3. **Set up environment variables**  
   Create a `.env` file with your Supabase credentials:

   ```
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the app**  
   `npm start`

## Why Pin Point?

I built Pin Point as a learning project to master React Native, but also to create something genuinely useful and beautiful. It’s more than a demo—it's a polished, functional app that showcases best practices in mobile development.

## License

[MIT](LICENSE)
