'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authenticate } from '@/app/actions';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card"

type LoginFormState = {
  error?: string;
  success?: boolean;
};

const initialState: LoginFormState = {
  error: undefined,
  success: false,
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-full"
      type="submit"
      disabled={pending}
    >
      {pending ? 'Signing in...' : 'Sign in'}
    </Button>
  );
}

interface LoginFormProps extends React.ComponentProps<"div"> {
  imageSrc?: string;
}

export function LoginForm({
  className,
  imageSrc,
  ...props
}: LoginFormProps) {
  const router = useRouter();
  const { pending } = useFormStatus();
  const [state, formAction] = useActionState(authenticate, initialState);

  useEffect(() => {
    if (state.success) {
      router.push('/post-login');
    }
  }, [state.success, router]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8"
            action={formAction}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl p-2 font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your email below to login to your account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="m@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={pending}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  disabled={pending}
                  required
                />
              </div>
              {state.error && (
                <div className="text-sm text-red-500">{state.error}</div>
              )}
              <LoginButton />
      

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline underline-offset-4 hover:text-primary">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt="Login illustration"
                fill
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                sizes="(min-width: 768px) 50vw, 0vw"
                priority
              />
            ) : (
              <img
                src="/placeholder.svg"
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            )}
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
} 