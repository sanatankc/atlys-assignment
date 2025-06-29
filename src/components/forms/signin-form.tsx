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
import { signInSchema } from '@/lib/validations';
import type { AuthCredentials } from '@/types';

export function SignInForm() {
  const router = useRouter();
  const pathname = usePathname();
  const login = useAuthStore(state => state.login);
  const isLoading = useAuthStore(state => state.isLoading);
  const closeAuthModal = useUIStore(state => state.closeAuthModal);
  const openAuthModal = useUIStore(state => state.openAuthModal);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AuthCredentials>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: AuthCredentials) => {
    const success = await login(data);
    
    if (success) {
      closeAuthModal();
      router.push('/');
    } else {
      setError('root', { message: 'Invalid email or password' });
    }
  };

  const footer = (
    <p className="text-center text-sm text-black/60">
      Do not have an account?{' '}
      {pathname === '/signin' ? (
        <Link href="/signup" className="text-[#4A63FF] hover:text-[#3B52E6] font-medium">
          Sign Up
        </Link>
      ) : (
        <button 
          onClick={() => openAuthModal('signup')}
          className="text-[#4A63FF] hover:text-[#3B52E6] font-medium"
        >
          Sign Up
        </button>
      )}
    </p>
  );

  return (
    <AuthFormLayout
      title="Sign in to continue"
      subtitle="Sign in to access all the features on this app"
      footer={footer}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email or username"
          autoFocus={true}
          placeholder="Enter your email or username"
          {...register('emailOrUsername')}
          error={errors.emailOrUsername?.message}
        />
        
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          {...register('password')}
          error={errors.password?.message}
        />

        {errors.root && (
          <p className="text-sm text-red-600 text-center">{errors.root.message}</p>
        )}

        <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
          Sign In
        </Button>
      </form>
    </AuthFormLayout>
  );
}
