"use client";
import { globalTheme } from "@/frontend/common/constants/styles/global-theme";
import { GradientCircularProgress } from "@/frontend/components/GradientCircularProgress";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Backdrop,
  Button,
  Container,
  createTheme,
  IconButton,
  InputAdornment,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { FC, ReactNode } from "react";
import { useRegisterView } from "./RegisterView.model";
import styles from "./RegisterView.module.css";

type InputBoxProps = {
  children: ReactNode;
};
export const InputBox: FC<InputBoxProps> = ({ children }) => (
  <div className="h-16 w-full">{children}</div>
);

type FormLoaderProps = {
  open?: boolean;
};
export const FormLoader: FC<FormLoaderProps> = ({ open }) =>
  open ? (
    <div
      className={`${styles["form-submit-animation"]} absolute z-10 inset-0 flex items-center w-full h-full m-0 rounded-lg bg-white bg-opacity-50`}
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
const FormFeedback: FC<FormFeedbackProps> = ({ open, onAccept }) => (
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

export default function RegisterView() {
  const { form, handleFeedback, handleRegister, openFeedback } =
    useRegisterView();

  return (
    <ThemeProvider theme={createTheme(globalTheme)}>
      <div className="h-full bg-french-lilac overflow-hidden">
        <Container
          className="relative w-[25rem] mt-16 py-10 px-0 rounded-lg bg-white"
          maxWidth="xs"
        >
          <p className="w-max text-xl font-bold mb-2 mx-auto">Registro</p>
          <p className="w-max text-sm mx-auto">
            Configuración inicial del administrador.
          </p>
          <form
            className="flex flex-col items-center w-full max-w-xs mt-5 mx-auto"
            onSubmit={form.handleSubmit(handleRegister)}
          >
            <InputBox>
              <TextField
                variant="standard"
                size="small"
                fullWidth
                label="Nombre"
                {...form.register("name", {
                  required: "Este campo es obligatorio.",
                })}
                error={!!form.errors.name?.message}
                helperText={form.errors.name?.message}
              />
            </InputBox>
            <InputBox>
              <TextField
                variant="standard"
                size="small"
                fullWidth
                label="Usuario"
                {...form.register("username", {
                  required: "Este campo es obligatorio.",
                })}
                error={!!form.errors.username?.message}
                helperText={form.errors.username?.message}
              />
            </InputBox>
            <InputBox>
              <TextField
                variant="standard"
                size="small"
                fullWidth
                label="Correo"
                {...form.register("email", {
                  required: "Este campo es obligatorio.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Correo electrónico inválido.",
                  },
                })}
                error={!!form.errors.email?.message}
                helperText={form.errors.email?.message}
              />
            </InputBox>
            <InputBox>
              <TextField
                variant="standard"
                size="small"
                fullWidth
                label="Contraseña"
                type={form.showPassword.value ? "text" : "password"}
                {...form.register("password", {
                  required: "Este campo es obligatorio.",
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener al menos 8 caracteres.",
                  },
                  maxLength: {
                    value: 30,
                    message:
                      "La contraseña no puede superar los 30 caracteres.",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    message:
                      "La contraseña debe contener al menos una mayúscula, una minúscula y un número.",
                  },
                })}
                error={!!form.errors.password?.message}
                helperText={form.errors.password?.message}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          disableRipple
                          onClick={form.showPassword.toggle}
                        >
                          {form.showPassword.value ? (
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
            </InputBox>
            <InputBox>
              <TextField
                variant="standard"
                size="small"
                fullWidth
                label="Confirmar Contraseña"
                type="password"
                {...form.register("confirmPassword", {
                  required: "Este campo es obligatorio.",
                  validate: (val) =>
                    val === form.getValues("password") ||
                    "Las contraseñas no coinciden.",
                })}
                error={!!form.errors.confirmPassword?.message}
                helperText={form.errors.confirmPassword?.message}
              />
            </InputBox>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              className="mt-5"
            >
              Registrar
            </Button>
          </form>
          <FormLoader open={form.loading} />
          <FormFeedback open={openFeedback} onAccept={handleFeedback} />
        </Container>
      </div>
    </ThemeProvider>
  );
}
