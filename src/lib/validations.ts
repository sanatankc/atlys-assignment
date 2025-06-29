import { z } from 'zod';

// Helper function to validate email or username
const isValidEmailOrUsername = (value: string): boolean => {
  // Email regex - basic but comprehensive email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  // Username validation: 3-20 characters, alphanumeric, underscores, hyphens
  // Must start with letter or number, cannot be all numbers
  const usernameRegex = /^[a-zA-Z0-9][a-zA-Z0-9_-]{2,19}$/;
  const isAllNumbers = /^\d+$/.test(value);
  
  // Check if it's a valid email
  if (emailRegex.test(value)) {
    return true;
  }
  
  // Check if it's a valid username (not all numbers)
  if (usernameRegex.test(value) && !isAllNumbers) {
    return true;
  }
  
  return false;
};

export const signInSchema = z.object({
  emailOrUsername: z.string()
    .min(1, 'Email or username is required')
    .refine(isValidEmailOrUsername, {
      message: 'Please enter a valid email address or username (3-20 characters, letters/numbers/underscore/hyphen, cannot be all numbers)',
    }),
  password: z.string().min(1, 'Password is required'),
});

export const signUpSchema = z.object({
  emailOrUsername: z.string()
    .min(1, 'Email or username is required')
    .refine(isValidEmailOrUsername, {
      message: 'Please enter a valid email address or username (3-20 characters, letters/numbers/underscore/hyphen, cannot be all numbers)',
    }),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const postSchema = z.object({
  content: z.string()
    .min(1, 'Post content is required')
    .max(500, 'Post must be less than 500 characters'),
});
