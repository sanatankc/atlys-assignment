'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthFormLayout } from './auth-form-layout';
import { useAuthStore } from '@/store/auth-store';
import { useUIStore } from '@/store/ui-store';
import { signUpSchema } from '@/lib/validations';
import type { SignUpCredentials } from '@/types';

export function SignUpForm() {
  const router = useRouter();
  const pathname = usePathname();
  const register = useAuthStore(state => state.register);
  const isLoading = useAuthStore(state => state.isLoading);
  const closeAuthModal = useUIStore(state => state.closeAuthModal);
  const openAuthModal = useUIStore(state => state.openAuthModal);
  
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpCredentials>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpCredentials) => {
    const success = await register(data);
    
    if (success) {
      closeAuthModal();
      router.push('/');
    } else {
      setError('root', { message: 'Account with this email already exists' });
    }
  };

  const footer = (
    <p className="text-center text-sm text-black/60">
      Already have an account?{' '}
      {pathname === '/signup' ? (
        <Link href="/signin" className="text-[#4A63FF] hover:text-[#3B52E6] font-medium">
          Sign In
        </Link>
      ) : (
        <button 
          onClick={() => openAuthModal('signin')}
          className="text-[#4A63FF] hover:text-[#3B52E6] font-medium"
        >
          Sign In
        </button>
      )}
    </p>
  );

  return (
    <AuthFormLayout
      title="Create an account to continue"
      subtitle="Create an account to access all the features on this app"
      footer={footer}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email or username"
          placeholder="Enter your email or username"
          {...registerField('emailOrUsername')}
          error={errors.emailOrUsername?.message}
        />
        
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          {...registerField('password')}
          error={errors.password?.message}
        />

        <Input
          label="Repeat password"
          type="password"
          placeholder="Enter your password again"
          {...registerField('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        {errors.root && (
          <p className="text-sm text-red-600 text-center">{errors.root.message}</p>
        )}

        <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
          Sign Up
        </Button>
      </form>
    </AuthFormLayout>
  );
}
