'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/auth-store';
import { useUIStore } from '@/store/ui-store';
import type { Post } from '@/types';
import { Icon } from '@/components/ui/icon';
import { useTimeAgo } from '@/hooks/use-time-ago';

interface PostCardProps {
  post: Post;
  index: number;
}

export function PostCard({ post, index }: PostCardProps) {
  const user = useAuthStore(state => state.user);
  const openAuthModal = useUIStore(state => state.openAuthModal);
  const timeAgo = useTimeAgo(post.timestamp);

  const requireAuth = (action: () => void) => {
    if (!user) {
      openAuthModal('signin');
      return;
    }
    action();
  };

  const handleNotImplemented = () => {
    alert('Function not implemented');
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      layout
      transition={{ delay: index * 0.1, layout: { duration: 0.3, ease: "easeInOut" } }}
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
                <p className="text-[12px] text-black/40">{timeAgo}</p>
              </div>
            </div>
            
            
           
          </div>
        </div>
        <div className="flex items-start gap-[13px] pt-[4px]">
          <div className='rounded-full p-[2px] px-[6px] bg-[#F2F2F2]'>
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
          <Icon name="heart" size={18} />
        </button>
        
        <button
          onClick={() => requireAuth(handleNotImplemented)}
          className="flex items-center gap-2 w-[18px] h-[18px] text-gray-500 hover:text-blue-500 transition-colors"
        >
          <Icon name="comment" size={18} />
        </button>
        
        <button
          onClick={() => requireAuth(handleNotImplemented)}
          className="flex items-center gap-2 w-[18px] h-[18px] text-gray-500 hover:text-green-500 transition-colors"
        >
          <Icon name="send" size={18} />
        </button>
      </div>
    </motion.article>
  );
}
