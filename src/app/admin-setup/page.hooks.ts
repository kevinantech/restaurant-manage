import { CreateAdminDto } from "@/backend/modules/admin/application/dto/create-admin.dto";
import { API } from "@/common/constants/api-enum";
import { ServerResponse } from "@/common/interfaces";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type R = ServerResponse<{ _id: string }>;
const fetcher = (data: CreateAdminDto) =>
  fetch(API.ADMIN, {
    method: "POST",
    body: JSON.stringify(data),
  });

const useCreateAdmin = () => {
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
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  const router = useRouter();

  const handleCreateAdmin = async (data: CreateAdminDto) => {
    try {
      toggleLoading();
      const response: R = await fetcher(data).then(async (res) => await res.json());
      console.log("🚀 ~ handleCreateAdmin ~ response:", response);
      if (!response.data)
        throw new Error(
          typeof response.message === "string" ? response.message : "Unhandled response."
        );
      router.push("/admin");
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
    handleCreateAdmin,
  };
};

export { useCreateAdmin };
