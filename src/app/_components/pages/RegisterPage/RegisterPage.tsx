'use client';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { useTogglePassword } from 'app/_hooks/useTogglePassword';
import { useEffect, useState } from 'react';
import { FormLoader } from '../LoginPage/FormLoader';
import { BackButton } from './BackButton';
import { FormFeedback } from './FormFeedback';
import { useRegister } from './RegisterPage.model';

const RegisterPage = () => {
  const { form, handleFeedback, handleRegister, openFeedback, isLoading } = useRegister();
  const [visibility, setVisibility] = useState<boolean>(false);
  const togglePassword = useTogglePassword();

  // Wait for the inputs to finish loading.
  useEffect(() => {
    if (!visibility) setVisibility(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visibility) return null;

  return (
    <div className="min-h-screen bg-french-lilac overflow-hidden">
      <BackButton />
      <div className="relative max-w-xs sm:max-w-sm mt-16 mx-auto p-10 rounded-lg bg-white">
        {/* Block of registration header */}
        <div className="flex items-center gap-2 text-primary">
          {/* <AccountCircleIcon fontSize="large" /> */}
          <p className="text-[1.625rem] md:text-[1.75rem] font-bold">Crea una cuenta</p>
          {/* <p className="block sm:hidden text-center text-sm">Únete a la experiencia 🚀</p> */}
          {/* <p className="hidden sm:block text-center text-sm">
            Crea tu cuenta, únete a la experiencia 🚀
          </p> */}
        </div>

        <form className="mt-5 space-y-4" onSubmit={form.handleSubmit(handleRegister)}>
          <TextField
            variant="standard"
            size="small"
            fullWidth
            label="Nombre"
            {...form.register('name')}
            error={!!form.errors.name?.message}
            helperText={form.errors.name?.message}
          />
          <TextField
            variant="standard"
            size="small"
            fullWidth
            label="Correo"
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
                    <IconButton disableRipple onClick={togglePassword.toggle}>
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
          <TextField
            variant="standard"
            size="small"
            fullWidth
            label="Confirmar Contraseña"
            type="password"
            {...form.register('confirmPassword')}
            error={!!form.errors.confirmPassword?.message}
            helperText={form.errors.confirmPassword?.message}
          />
          <Button fullWidth variant="contained" type="submit" className="!mt-6">
            Registrar
          </Button>
        </form>
        <FormLoader open={isLoading} />
        <FormFeedback open={openFeedback} onAccept={handleFeedback} />
      </div>
    </div>
  );
};

export { RegisterPage };
