'use client';

import React from 'react';
import { PostEditor } from '@/components/forms/post-editor';
import { PostList } from './post-list';

export function FeedClient() {
  return (
    <div className="space-y-[26px]">
      <PostEditor />
      <PostList />
    </div>
  );
}
