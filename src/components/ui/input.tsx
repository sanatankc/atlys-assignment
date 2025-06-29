import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, type = 'text', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-[600] text-black">
            {label}
          </label>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            'w-full px-4 py-3 text-sm bg-[#F2F2F2] border border-[#E0E0E0] rounded-lg placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:border-[#4A63FF] transition-colors',
            "placeholder:font-[400] placeholder:text-black/50",
            error && 'border-red-300 focus:border-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
