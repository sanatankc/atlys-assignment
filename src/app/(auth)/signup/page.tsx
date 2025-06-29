import React from 'react';
import { SignUpForm } from '@/components/forms/signup-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up | foo-rum',
  description: 'Create your account',
};

export default function SignUpPage() {
  return (
    <div className='w-full flex flex-row items-center justify-center'>
        <SignUpForm />
    </div>
  );
}
