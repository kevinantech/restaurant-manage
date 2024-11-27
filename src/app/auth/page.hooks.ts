import { FrontendRoutes } from "@/frontend/common/constants/frontend-routes-enum";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export type Credentials = {
  username: string;
  password: string;
};

const useAuthPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const toggleLoading = () => setLoading((prevState) => !prevState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Credentials>({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const router = useRouter();

  const handleLogin = async (data: Credentials) => {
    try {
      toggleLoading();
      const result = await signIn("credentials", { redirect: false, ...data });
      console.log("🚀 ~ handleLogin ~ result:", result);
      /* if (result) router.push(FrontendRoutes.DASHBOARD); */
    } catch (e: any) {
      console.warn(e.message);
    } finally {
      toggleLoading();
    }
  };

  return {
    form: {
      register,
      handleSubmit,
      errors,
    },
    showPassword: {
      value: showPassword,
      dispatch: setShowPassword,
    },
    loading,
    handleLogin,
  };
};

export { useAuthPage };
