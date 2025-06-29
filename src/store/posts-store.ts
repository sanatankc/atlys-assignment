import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PostsState, Post } from '@/types';
import { useAuthStore } from './auth-store';


export const emojis = [
  '🤔',
  '👍',
  '💀',
  '🤯',
  '🤩',
  '🤗',
  '🤑',
]

const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: {
      id: 'theresa',
      email: 'theresa@example.com',
      username: 'Theresa Webb',
    },
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    emoji: '🤔',
  },
  {
    id: '2',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: {
      id: 'john',
      email: 'john@example.com',
      username: 'John Doe',
    },
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    emoji: '👍',
  },
  {
    id: '3',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author: {
      id: 'jane',
      email: 'jane@example.com',
      username: 'Jane Doe',
    },
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    emoji: '💀',
  },
];

export const usePostsStore = create<PostsState>()(
  persist(
    (set, get) => ({
      posts: INITIAL_POSTS,
      isSubmitting: false,

      addPost: async (content: string, emoji?: string | null) => {
        const { user } = useAuthStore.getState();
        if (!user) return;

        set({ isSubmitting: true });
        if (!emoji) {
          emoji = emojis[Math.floor(Math.random() * emojis.length)];
        }
        
        // Simulate API call
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
