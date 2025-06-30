import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PostsState, Post } from '@/types';
import { useAuthStore } from './auth-store';
import { EMOJI_OPTIONS } from '@/lib/constants';

const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: {
      id: 'theresa',
      emailOrUsername: 'theresa@example.com',
      name: 'Theresa Webb',
    },
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    emoji: '🤔',
  },
  {
    id: '2',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: {
      id: 'john',
      emailOrUsername: 'john@example.com',
      name: 'John Doe',
    },
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    emoji: '👍',
  },
  {
    id: '3',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: {
      id: 'jane',
      emailOrUsername: 'jane@example.com',
      name: 'Jane Doe',
    },
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    emoji: '💀',
  },
];

export const usePostsStore = create<PostsState>()(
  persist(
    set => ({
      posts: INITIAL_POSTS,
      isSubmitting: false,

      addPost: async (content: string, emoji?: string | null) => {
        const { user } = useAuthStore.getState();
        if (!user) return;

        set({ isSubmitting: true });
        if (!emoji) {
          emoji = EMOJI_OPTIONS[Math.floor(Math.random() * EMOJI_OPTIONS.length)];
        }
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const newPost: Post = {
          id: Math.random().toString(36).substr(2, 9),
          content,
          emoji,
          author: user,
          timestamp: new Date().toISOString(),
        };

        set(state => ({
          posts: [newPost, ...state.posts],
          isSubmitting: false,
        }));
      },
    }),
    {
      name: 'posts-storage',
      partialize: (state) => ({ posts: state.posts }),
    }
  )
);
