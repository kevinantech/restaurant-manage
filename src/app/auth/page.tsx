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
import { useAuthPage } from "./page.hooks";
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
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          lineHeight: 1,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
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
  const { form, handleLogin, loading, showPassword } = useAuthPage();

  return (
    <ThemeProvider theme={createTheme(themeOptions)}>
      <div className="h-full bg-wave-blue-2_1 bg-no-repeat bg-cover overflow-hidden">
        <Container className="relative w-80 mt-32 py-10 px-0 rounded-lg bg-white" maxWidth="xs">
          <p className="w-max text-xl font-bold mb-2 mx-auto">Iniciar Sesión</p>
          <p className="w-max mx-auto text-sm italic">Accede a tu panel de gestión.</p>
          <form
            className="self-center flex flex-col items-center max-w-[15rem] mt-8 mx-auto"
            onSubmit={form.handleSubmit(handleLogin)}
          >
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
                label="Contraseña"
                type={showPassword.value ? "text" : "password"}
                {...form.register("password", { required: "Este campo es obligatorio." })}
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
            <Button
              fullWidth
              variant="contained"
              type="submit"
              className="text-sm mt-5 bg-[#1976d2]"
            >
              Acceder
            </Button>
          </form>
          <Backdrop open={loading} />
        </Container>
      </div>
    </ThemeProvider>
  );
}
