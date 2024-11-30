import { CreateAdminDto } from "@/backend/modules/admin/application/dto/create-admin.dto";
import { API } from "@/frontend/common/constants/api-enum";
import { FrontendRoutes } from "@/frontend/common/constants/frontend-routes-enum";
import { ServerResponse } from "@/frontend/common/server-response";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type R = ServerResponse<{ _id: string }>;
const fetcher = (data: CreateAdminDto) =>
  fetch(API.SETUP, {
    method: "POST",
    body: JSON.stringify(data),
  });

const useSetupPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const toggleLoading = () => setLoading((prevState) => !prevState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<CreateAdminDto>({
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  const router = useRouter();

  const handleSetup = async (data: CreateAdminDto) => {
    try {
      toggleLoading();
      const response: R = await fetcher(data).then(
        async (res) => await res.json()
      );
      if (!response.data)
        throw new Error(
          typeof response.message === "string"
            ? response.message
            : "Unhandled response."
        );

      router.push(FrontendRoutes.DASHBOARD);
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
      getValues,
    },
    showPassword: {
      value: showPassword,
      dispatch: setShowPassword,
    },
    loading,
    handleSetup,
  };
};

export { useSetupPage };
