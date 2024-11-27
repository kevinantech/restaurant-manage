"use client";
import { GradientCircularProgress } from "@/frontend/components/GradientCircularProgress";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Container,
  createTheme,
  IconButton,
  InputAdornment,
  TextField,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";
import React, { ReactNode } from "react";
import { useCreateAdmin } from "./page.hooks";
import styles from "./page.module.css";

const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: "inherit",
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 600,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 600,
        },
      },
    },
  },
};

type InputBoxProps = {
  children: ReactNode;
};
const InputBox: React.FC<InputBoxProps> = ({ children }) => (
  <div className="h-16 w-full">{children}</div>
);

type BackdropProps = {
  open?: boolean;
};
const Backdrop: React.FC<BackdropProps> = ({ open }) =>
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

export default function CreateAdmin() {
  const { form, handleCreateAdmin, loading, showPassword } = useCreateAdmin();

  return (
    <ThemeProvider theme={createTheme(themeOptions)}>
      <div className="h-full bg-wave-blue-2_1 bg-no-repeat bg-cover overflow-hidden">
        <Container
          className="relative w-[25rem] mt-10 py-10 px-0 rounded-lg bg-white"
          maxWidth="xs"
        >
          <p className="w-max text-xl font-bold mb-2 mx-auto">Registro</p>
          <p className="w-max text-sm mx-auto">Configuración inicial del administrador.</p>
          <form
            className="flex flex-col items-center w-full max-w-xs mt-5 mx-auto"
            onSubmit={form.handleSubmit(handleCreateAdmin)}
          >
            <InputBox>
              <TextField
                variant="standard"
                size="small"
                fullWidth
                label="Nombre"
                {...form.register("name", { required: "Este campo es obligatorio." })}
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
                {...form.register("username", { required: "Este campo es obligatorio." })}
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
                type={showPassword.value ? "text" : "password"}
                {...form.register("password", {
                  required: "Este campo es obligatorio.",
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener al menos 8 caracteres.",
                  },
                  maxLength: {
                    value: 30,
                    message: "La contraseña no puede superar los 30 caracteres.",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    message:
                      "La contraseña debe contener al menos una mayúscula, una minúscula y un número.",
                  },
                })}
                error={!!form.errors.password?.message}
                helperText={form.errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => showPassword.dispatch(!showPassword)}>
                        {showPassword.value ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
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
                    val === form.getValues("password") || "Las contraseñas no coinciden.",
                })}
                error={!!form.errors.confirmPassword?.message}
                helperText={form.errors.confirmPassword?.message}
              />
            </InputBox>
            <Button fullWidth variant="contained" type="submit" className="mt-5 bg-[#1976d2]">
              Registrar
            </Button>
          </form>
          <Backdrop open={loading} />
        </Container>
      </div>
    </ThemeProvider>
  );
}
