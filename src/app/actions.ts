'use server';

import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormState = {
  error?: string;
  success?: boolean;
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
    };
  }

  const { email, password } = validatedFields.data;

  // For demo purposes, we'll accept any email/password combination
  // In a real app, you would validate against your auth provider
  if (email && password) {
    // Store the email in localStorage for demo purposes
    if (typeof window !== 'undefined') {
      localStorage.setItem('therapistId', email);
    }
    return { success: true };
  }

  return {
    error: 'Invalid credentials',
  };
} 