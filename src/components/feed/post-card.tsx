'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/auth-store';
import { useUIStore } from '@/store/ui-store';
import type { Post } from '@/types';
import Image from 'next/image';
import heart from '@/icons/heart.svg';
import comment from '@/icons/comment.svg';
import send from '@/icons/send.svg';
import { useRouter, usePathname } from 'next/navigation';

interface PostCardProps {
  post: Post;
  index: number;
}

export function PostCard({ post, index }: PostCardProps) {
  const user = useAuthStore(state => state.user);
  const openAuthModal = useUIStore(state => state.openAuthModal);
  const router = useRouter();
  const pathname = usePathname();

  const requireAuth = (action: () => void) => {
    if (!user) {
      // If already on auth page, don't open modal, just redirect
      const isOnAuthPage = pathname.includes('/signin') || pathname.includes('/signup');
      if (isOnAuthPage) {
        router.push('/signin');
      } else {
        openAuthModal('signin');
      }
      return;
    }
    action();
  };

  const handleNotImplemented = () => {
    alert('Function not implemented');
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - postTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} mins ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-[rgba(0,0,0,0.03)] rounded-[21px] p-[7px]"
    >
      <div className='bg-white border border-black/10 shadow-[0_4px_9px_rgba(0,0,0,0.05)] rounded-[18px] p-[22px] pt-[13px] pl-[13px]'>
        <div className="flex items-start gap-[10px]">
          <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-[7px]">
            <span className="text-sm font-medium text-gray-600">
              {post.author.emailOrUsername.charAt(0).toUpperCase()}
            </span>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-bold text-black text-[13px]">{post.author.name || post.author.emailOrUsername}</h3>
                <p className="text-[12px] text-black/40">{formatTimeAgo(post.timestamp)}</p>
              </div>
            </div>
            
            
           
          </div>
        </div>
        <div className="flex items-start gap-[13px] pt-[4px]">
          <div className='rounded-full p-[5px] px-[9px] bg-[#F2F2F2]'>
            {post.emoji && (
              <span className="text-xl">{post.emoji}</span>
            )}
          </div>
          <p className="text-black/70 leading-[21px] text-[14px] font-medium">{post.content}</p>
        </div>
      </div>
      <div className="flex items-center gap-[27px] px-[15px] pt-[10px] pb-[5px]">
        <button
          onClick={() => requireAuth(handleNotImplemented)}
          className="flex items-center gap-2 w-[18px] h-[18px] text-gray-500 hover:text-red-500 transition-colors"
        >
          <Image className='w-full h-full' src={heart} alt='heart'></Image>
        </button>
        
        <button
          onClick={() => requireAuth(handleNotImplemented)}
          className="flex items-center gap-2 w-[18px] h-[18px] text-gray-500 hover:text-blue-500 transition-colors"
        >
          <Image className='w-full h-full' src={comment} alt='comment'></Image>
        </button>
        
        <button
          onClick={() => requireAuth(handleNotImplemented)}
          className="flex items-center gap-2 w-[18px] h-[18px] text-gray-500 hover:text-green-500 transition-colors"
        >
          <Image className='w-full h-full' src={send} alt='share'></Image>
        </button>
      </div>
    </motion.article>
  );
}
