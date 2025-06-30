'use client';

import React from 'react';
import { Icon } from '@/components/ui/icon';

interface AuthFormLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export function AuthFormLayout({ title, subtitle, children, footer }: AuthFormLayoutProps) {
  return (
    <div className='bg-[#EBEBEB] rounded-[30px] p-[11px] w-[498px]'>
      <div className='bg-white rounded-[21px]'>
        <div className='space-y-[65px] pt-[30px] pb-[57px] px-[50px]'>
          <div className="text-center ">
            <div className="mx-auto w-[53px] h-[53px] bg-[#F2F2F2] rounded-full flex items-center justify-center mb-5 border border-[#E0E0E0]">
              <Icon name="login" size={24} className='relative left-[-1px]' />
            </div>
            <h1 className="text-[20px] font-bold text-black mb-1">{title}</h1>
            <p className="text-black/50 font-normal text-sm">
              {subtitle}
            </p>
          </div>

          {children}

        </div>
      </div>
      <div className='w-full text-center pt-[15px] pb-[8px]'>
        {footer}
      </div>
    </div>
  );
} 