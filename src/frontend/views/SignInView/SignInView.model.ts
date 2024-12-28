import { FrontendRoutes } from "@/frontend/common/constants";
import { useLoading, useShowPassword } from "@/frontend/hooks";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type E = { message: string };
export type Credentials = {
  username: string;
  password: string;
};

const useSignInView = () => {
  const loading = useLoading();
  const showPassword = useShowPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const router = useRouter();
  const [error, setError] = useState<E>();

  /**
   * @param data
   * https://next-auth.js.org/getting-started/client#signin
   */
  const handleSignIn = async (data: Credentials) => {
    try {
      loading.toggle();
      if (!!error) setError(undefined);
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (result?.ok) router.replace(FrontendRoutes.DASHBOARD);
      else if (result?.error) setError({ message: result.error });
    } catch (e: any) {
      console.warn(e.message);
    } finally {
      loading.toggle();
    }
  };

  return {
    form: {
      register,
      handleSubmit,
      errors,
      loading: loading.value,
      showPassword,
    },
    handleSignIn,
    error,
  };
};

export { useSignInView };
