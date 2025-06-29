'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Modal } from '@/components/ui/modal';
import { SignInForm } from '@/components/forms/signin-form';
import { SignUpForm } from '@/components/forms/signup-form';
import { useUIStore } from '@/store/ui-store';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function AuthModal() {
  const { authModal, closeAuthModal } = useUIStore();
  const pathname = usePathname();
  
  // Close modal when navigating to auth pages
  React.useEffect(() => {
    const isOnAuthPage = pathname.includes('/signin') || pathname.includes('/signup');
    if (isOnAuthPage && authModal.isOpen) {
      closeAuthModal();
    }
  }, [pathname, authModal.isOpen, closeAuthModal]);
  
  // Don't render modal on auth pages
  const isOnAuthPage = pathname.includes('/signin') || pathname.includes('/signup');
  if (isOnAuthPage) {
    return null;
  }

  return (
    <Modal
      isOpen={authModal.isOpen}
      onClose={closeAuthModal}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', duration: 0.3 }}
        className={cn(
          'pointer-events-auto w-fit',
        )}
        onClick={(e) => e.stopPropagation()}
      >
      {authModal.mode === 'signin' ? <SignInForm /> : <SignUpForm />}
      </motion.div>
    </Modal>
  );
}
