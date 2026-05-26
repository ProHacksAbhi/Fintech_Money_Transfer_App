// Mock API base URL - replace with actual backend URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Types
interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    fullName: string;
  };
}

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Login service
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // Simulate API call
  await delay(1500);
  
  // Mock validation - replace with actual API call
  if (credentials.email === 'demo@bank.com' && credentials.password === 'Password123') {
    return {
      success: true,
      message: 'Login successful',
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: '1',
        email: credentials.email,
        fullName: 'Demo User'
      }
    };
  }
  
  // For demo: accept any valid-looking credentials
  if (credentials.email && credentials.password.length >= 8) {
    return {
      success: true,
      message: 'Login successful',
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: '1',
        email: credentials.email,
        fullName: 'User'
      }
    };
  }
  
  return {
    success: false,
    message: 'Invalid email or password'
  };
};

// Register service
export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
  // Simulate API call
  await delay(1500);
  
  // Mock registration - replace with actual API call
  if (data.email && data.password && data.fullName) {
    return {
      success: true,
      message: 'Registration successful',
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: Date.now().toString(),
        email: data.email,
        fullName: data.fullName
      }
    };
  }
  
  return {
    success: false,
    message: 'Registration failed. Please try again.'
  };
};

// Forgot password service
export const forgotPassword = async (email: string): Promise<AuthResponse> => {
  // Simulate API call
  await delay(1500);
  
  // Mock forgot password - replace with actual API call
  if (email) {
    return {
      success: true,
      message: 'Password reset link sent to your email'
    };
  }
  
  return {
    success: false,
    message: 'Email not found'
  };
};

// Reset password service
export const resetPassword = async (token: string, newPassword: string): Promise<AuthResponse> => {
  // Simulate API call
  await delay(1500);
  
  if (token && newPassword) {
    return {
      success: true,
      message: 'Password reset successful'
    };
  }
  
  return {
    success: false,
    message: 'Invalid or expired reset token'
  };
};
