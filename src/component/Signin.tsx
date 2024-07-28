'use client';
import { signIn } from 'next-auth/react'; 
import { Button } from '@/components/ui/button';
import React from 'react';

const SignIn: React.FC = () => {
  const handleSignIn = async () => {
    // Initiate sign-in with Google and specify a callback URL
    await signIn('google', { callbackUrl: 'http://localhost:3000/api/auth/register' });
  };

  return (
    <form onSubmit={async (event) => {
      event.preventDefault();
      await handleSignIn();
    }}>
      <Button type="submit">Sign In</Button>
    </form>
  );
};

export default SignIn;
