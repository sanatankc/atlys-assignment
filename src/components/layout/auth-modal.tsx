'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Modal } from '@/components/ui/modal';
import { SignInForm } from '@/components/forms/signin-form';
import { SignUpForm } from '@/components/forms/signup-form';
import { useUIStore } from '@/store/ui-store';
import { motion, AnimatePresence } from 'framer-motion';
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
        <motion.div 
          layout
          className="overflow-hidden"
          transition={{
            layout: { duration: 0.3, ease: "easeInOut" },
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={authModal.mode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {authModal.mode === 'signin' ? <SignInForm /> : <SignUpForm />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </Modal>
  );
}
