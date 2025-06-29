export const APP_NAME = 'foo-rum';

export const ROUTES = {
  HOME: '/',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
} as const;

export const TEST_ACCOUNTS = [
  { email: 'demo@example.com', password: 'password123' },
  { email: 'test@user.com', password: 'testpass' },
] as const;
