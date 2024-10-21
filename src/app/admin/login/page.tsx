"use client";
import { Credential } from "@/common/interfaces/credential";
import { useLogin } from "@/hooks/useRegisterProduct";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import { Backdrop, LinearProgress, Modal } from "@mui/material";
import React from "react";
import { Path, UseFormRegister, useForm } from "react-hook-form";

interface ErrorMessageProps {
  children: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => {
  return (
    <div className="mb-5 px-4 py-2 border border-error rounded-[4px] bg-[#fdecef]">
      <p className="text-sm text-error">{children}</p>
    </div>
  );
};

type InputProps = {
  autoFocus?: boolean;
  id: Path<Credential>;
  label: string;
  type: "text" | "password";
  register: UseFormRegister<Credential>;
};

const Input: React.FC<InputProps> = ({ autoFocus, id, type, register, label }) => {
  return (
    <div className="w-full mb-5">
      <label htmlFor={id} className="inline-block mb-2 text-sm">
        {label}
      </label>
      <input
        id={id}
        className="w-full p-3 border border-neutral-300 rounded-[4px] text-sm hover:border-1 hover:border-black  focus:outline-1 focus:outline-blue-500"
        type={type}
        {...register(id, { required: true })}
        autoFocus={autoFocus}
      />
    </div>
  );
};

export default function Login() {
  const { handleSubmit, register } = useForm<Credential>();
  const { handleLogin, loading, error, setError } = useLogin();

  return (
    <div className="w-80 lg:w-[30rem] mx-auto mt-8 rounded-lg bg-white text-black overflow-hidden">
      <form
        className="flex flex-col items-center w-64 lg:w-[24rem] mt-10 mx-auto pb-12 overflow-hidden"
        onSubmit={handleSubmit(handleLogin, () =>
          setError({ message: "Ingresar correo y contraseña." })
        )}
        method=""
      >
        <div className="mb-5 p-2 rounded-full bg-fuchsia-700">
          <HttpsOutlinedIcon fontSize="medium" sx={{ color: "#FFFFFF" }} />
        </div>
        <h1 className="mb-5 text-center text-xl">Iniciar sesión</h1>
        {!!error && <ErrorMessage>{error.message}</ErrorMessage>}
        <Input autoFocus id="email" type="text" label="Correo" register={register} />
        <Input id="password" type="password" label="Contraseña" register={register} />
        <button
          type="submit"
          className="block w-full py-3 rounded-[4px] font-medium text-xs text-white bg-blue-500 transition-[background, shadow] duration-200 hover:shadow-lg hover:bg-blue-600"
        >
          INICIAR SESIÓN
        </button>
      </form>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <LinearProgress
          className="absolute top-0 w-full"
          sx={{ color: "rgb(59, 130, 246)" /* => bg-blue-500 */ }}
        />
      </Backdrop>
    </div>
  );
}
