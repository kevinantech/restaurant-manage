import { zodResolver } from '@hookform/resolvers/zod';
import { WebRoutes } from 'app/_common/routes-enum';
import { useHandler } from 'app/_hooks/useHandler';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const credentialsSchema = z.object({
  email: z.email('Ingrese un email válido').min(1, 'Ingrese un email'),
  password: z.string().min(1, 'Este campo es obligatorio.'),
});

export type Credentials = z.infer<typeof credentialsSchema>;

export const useLoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({
    resolver: zodResolver(credentialsSchema),
  });
  const router = useRouter();
  const { handler, error, isLoading } = useHandler();

  /**
   * https://next-auth.js.org/getting-started/client#signin
   */
  const handleLogin = async (data: Credentials) => {
    await handler(async () => {
      const result = await signIn('credentials', { ...data, redirect: false });
      if (result?.ok) router.push(WebRoutes.HOME);
      else if (result?.error) throw new Error(result.error);
    });
  };

  return {
    form: {
      register,
      handleSubmit,
      errors,
    },
    handleLogin,
    isLoading,
    error,
  };
};
