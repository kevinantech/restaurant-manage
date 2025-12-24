'use client';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { WebRoutes } from 'app/_common/routes-enum';
import { Notification } from 'app/_components/Notification/Notification';
import { useTogglePassword } from 'app/_hooks/useTogglePassword';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FormLoader } from './FormLoader';
import { useLoginPage } from './LoginPage.model';

const LoginPage = () => {
  const { form, handleLogin, error, isLoading } = useLoginPage();
  const togglePassword = useTogglePassword();
  const [visibility, setVisibility] = useState<boolean>(false);

  // Wait for the inputs to finish rendering.
  useEffect(() => {
    if (!visibility) setVisibility(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visibility) return null;

  return (
    <div className="min-h-screen bg-french-lilac overflow-hidden">
      <div className="max-w-xs sm:max-w-sm mt-16 mx-auto p-10 rounded-lg bg-white">
        {/* Card header with icon and title */}
        <div className="space-y-4">
          <div className="flex justify-center items-center w-16 h-16 rounded-full mx-auto my-0 bg-primary">
            <LockOpenRoundedIcon fontSize="large" htmlColor="#FFF" />
          </div>
          <p className="text-xl font-medium text-center">Iniciar Sesión</p>
        </div>

        <form className="mt-5 space-y-4" onSubmit={form.handleSubmit(handleLogin)}>
          <TextField
            variant="standard"
            size="small"
            fullWidth
            label="Correo electrónico"
            {...form.register('email')}
            error={!!form.errors.email?.message}
            helperText={form.errors.email?.message}
          />
          <TextField
            variant="standard"
            size="small"
            fullWidth
            label="Contraseña"
            type={togglePassword.textType}
            {...form.register('password')}
            error={!!form.errors.password?.message}
            helperText={form.errors.password?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePassword.toggle}>
                      {togglePassword.textType === 'text' ? (
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
          {!!error && <Notification variant="error" text={error} />}
          <Button fullWidth variant="contained" type="submit" className="!mt-6">
            Acceder
          </Button>
          <p className="text-center text-sm">
            ¿No tienes cuenta?{' '}
            <Link href={WebRoutes.REGISTER} className="text-blue-500">
              Regístrate
            </Link>
          </p>
        </form>
        <FormLoader open={isLoading} />
      </div>
    </div>
  );
};

export { LoginPage };
