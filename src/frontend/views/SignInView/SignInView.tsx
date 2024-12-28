"use client";
import { globalTheme } from "@/frontend/common/constants/styles/global-theme";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import {
  Button,
  Container,
  createTheme,
  IconButton,
  InputAdornment,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { FormLoader, InputBox } from "../RegisterView/RegisterView";
import { useSignInView } from "./SignInView.model";

export default function SignInView() {
  const { form, handleSignIn, error } = useSignInView();

  return (
    <ThemeProvider theme={createTheme(globalTheme)}>
      <div className="h-full bg-french-lilac overflow-hidden">
        <Container
          className="relative w-80 mt-32 py-10 px-0 rounded-lg bg-white"
          maxWidth="xs"
        >
          <div className="flex justify-center items-center w-16 h-16 rounded-full mx-auto my-0 bg-pompadour">
            <LockOpenRoundedIcon fontSize="large" htmlColor="#FFF" />
          </div>
          <p className="w-max text-xl font-medium my-4 mx-auto">
            Iniciar Sesión
          </p>
          <form
            className="self-center flex flex-col items-center max-w-[15rem] mx-auto"
            onSubmit={form.handleSubmit(handleSignIn)}
          >
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
                label="Contraseña"
                type={form.showPassword.value ? "text" : "password"}
                {...form.register("password", {
                  required: "Este campo es obligatorio.",
                })}
                error={!!form.errors.password?.message}
                helperText={form.errors.password?.message}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={form.showPassword.toggle}>
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
            {error?.message && (
              <p className="self-start mt-3 p-2 border border-cinnabar rounded font-medium text-xs text-cinnabar bg-[#fad7d7]">
                {error.message}
              </p>
            )}
            <Button
              fullWidth
              variant="contained"
              type="submit"
              className="text-sm mt-5"
            >
              Acceder
            </Button>
          </form>
          <FormLoader open={form.loading} />
        </Container>
      </div>
    </ThemeProvider>
  );
}
