import { RegisterAdminBody, RegisterAdminBodySchema } from '@/admin/domain/admin.entity';
import { zodResolver } from '@hookform/resolvers/zod';
import { WebRoutes } from 'app/_common/routes-enum';
import { useHandler } from 'app/_hooks/useHandler';
import { registerAdmin } from 'app/register/actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const useRegister = () => {
  const [openFeedback, setOpenFeedback] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegisterAdminBody>({
    resolver: zodResolver(RegisterAdminBodySchema),
  });
  const router = useRouter();
  const { handler, error, isLoading } = useHandler();

  const handleRegister = async (data: RegisterAdminBody) => {
    await handler(async () => {
      const result = await registerAdmin(data);
      if (result.status == 'success') setOpenFeedback(true);
    });
  };

  const handleFeedback = () => router.push(WebRoutes.LOGIN);

  return {
    form: {
      errors,
      getValues,
      handleSubmit,
      register,
    },
    handleFeedback,
    handleRegister,
    openFeedback,
    isLoading,
  };
};

export { useRegister };
