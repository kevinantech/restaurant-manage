"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Container,
  createTheme,
  IconButton,
  InputAdornment,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { FormLoader, InputBox, themeOptions } from "../register/page.client";
import { useSignIn } from "./page.hooks";

export default function SignIn() {
  const { form, handleLogin, loading, showPassword } = useSignIn();

  return (
    <ThemeProvider theme={createTheme(themeOptions)}>
      <div className="h-full bg-wave-blue-2_1 bg-no-repeat bg-cover overflow-hidden">
        <Container
          className="relative w-80 mt-32 py-10 px-0 rounded-lg bg-white"
          maxWidth="xs"
        >
          <p className="w-max text-xl font-bold mb-2 mx-auto">Iniciar Sesión</p>
          <p className="w-max mx-auto text-sm italic">
            Accede a tu panel de gestión.
          </p>
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
                type={showPassword.value ? "text" : "password"}
                {...form.register("password", {
                  required: "Este campo es obligatorio.",
                })}
                error={!!form.errors.password?.message}
                helperText={form.errors.password?.message}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => showPassword.dispatch(!showPassword)}
                        >
                          {showPassword.value ? (
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
            <Button
              fullWidth
              variant="contained"
              type="submit"
              className="text-sm mt-5 capitalize bg-[#1976d2]"
            >
              Acceder
            </Button>
          </form>
          <FormLoader open={loading} />
        </Container>
      </div>
    </ThemeProvider>
  );
}
