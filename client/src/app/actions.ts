'use server';

import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type LoginFormState = {
  error?: string;
  success?: boolean;
  loading?: boolean;
};

export type RegisterFormState = {
  error?: string;
  success?: boolean;
  loading?: boolean;
};

export async function authenticate(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const validatedFields = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      error: 'Invalid form data',
      loading: false,
    };
  }

  const { email, password } = validatedFields.data;

  // For demo purposes, we'll accept any email/password combination
  // In a real app, you would validate against your auth provider
  if (email && password) {
    return { success: true, loading: false };
  }

  return {
    error: 'Invalid credentials',
    loading: false,
  };
}

export async function register(
  prevState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  const validatedFields = registerSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors[0]?.message || 'Invalid form data',
      loading: false,
    };
  }

  const { name, email, password } = validatedFields.data;

  // For demo purposes, we'll simulate successful registration
  // In a real app, you would create the user in your database
  if (name && email && password) {
    return { success: true, loading: false };
  }

  return {
    error: 'Registration failed',
    loading: false,
  };
} 