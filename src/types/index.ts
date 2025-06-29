export interface User {
  id: string;
  emailOrUsername: string;
  avatar?: string;
}

export interface Post {
  id: string;
  content: string;
  author: User;
  timestamp: string;
  emoji?: string;
}

export interface AuthCredentials {
  emailOrUsername: string;
  password: string;
}

export interface SignUpCredentials extends AuthCredentials {
  confirmPassword: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (credentials: AuthCredentials) => Promise<boolean>;
  register: (credentials: SignUpCredentials) => Promise<boolean>;
  logout: () => void;
}

export interface PostsState {
  posts: Post[];
  addPost: (content: string, emoji?: string | null) => void;
  isSubmitting: boolean;
}

export interface UIState {
  authModal: {
    isOpen: boolean;
    mode: 'signin' | 'signup';
  };
  openAuthModal: (mode: 'signin' | 'signup') => void;
  closeAuthModal: () => void;
}
