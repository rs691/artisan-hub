// src/components/Layout/Navbar.tsx
'use client';

import { createClient } from '@/utils/supabase/client'; // Your Supabase client setup
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Use useRouter from next/navigation for App Router
import { useEffect, useState } from 'react';
import { ThemeSwitcher } from '../theme-switcher';
import { Button } from './button';


export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
     const supabase = createClient();
    // Check current session
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    checkUser();

    // Listen for auth state changes
    const { data: authListener }: {
      data: {
        subscription: {
          unsubscribe: () => void;
        };
        // The actual type returned by supabaseClient.auth.onAuthStateChange
        // is { subscription: SupabaseAuthListener }
      };
    } = createClient().auth.onAuthStateChange(
      (_event: string, session: { user: User | null } | null) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
     const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
      // Optionally show a toast here
    } else {
      toast({
        title: "Logged out!",
        description: "You have been successfully logged out.",
        variant: "default",
      });
      router.push('/'); // Redirect to homepage after logout
    }
  };

  // Assuming you have a toast hook, if not, remove or mock it
  type ToastParams = {
    title: string;
    description: string;
    variant: string;
  };
  const toast = ({ title, description, variant }: ToastParams) => {
    console.log(`Toast: ${title} - ${description} (${variant})`);
  };

  return (
    <nav className="bg-primary/50 text-primary-foreground p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold font-headline hover:text-accent transition-colors">
          Steffens Sign & Design
        </Link>

        <div className="flex items-center space-x-4">
          {/* Main Navigation Links */}
          <Link href="/shop" className="hover:text-accent transition-colors">Shop</Link>
          <Link href="/gallery" className="hover:text-accent transition-colors">Gallery</Link>

          {/* Conditional Auth Links */}
          {user ? (
            <>
              {/* Admin Link (only visible if user is logged in) */}
              {/* For true admin access, you'd check user roles/metadata here */}
              <Link href="/admin" className="hover:text-accent transition-colors">Admin Panel</Link>
              <Button variant="outline" onClick={handleLogout} className="text-primary-foreground hover:bg-primary/70">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" asChild className="text-primary-foreground hover:bg-primary/70">
                <Link href="/login">Login</Link>
              </Button>
              <Button variant="outline" asChild className="text-primary-foreground hover:bg-primary/70">
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}

          {/* Theme Switcher */}
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}