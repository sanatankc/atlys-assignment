'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAuthStore } from '@/store/auth-store';
import { usePostsStore } from '@/store/posts-store';
import { useUIStore } from '@/store/ui-store';
import { postSchema } from '@/lib/validations';
import { cn } from '@/lib/utils';
import { useRouter, usePathname } from 'next/navigation';

interface PostForm {
  content: string;
}

// Icon component to render SVG icons
const Icon = ({ name, className = "" }: { name: string; className?: string }) => {
  const iconPaths: { [key: string]: React.ReactElement } = {
    'chevron-down': (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 3.75L5 6.25L7.5 3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'text-bold': (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.33331 7L9.04165 7C10.4914 7 11.6666 8.17525 11.6666 9.625V9.625C11.6666 11.0747 10.4914 12.25 9.04165 12.25L3.37035 12.25C2.79761 12.25 2.33331 11.7857 2.33331 11.213L2.33331 7ZM2.33331 7L7.29165 7C8.7414 7 9.91665 5.82475 9.91665 4.375V4.375C9.91665 2.92525 8.74139 1.75 7.29165 1.75L3.17591 1.75C2.71055 1.75 2.33331 2.12724 2.33331 2.59259L2.33331 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'text-italic': (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.24984 1.75005L11.0832 1.75005M2.9165 12.25L8.74984 12.25M8.16651 1.75005L5.83317 12.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'text-underline': (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.49988 12.25L10.4999 12.25M10.4999 1.75002L10.4999 6.41668C10.4999 8.34968 8.93288 9.91668 6.99988 9.91668C5.06688 9.91668 3.49988 8.34968 3.49988 6.41668L3.49988 1.75002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'list-unordered': (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.2501 11.6668L12.8334 11.6668M5.2501 7.00011L12.8334 7.00011M5.2501 2.33344L12.8334 2.33344M2.04177 2.33345C2.04177 2.49453 1.91118 2.62511 1.7501 2.62511C1.58902 2.62511 1.45844 2.49453 1.45844 2.33345M2.04177 2.33345C2.04177 2.17236 1.91118 2.04178 1.7501 2.04178C1.58902 2.04178 1.45844 2.17236 1.45844 2.33345M2.04177 2.33345L1.45844 2.33345M2.04177 7.00011C2.04177 7.16119 1.91118 7.29178 1.7501 7.29178C1.58902 7.29178 1.45844 7.16119 1.45844 7.00011M2.04177 7.00011C2.04177 6.83903 1.91118 6.70844 1.7501 6.70844C1.58902 6.70844 1.45844 6.83903 1.45844 7.00011M2.04177 7.00011L1.45844 7.00011M2.04177 11.6668C2.04177 11.8279 1.91118 11.9584 1.7501 11.9584C1.58902 11.9584 1.45844 11.8279 1.45844 11.6668M2.04177 11.6668C2.04177 11.5057 1.91118 11.3751 1.7501 11.3751C1.58902 11.3751 1.45844 11.5057 1.45844 11.6668M2.04177 11.6668L1.45844 11.6668" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'list-ordered': (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.25008 11.6667L12.8334 11.6667M5.25008 7.00008L12.8334 7.00008M5.25008 2.33341L12.8334 2.33341M2.04175 4.66674L2.04175 1.75008L1.16675 2.33337M2.04175 4.66674L1.16675 4.66674M2.04175 4.66674L2.91675 4.66671M1.16689 8.75008L2.91689 8.75008L2.91675 10.2084L1.16675 10.2084L1.16675 11.6667L2.91689 11.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'quotes': (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.83335 4.66666V7.72916C5.83335 9.10623 5.185 10.4029 4.08335 11.2292V11.2292L3.50002 11.6667M12.8334 4.66666V7.72916C12.8334 9.10623 12.185 10.4029 11.0834 11.2292V11.2292L10.5 11.6667M10.5 7V7C10.8096 7 10.9644 7 11.0944 6.98288C11.9919 6.86473 12.6981 6.15851 12.8162 5.26105C12.8334 5.13108 12.8334 4.97628 12.8334 4.66666V4.66666C12.8334 4.35705 12.8334 4.20224 12.8162 4.07228C12.6981 3.17481 11.9919 2.46859 11.0944 2.35044C10.9644 2.33333 10.8096 2.33333 10.5 2.33333V2.33333C10.1904 2.33333 10.0356 2.33333 9.90563 2.35044C9.00817 2.46859 8.30195 3.17481 8.1838 4.07228C8.16669 4.20224 8.16669 4.35705 8.16669 4.66666V4.66666C8.16669 4.97628 8.16669 5.13108 8.1838 5.26105C8.30195 6.15851 9.00817 6.86473 9.90563 6.98288C10.0356 7 10.1904 7 10.5 7ZM3.50002 7V7C3.80963 7 3.96444 7 4.09441 6.98288C4.99187 6.86473 5.69809 6.15851 5.81624 5.26105C5.83335 5.13108 5.83335 4.97628 5.83335 4.66666V4.66666C5.83335 4.35705 5.83335 4.20224 5.81624 4.07228C5.69809 3.17481 4.99187 2.46859 4.09441 2.35044C3.96444 2.33333 3.80963 2.33333 3.50002 2.33333V2.33333C3.19041 2.33333 3.0356 2.33333 2.90563 2.35044C2.00817 2.46859 1.30195 3.17481 1.1838 4.07228C1.16669 4.20224 1.16669 4.35705 1.16669 4.66666V4.66666C1.16669 4.97628 1.16669 5.13108 1.1838 5.26105C1.30195 6.15851 2.00817 6.86473 2.90563 6.98288C3.0356 7 3.19041 7 3.50002 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'script': (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.50002 4.66667L1.16669 7L3.50002 9.33333M10.5 4.66667L12.8334 7L10.5 9.33333M8.16669 1.75L5.83335 12.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'trash': (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.66665 3.33333L3.05928 10.0081C3.1084 10.8432 3.13296 11.2607 3.21785 11.6104C3.591 13.1474 4.83483 14.3202 6.39113 14.6025C6.74514 14.6667 7.16342 14.6667 7.99998 14.6667V14.6667C8.83654 14.6667 9.25482 14.6667 9.60883 14.6025C11.1651 14.3202 12.409 13.1474 12.7821 11.6104C12.867 11.2607 12.8916 10.8432 12.9407 10.008L13.3333 3.33333M2.66665 3.33333H1.33331M2.66665 3.33333H13.3333M13.3333 3.33333H14.6666M10.6666 3.33333L10.547 2.97438C10.3503 2.38427 10.2519 2.08921 10.0695 1.87106C9.90842 1.67843 9.70154 1.52932 9.46785 1.43741C9.20321 1.33333 8.89219 1.33333 8.27016 1.33333H7.7298C7.10777 1.33333 6.79675 1.33333 6.53211 1.43741C6.29842 1.52932 6.09154 1.67843 5.93045 1.87106C5.74802 2.08921 5.64967 2.38427 5.45296 2.97438L5.33331 3.33333M6.66665 6.66666V11.3333M9.33331 6.66666V9.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'plus': (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.75 9H9M14.25 9H9M9 9V3.75M9 9V14.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'mic': (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 14.25C11.5714 14.25 15 12 15 8.25M9 14.25C6.42857 14.25 3 12 3 8.25M9 14.25V16.5M9 12C6.92893 12 5.25 10.3211 5.25 8.25V5.25C5.25 3.17893 6.92893 1.5 9 1.5C11.0711 1.5 12.75 3.17893 12.75 5.25V8.25C12.75 10.3211 11.0711 12 9 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'video-camera': (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 6.375C10.5 6.58211 10.3321 6.75 10.125 6.75C9.9179 6.75 9.75 6.58211 9.75 6.375M10.5 6.375C10.5 6.16789 10.3321 6 10.125 6C9.9179 6 9.75 6.16789 9.75 6.375M10.5 6.375L9.75 6.375M14.25 11.2501V11.2501C14.7614 11.6336 15.0171 11.8254 15.2122 11.9003C16.0352 12.2164 16.952 11.758 17.1929 10.91C17.25 10.709 17.25 10.3893 17.25 9.75006L17.25 8.25004C17.25 7.61077 17.25 7.29113 17.1929 7.09017C16.952 6.24209 16.0351 5.78367 15.2121 6.0998C15.0171 6.17471 14.7614 6.3665 14.25 6.75007V6.75007L14.25 11.2501ZM7.5 15.75V15.75C9.12773 15.75 9.94159 15.75 10.6072 15.5623C12.2815 15.0901 13.5901 13.7815 14.0623 12.1072C14.25 11.4416 14.25 10.6277 14.25 9V9C14.25 7.37228 14.25 6.55842 14.0623 5.8928C13.5901 4.21847 12.2815 2.90993 10.6072 2.43772C9.94159 2.25 9.12773 2.25 7.5 2.25V2.25C5.87228 2.25 5.05842 2.25 4.3928 2.43772C2.71847 2.90993 1.40993 4.21847 0.937724 5.8928C0.75 6.55842 0.75 7.37228 0.75 9V9C0.75 10.6277 0.75 11.4416 0.937724 12.1072C1.40993 13.7815 2.71847 15.0901 4.3928 15.5623C5.05842 15.75 5.87228 15.75 7.5 15.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'emotion-smile': (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.125 7.5C7.125 7.70711 6.95711 7.875 6.75 7.875C6.54289 7.875 6.375 7.70711 6.375 7.5M7.125 7.5C7.125 7.29289 6.95711 7.125 6.75 7.125C6.54289 7.125 6.375 7.29289 6.375 7.5M7.125 7.5H6.375M11.625 7.5C11.625 7.70711 11.4571 7.875 11.25 7.875C11.0429 7.875 10.875 7.70711 10.875 7.5M11.625 7.5C11.625 7.29289 11.4571 7.125 11.25 7.125C11.0429 7.125 10.875 7.29289 10.875 7.5M11.625 7.5H10.875M12.0002 11.25C11.316 12.1608 10.2268 12.75 8.99991 12.75C7.77304 12.75 6.68379 12.1608 5.99963 11.25M9 16.5V16.5C13.1421 16.5 16.5 13.1421 16.5 9V9C16.5 4.85786 13.1421 1.5 9 1.5V1.5C4.85786 1.5 1.5 4.85786 1.5 9V9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'send': (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_1_373)">
          <path d="M8.25 9.75L8.53457 10.4899C9.5894 13.2326 10.1168 14.6039 10.825 14.9489C11.4376 15.2472 12.1598 15.2132 12.7416 14.8586C13.4143 14.4486 13.8104 13.0338 14.6028 10.2041L15.716 6.22824C16.2177 4.43672 16.4685 3.54096 16.2357 2.92628C16.0327 2.39035 15.6096 1.96724 15.0737 1.76427C14.459 1.53147 13.5633 1.78228 11.7718 2.28391L7.79584 3.39716C4.96617 4.18947 3.55133 4.58563 3.14136 5.25828C2.78678 5.84005 2.75275 6.56231 3.05106 7.17484C3.39597 7.88306 4.76729 8.41049 7.50993 9.46536L8.25 9.75ZM8.25 9.75L10.125 7.875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
          <clipPath id="clip0_1_373">
            <rect width="18" height="18" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    ),
  };

  return (
    <span className={cn("inline-flex items-center justify-center", className)}>
      {iconPaths[name] || null}
    </span>
  );
};

const EMOJI_OPTIONS = ['💭', '🤔', '👍', '😍', '😢', '😡', '💀'];

export function PostEditor() {
  const user = useAuthStore(state => state.user);
  const addPost = usePostsStore(state => state.addPost);
  const isSubmitting = usePostsStore(state => state.isSubmitting);
  const openAuthModal = useUIStore(state => state.openAuthModal);
  const router = useRouter();
  const pathname = usePathname();
  
  const [selectedEmoji, setSelectedEmoji] = React.useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<PostForm>({
    resolver: zodResolver(postSchema),
  });

  const content = watch('content', '');

  const requireAuth = (action: () => void) => {
    if (!user) {
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

  const onSubmit = async (data: PostForm) => {
    if (!user) return;
    
    await addPost(data.content, selectedEmoji);
    reset();
    setSelectedEmoji(null);
  };

  const handleNotImplemented = () => {
    alert('Function not implemented');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Format toolbar */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            {/* Paragraph dropdown */}
            <div className="relative">
              <select className="appearance-none px-3 py-2 pr-8 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 cursor-pointer focus:outline-none focus:border-gray-300 min-w-[100px]">
                <option>Paragraph</option>
              </select>
              <Icon name="chevron-down" className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-3 h-3" />
            </div>
            
            {/* Text formatting buttons */}
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={() => requireAuth(handleNotImplemented)}
                className="p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors w-8 h-8 flex items-center justify-center"
                title="Bold"
              >
                <Icon name="text-bold" className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => requireAuth(handleNotImplemented)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors w-8 h-8 flex items-center justify-center"
                title="Italic"
              >
                <Icon name="text-italic" className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => requireAuth(handleNotImplemented)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors w-8 h-8 flex items-center justify-center"
                title="Underline"
              >
                <Icon name="text-underline" className="w-3.5 h-3.5" />
              </button>
            </div>
            
            {/* List buttons */}
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={() => requireAuth(handleNotImplemented)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors w-8 h-8 flex items-center justify-center"
                title="Bullet List"
              >
                <Icon name="list-unordered" className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => requireAuth(handleNotImplemented)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors w-8 h-8 flex items-center justify-center"
                title="Numbered List"
              >
                <Icon name="list-ordered" className="w-3.5 h-3.5" />
              </button>
            </div>
            
            {/* Quote and code buttons */}
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={() => requireAuth(handleNotImplemented)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors w-8 h-8 flex items-center justify-center"
                title="Quote"
              >
                <Icon name="quotes" className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => requireAuth(handleNotImplemented)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors w-8 h-8 flex items-center justify-center"
                title="Code"
              >
                <Icon name="script" className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          {/* Trash button */}
          <button
            type="button"
            onClick={() => requireAuth(handleNotImplemented)}
            className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-md transition-colors w-8 h-8 flex items-center justify-center"
            title="Delete"
          >
            <Icon name="trash" className="w-4 h-4" />
          </button>
        </div>

        {/* Text area */}
        <div className="relative py-2">
          <div className="flex items-start gap-4">
            {user ? (
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="mt-2 hover:scale-110 transition-transform cursor-pointer p-2"
                  >
                    {selectedEmoji ? (
                      <span className="text-2xl">{selectedEmoji}</span>
                    ) : (
                      <Icon name="emotion-smile" className="w-6 h-6 text-gray-500" />
                    )}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-3 bg-white border border-gray-200 shadow-lg" align="start">
                  <div className="grid grid-cols-3 gap-2">
                    {EMOJI_OPTIONS.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setSelectedEmoji(emoji)}
                        className={cn(
                          'w-10 h-10 text-lg hover:bg-gray-100 rounded-md transition-all duration-200 flex items-center justify-center',
                          selectedEmoji === emoji && 'bg-blue-100 border border-blue-300 shadow-sm'
                        )}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <button
                type="button"
                className="mt-2 hover:scale-110 transition-transform cursor-pointer p-2"
                onClick={() => requireAuth(() => {})}
              >
                <Icon name="emotion-smile" className="w-6 h-6 text-gray-500" />
              </button>
            )}
            <div className="flex-1">
              <textarea
                {...register('content')}
                placeholder="How are you feeling today?"
                className="w-full min-h-[100px] p-0 border-none resize-none placeholder-gray-400 text-gray-700 focus:outline-none text-base leading-relaxed"
                onClick={() => requireAuth(() => {})}
              />
              {errors.content && (
                <p className="text-sm text-red-600 mt-1">{errors.content.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom toolbar */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => requireAuth(handleNotImplemented)}
              className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors w-10 h-10 flex items-center justify-center"
              title="Add attachment"
            >
              <Icon name="plus" className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => requireAuth(handleNotImplemented)}
              className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors w-10 h-10 flex items-center justify-center"
              title="Voice recording"
            >
              <Icon name="mic" className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => requireAuth(handleNotImplemented)}
              className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors w-10 h-10 flex items-center justify-center"
              title="Video camera"
            >
              <Icon name="video-camera" className="w-4 h-4" />
            </button>
          </div>
          
          <button
            type="submit"
            disabled={!content.trim() || !user || isSubmitting}
            onClick={() => !user && requireAuth(() => {})}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-lg flex items-center justify-center transition-colors min-w-[44px] h-10"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Icon name="send" className="w-4 h-4" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
