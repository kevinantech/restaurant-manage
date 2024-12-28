import { FrontendRoutes } from "@/frontend/common/constants";
import { useLoading, useShowPassword } from "@/frontend/hooks";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

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

  /**
   * @param data
   * https://next-auth.js.org/getting-started/client#signin
   */
  const handleSignIn = async (data: Credentials) => {
    try {
      loading.toggle();

      const result = await signIn("credentials", {
        ...data,
        callbackUrl: FrontendRoutes.DASHBOARD,
      });
      if (result?.error) {
        router; /* TODO:  */
      }
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
  };
};

export { useSignInView };
