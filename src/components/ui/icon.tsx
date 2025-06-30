'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

import logoIcon from '@/icons/logo.svg';
import trashIcon from '@/icons/trash.svg';
import scriptIcon from '@/icons/script.svg';
import quotesIcon from '@/icons/quotes.svg';
import listOrderedIcon from '@/icons/list-ordered.svg';
import listUnorderedIcon from '@/icons/list-unordered.svg';
import textUnderlineIcon from '@/icons/text-underline.svg';
import textItalicIcon from '@/icons/text-italic.svg';
import chevronDownIcon from '@/icons/chevron-down.svg';
import textBoldIcon from '@/icons/text-bold.svg';
import emotionSmileIcon from '@/icons/emotion-smile.svg';
import videoCameraIcon from '@/icons/video-camera.svg';
import micIcon from '@/icons/mic.svg';
import plusIcon from '@/icons/plus.svg';
import sendIcon from '@/icons/send.svg';
import commentIcon from '@/icons/comment.svg';
import heartIcon from '@/icons/heart.svg';
import loginIcon from '@/icons/login.svg';
import logoutIcon from '@/icons/logout.svg';
import postIcon from '@/icons/post.svg';

const iconFiles: Record<string, string> = {
  'logo': logoIcon,
  'trash': trashIcon,
  'script': scriptIcon,
  'quotes': quotesIcon,
  'list-ordered': listOrderedIcon,
  'list-unordered': listUnorderedIcon,
  'text-underline': textUnderlineIcon,
  'text-italic': textItalicIcon,
  'chevron-down': chevronDownIcon,
  'text-bold': textBoldIcon,
  'emotion-smile': emotionSmileIcon,
  'video-camera': videoCameraIcon,
  'mic': micIcon,
  'plus': plusIcon,
  'send': sendIcon,
  'post': postIcon,
  'comment': commentIcon,
  'heart': heartIcon,
  'login': loginIcon,
  'logout': logoutIcon,
};



interface IconProps {
  name: string;
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
  size?: number;
}

export function Icon({ 
  name, 
  className = "", 
  width, 
  height, 
  alt, 
  size
}: IconProps) {
  const finalWidth = size || width || 24;
  const finalHeight = size || height || 24;

  const iconFile = iconFiles[name];
  
  if (iconFile) {
    return (
      <Image
        src={iconFile}
        alt={alt || name}
        width={finalWidth}
        height={finalHeight}
        className={cn("inline-flex", className)}
      />
    );
  }

  console.warn(`Icon "${name}" not found`);
  return null;
} 