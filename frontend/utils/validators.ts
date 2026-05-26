// Email validation
export const validateEmail = (email: string): { isValid: boolean; error: string } => {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  return { isValid: true, error: '' };
};

// Password validation
export const validatePassword = (password: string): { isValid: boolean; error: string } => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' };
  }
  
  return { isValid: true, error: '' };
};

// Confirm password validation
export const validateConfirmPassword = (password: string, confirmPassword: string): { isValid: boolean; error: string } => {
  if (!confirmPassword) {
    return { isValid: false, error: 'Please confirm your password' };
  }
  
  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' };
  }
  
  return { isValid: true, error: '' };
};

// Name validation
export const validateName = (name: string): { isValid: boolean; error: string } => {
  if (!name) {
    return { isValid: false, error: 'Name is required' };
  }
  
  if (name.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters' };
  }
  
  if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    return { isValid: false, error: 'Name can only contain letters, spaces, hyphens and apostrophes' };
  }
  
  return { isValid: true, error: '' };
};

// Phone validation (optional)
export const validatePhone = (phone: string): { isValid: boolean; error: string } => {
  if (!phone) {
    return { isValid: true, error: '' }; // Phone is optional
  }
  
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  if (!phoneRegex.test(phone)) {
    return { isValid: false, error: 'Please enter a valid phone number' };
  }
  
  return { isValid: true, error: '' };
};
