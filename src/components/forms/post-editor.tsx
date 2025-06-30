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
import { Icon } from '@/components/ui/icon';

interface PostForm {
  content: string;
}

const EMOJI_OPTIONS = ['💭', '🤔', '👍', '😍', '😢', '😡', '💀'];

interface EditorToolbarProps {
  onFormatAction: () => void;
  onDelete: () => void;
}

function EditorToolbar({ onFormatAction, onDelete }: EditorToolbarProps) {
  return (
    <div className="flex items-center justify-between pb-4 border-gray-100 p-[9px]">
      <div className="flex items-center p-1 h-full bg-[rgba(0,0,0,0.03)] rounded-[10px]">
        {/* Paragraph dropdown */}
        <div className="relative mr-[25px]">
          <select className="appearance-none px-3 py-2 pr-8 text-[12px] rounded-lg bg-white text-black/80 cursor-pointer focus:outline-none focus:border-gray-300 min-w-[100px]">
            <option>Paragraph</option>
          </select>
          <Icon name="chevron-down" className="absolute right-2.5 top-1/2 transform -translate-y-1/2  pointer-events-none w-3 h-3" />
        </div>
        
        {/* Text formatting buttons */}
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={onFormatAction}
            className={cn(
              "p-2 text-black/75 rounded-[7px] transition-colors w-8 h-8 flex items-center justify-center",
              // selected styles -- we can add this with a selected state toggle, 
              // if making these toolbars interactive later
              "bg-white hover:bg-gray-100 shadow-[0px_1px_7px_rgba(0,0,0,0.1)]"
            )}
            title="Bold"
          >
            <Icon name="text-bold" className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onFormatAction}
            className="p-2 text-black/54 hover:bg-gray-100 rounded-md transition-colors w-8 h-8 flex items-center justify-center"
            title="Italic"
          >
            <Icon name="text-italic" className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onFormatAction}
            className="p-2 text-black/54 hover:bg-gray-100 rounded-md transition-colors w-8 h-8 flex items-center justify-center"
            title="Underline"
          >
            <Icon name="text-underline" className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className='w-[1px] h-[32px] mx-2 bg-black/10'></div>

        {/* List buttons */}
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={onFormatAction}
            className="p-2 text-black/54 hover:bg-gray-100 rounded-md transition-colors w-8 h-8 flex items-center justify-center"
            title="Bullet List"
          >
            <Icon name="list-unordered" className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onFormatAction}
            className="p-2 text-black/54 hover:bg-gray-100 rounded-md transition-colors w-8 h-8 flex items-center justify-center"
            title="Numbered List"
          >
            <Icon name="list-ordered" className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className='w-[1px] h-[32px] mx-2 bg-black/10'></div>
        
        {/* Quote and code buttons */}
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={onFormatAction}
            className="p-2 text-black/54 hover:bg-gray-100 rounded-md transition-colors w-8 h-8 flex items-center justify-center"
            title="Quote"
          >
            <Icon name="quotes" className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onFormatAction}
            className="p-2 text-black/54 hover:bg-gray-100 rounded-md transition-colors w-8 h-8 flex items-center justify-center"
            title="Code"
          >
            <Icon name="script" className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      
      {/* Trash button */}
      <button
        type="button"
        onClick={onDelete}
        className="text-[#D83B3B] bg-[#FF0000]/15 hover:bg-red-100 rounded-[10px] transition-colors w-[40px] h-[40px] flex items-center justify-center"
        title="Delete"
      >
        <Icon name="trash" className="w-4 h-4" />
      </button>
    </div>
  );
}

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
    
    addPost(data.content, selectedEmoji);
    reset();
    setSelectedEmoji(null);
  };

  const handleNotImplemented = () => {
    alert('Function not implemented');
  };

  const isSubmitDisabled = !content.trim() || isSubmitting;
  
  return (
    <div className="bg-[rgba(0,0,0,0.03)] rounded-[21px] p-[7px]">
      <div className="bg-white rounded-2xl shadow-[0px_4px_4px_rgba(0,0,0,0.05)] border border-black/10">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Format toolbar */}
          <EditorToolbar 
            onFormatAction={() => requireAuth(handleNotImplemented)}
            onDelete={() => requireAuth(handleNotImplemented)}
          />

          {/* Text area */}
          <div className="relative pb-2 px-[9px]">
            <div className="flex items-start gap-2">
              {user ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="transition-transform w-6 h-6 flex items-center justify-center"
                    >
                      {selectedEmoji ? (
                        <span className="text-xl">{selectedEmoji}</span>
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
                  className="transition-transform"
                  onClick={() => requireAuth(() => {})}
                >
                  <Icon name="emotion-smile" className="w-6 h-6 text-gray-500" />
                </button>
              )}
              <div className="flex-1">
                <textarea
                  {...register('content')}
                  placeholder="How are you feeling today?"
                  className="w-full min-h-[100px] p-0 border-none resize-none placeholder-gray-400 text-gray-700 focus:outline-none text-[14px] leading-relaxed"
                  onClick={() => requireAuth(() => {})}
                />
                {errors.content && (
                  <p className="text-sm text-red-600 mt-1">{errors.content.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Bottom toolbar */}
          <div className="flex items-center justify-between pt-[6px] pl-[9px] pb-[10px] pr-[13px] border-t border-gray-100">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => requireAuth(handleNotImplemented)}
                className="p-[6px] text-black/63 bg-black/5 rounded-[10px] transition-colors w-[30px] h-[30px] flex items-center justify-center"
                title="Add attachment"
              >
                <Icon name="plus" className="w-full h-full" />
              </button>
              <button
                type="button"
                onClick={() => requireAuth(handleNotImplemented)}
                className="p-[6px] text-black/63 rounded-[10px] transition-colors w-[30px] h-[30px] flex items-center justify-center"
                title="Voice recording"
              >
                <Icon name="mic" className="w-full h-full" />
              </button>
              <button
                type="button"
                onClick={() => requireAuth(handleNotImplemented)}
                className="p-[6px] text-black/63 rounded-[10px] transition-colors w-[30px] h-[30px] flex items-center justify-center"
                title="Video camera"
              >
                <Icon name="video-camera" className="w-full h-full" />
              </button>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitDisabled}
              onClick={() => requireAuth(() => {})}
              className="w-6 h-6"
            >
              {isSubmitting ? (
                <div className="w-full h-full border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Icon name="post" className={cn('w-full h-full transition-all duration-200', isSubmitDisabled && 'grayscale')}/>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
