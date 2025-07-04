'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { PostCard } from './post-card';
import { usePostsStore } from '@/store/posts-store';

export function PostList() {
  const posts = usePostsStore(state => state.posts);

  return (
    <div className="space-y-[18px]">
      <AnimatePresence>
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </AnimatePresence>
    </div>
  );
}
