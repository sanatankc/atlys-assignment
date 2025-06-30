import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { AuthModal } from '@/components/layout/auth-modal';
import logo from '@/assets/logo.ico';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'foo-rum | Community Forum',
  description: 'Share your thoughts and connect with others',
  openGraph: {
    title: 'foo-rum',
    description: 'Community Forum',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href={logo.src} sizes="any" />
      <body className={`${inter.className} bg-gray-50`}>
        <Header />
        {children}
        <AuthModal />
      </body>
    </html>
  );
}
