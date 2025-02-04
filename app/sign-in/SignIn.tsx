'use client';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import {
  Button,
  createTheme,
  IconButton,
  InputAdornment,
  TextField,
  ThemeProvider,
} from '@mui/material';
import { WebRoutes } from 'app/_common/constants';
import { globalTheme } from 'app/_common/constants/styles/global-theme';
import { useHandler } from 'app/_hooks/useHandler';
import { usePassword } from 'app/_hooks/usePassword';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormLoader } from '../register/Register';
export type Credentials = {
  username: string;
  password: string;
};

const useSignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>();
  const router = useRouter();
  const { handler, error, isLoading } = useHandler();
  /**
   * @param data
   * https://next-auth.js.org/getting-started/client#signin
   */
  const handleSignIn = async (data: Credentials) => {
    console.log('🚀 ~ handleSignIn ~ data:', data);
    await handler(async () => {
      const result = await signIn('credentials', { ...data, redirect: false });
      if (result?.ok) router.push(WebRoutes.DASHBOARD);
      else if (result?.error) throw new Error(result.error);
    });
  };

  return {
    form: {
      register,
      handleSubmit,
      errors,
    },
    handleSignIn,
    isLoading,
    error,
  };
};

const SignIn = () => {
  const { form, handleSignIn, error, isLoading } = useSignIn();
  const password = usePassword();
  const [visibility, setVisibility] = useState<boolean>(false);

  // Wait for the inputs to finish loading.
  useEffect(() => {
    if (!visibility) setVisibility(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visibility) return null;

  return (
    <ThemeProvider theme={createTheme(globalTheme)}>
      <div className="min-h-screen bg-french-lilac overflow-hidden">
        <div className="relative max-w-xs sm:max-w-sm mt-16 mx-auto p-10 rounded-lg bg-white">
          <div className="flex justify-center items-center w-16 h-16 rounded-full mx-auto my-0 bg-pompadour">
            <LockOpenRoundedIcon fontSize="large" htmlColor="#FFF" />
          </div>
          <p className="w-max text-xl font-medium my-4 mx-auto">
            Iniciar Sesión
          </p>
          <form
            className="mt-5 space-y-4"
            onSubmit={form.handleSubmit(handleSignIn)}
          >
            <TextField
              variant="standard"
              size="small"
              fullWidth
              label="Usuario"
              {...form.register('username', {
                required: 'Este campo es obligatorio.',
              })}
              error={!!form.errors.username?.message}
              helperText={form.errors.username?.message}
            />
            <TextField
              variant="standard"
              size="small"
              fullWidth
              label="Contraseña"
              type={password.type}
              {...form.register('password', {
                required: 'Este campo es obligatorio.',
              })}
              error={!!form.errors.password?.message}
              helperText={form.errors.password?.message}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={password.toggle}>
                        {password.type === 'text' ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            {!!error && (
              <p className="self-start mt-3 p-2 border border-cinnabar rounded font-medium text-xs text-cinnabar bg-[#fad7d7]">
                {error}
              </p>
            )}
            <div>
              <div className="mt-6">
                <Button fullWidth variant="contained" type="submit">
                  Acceder
                </Button>
              </div>
            </div>
          </form>
          <FormLoader open={isLoading} />
        </div>
      </div>
    </ThemeProvider>
  );
};

export { SignIn };
