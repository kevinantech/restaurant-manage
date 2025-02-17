'use client';
import {
  RegisterAdminBody,
  RegisterAdminBodySchema,
} from '@/admin/domain/admin.entity';
import { ResponseCode } from '@/shared/_common/constants/response-codes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Backdrop,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { WebRoutes } from 'app/_common/constants';
import { GradientCircularProgress } from 'app/_components/GradientCircularProgress';
import { useHandler } from 'app/_hooks/useHandler';
import { usePassword } from 'app/_hooks/usePassword';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerAdmin } from './actions';
import styles from './page.module.css';
import { ThemeProvider } from 'app/_providers/ThemeProvider';

type FormLoaderProps = {
  open?: boolean;
};

const FormLoader: React.FC<FormLoaderProps> = ({ open }) =>
  open ? (
    <div
      className={`${styles['form-submit-animation']} absolute z-10 inset-0 flex items-center w-full h-full m-0 rounded-lg bg-white bg-opacity-50`}
    >
      <div className="w-max my-0 mx-auto">
        <GradientCircularProgress />
      </div>
    </div>
  ) : (
    <></>
  );

type FormFeedbackProps = {
  open: boolean;
  onAccept: () => void;
};

const FormFeedback: React.FC<FormFeedbackProps> = ({ open, onAccept }) => (
  <Backdrop open={open} className="backdrop-blur-md">
    <div className="flex flex-col bg-white pt-8 px-6 pb-4 rounded-md">
      <p className="font-semibold mb-2">✅ ¡Listo! Tu registro fue exitoso. </p>
      <p className="text-sm mb-6">
        Ahora puedes iniciar sesión para acceder a tu cuenta.
      </p>
      <Button
        variant="outlined"
        className="self-end w-min font-semibold normal-case"
        onClick={onAccept}
      >
        Continuar
      </Button>
    </div>
  </Backdrop>
);

const useRegister = () => {
  const [openFeedback, setOpenFeedback] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegisterAdminBody>({
    resolver: zodResolver(RegisterAdminBodySchema),
  });
  const router = useRouter();
  const { handler, error, isLoading } = useHandler();

  const handleRegister = async (data: RegisterAdminBody) => {
    await handler(async () => {
      const result = await registerAdmin(data);
      if (result.code === ResponseCode.OK.code) setOpenFeedback(true);
    });
  };

  const handleFeedback = () => router.push(WebRoutes.SIGN_IN);

  return {
    form: {
      errors,
      getValues,
      handleSubmit,
      register,
    },
    handleFeedback,
    handleRegister,
    openFeedback,
    isLoading,
  };
};

const Register = () => {
  const { form, handleFeedback, handleRegister, openFeedback, isLoading } =
    useRegister();
  const [visibility, setVisibility] = useState<boolean>(false);
  const password = usePassword();

  // Wait for the inputs to finish loading.
  useEffect(() => {
    if (!visibility) setVisibility(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visibility) return null;

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-french-lilac overflow-hidden">
        <div className="relative max-w-xs sm:max-w-sm mt-16 mx-auto p-10 rounded-lg bg-white">
          <p className="w-max text-xl font-bold mb-2 mx-auto">Registro</p>
          <p className="block sm:hidden text-center text-sm">
            Únete a la experiencia 🚀
          </p>
          <p className="hidden sm:block text-center text-sm">
            Crea tu cuenta, únete a la experiencia 🚀
          </p>
          <form
            className="mt-5 space-y-4"
            onSubmit={form.handleSubmit(handleRegister)}
          >
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
              label="Usuario"
              {...form.register('username')}
              error={!!form.errors.username?.message}
              helperText={form.errors.username?.message}
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
              type={password.type}
              {...form.register('password')}
              error={!!form.errors.password?.message}
              helperText={form.errors.password?.message}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton disableRipple onClick={password.toggle}>
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
            <div>
              <div className="mt-6">
                <Button fullWidth variant="contained" type="submit">
                  Registrar
                </Button>
              </div>
            </div>
          </form>
          <FormLoader open={isLoading} />
          <FormFeedback open={openFeedback} onAccept={handleFeedback} />
        </div>
      </div>
    </ThemeProvider>
  );
};

export { FormLoader, Register };
