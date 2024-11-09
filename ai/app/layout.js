import {
  ClerkProvider,
} from '@clerk/nextjs'
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from '../components/ui/sonner';  // Toaster component for notifications
import Navbar from "./dashboard/_compo/Navbar";     // Navbar component

// Font setup
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "SkillSync.AI",
  description: "Full stack AI powered decentralized platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`bg-gradient-to-b from-black to-gray-800 min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}>
          {/* Navbar component */}
          <Navbar />
          
          {/* Render the children content */}
          {children}
          
          {/* Toaster component for notifications */}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
