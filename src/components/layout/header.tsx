'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';
import { Icon } from '@/components/ui/icon';

export function Header() {
  const pathname = usePathname();
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  const isAuthPage = pathname.includes('signin') || pathname.includes('signup');

  return (
    <header className="bg-white sticky top-0 z-10">
      <div className="w-full px-[40px] py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Icon name="logo" size={34} />
            <span className="text-[16px] font-bold text-black/80">foo-rum</span>
          </Link>

          <div className="flex items-center gap-3">
            {isAuthPage && (
              <Link href="/">
                <Button variant="ghost" className="text-black">Back to home</Button>
              </Link>
            )}
            
            {!isAuthPage && (
              <>
                {user ? (
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-black font-medium">
                      Welcome, {user.name || user.emailOrUsername}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={logout}
                      className="text-[#D83B3B] bg-[#FF0000]/15 hover:bg-red-100"
                    >
                      <div className="flex items-center gap-2">
                        Logout
                        <LogOut className="h-4 w-4" />
                      </div>
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link href="/signin">
                      <Button variant="ghost" className="text-black flex flex-row items-center gap-[7px]">
                        Login
                        <Icon name="login" size={20} />
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
