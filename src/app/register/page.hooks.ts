"use client";
import { IResponseBase } from "@/backend/common/entity/response-base.model";
import { CreateAdminDto } from "@/backend/modules/admin/application/dto/create-admin.dto";
import { API } from "@/frontend/common/constants/api-enum";
import { FrontendRoutes } from "@/frontend/common/constants/frontend-routes-enum";
import { useShowPassword } from "@/frontend/hooks";
import { useLoading } from "@/frontend/hooks/useLoading";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const fetcher = (data: CreateAdminDto) =>
  fetch(API.ADMIN, {
    method: "POST",
    body: JSON.stringify(data),
  });

const useRegister = () => {
  const loading = useLoading();
  const showPassword = useShowPassword();
  const [openFeedback, setOpenFeedback] = useState<boolean>(false);
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

  const handleRegister = async (data: CreateAdminDto) => {
    try {
      loading.toggle();
      const res: IResponseBase = await fetcher(data).then(
        async (res) => await res.json()
      );
      if (res.code === "OK") setOpenFeedback(true);
    } catch (e: any) {
      console.warn(e.message);
    } finally {
      loading.toggle();
    }
  };

  const handleFeedback = () => router.push(FrontendRoutes.AUTH);

  return {
    form: {
      errors,
      getValues,
      handleSubmit,
      loading: loading.value,
      register,
      showPassword,
    },
    handleFeedback,
    handleRegister,
    openFeedback,
  };
};

export { useRegister };
