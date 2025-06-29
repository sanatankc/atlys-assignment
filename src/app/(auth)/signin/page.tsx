import React from 'react';
import { SignInForm } from '@/components/forms/signin-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | foo-rum',
  description: 'Sign in to your account',
};

export default function SignInPage() {
  return (
    <div className='w-full flex flex-row items-center justify-center'>
      <SignInForm />
    </div>
  );
}
