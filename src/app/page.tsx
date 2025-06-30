import React from 'react';
import { FeedClient } from '@/components/feed/feed-client';

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-[600px]">
      <FeedClient />
    </main>
  );
}
