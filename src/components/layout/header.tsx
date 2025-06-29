'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';
import loginIcon from '@/icons/login.svg';
import Image from 'next/image';

export function Header() {
  const pathname = usePathname();
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  const isAuthPage = pathname.includes('signin') || pathname.includes('signup');

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="w-full px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm" />
            </div>
            <span className="text-xl font-bold text-gray-900">foo-rum</span>
          </Link>

          <div className="flex items-center gap-3">
            {isAuthPage && (
              <Link href="/">
                <Button variant="ghost">Back to home</Button>
              </Link>
            )}
            
            {!isAuthPage && (
              <>
                {user ? (
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">
                      Welcome, {user.emailOrUsername}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={logout}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link href="/signin">
                      <Button variant="ghost" className="text-gray-600 flex flex-row items-center gap-[7px]">
                        Login
                        <div>
                          <Image src={loginIcon} alt="Login" width={20} height={20} />
                        </div>
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
