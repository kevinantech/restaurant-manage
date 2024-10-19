import { ECookie } from "@/backend/common/constants";
import { AuthAdminData } from "@/backend/modules/admin/application/admin.uc";
import { AuthAdminDto } from "@/backend/modules/admin/infrastructure/dto/auth-admin.dto";
import { API } from "@/common/constants/api-enum";
import { EAdminPaths } from "@/common/constants/paths-enum";
import { ServerResponse } from "@/common/interfaces/server-response";
import { auth } from "@/firebase/firebase-client";
import { signInWithEmailAndPassword } from "firebase/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type Credential = {
  email: string;
  password: string;
};

type R = ServerResponse<AuthAdminData>;
const fetcher = (uid: string) =>
  fetch(API.ADMIN_AUTH, {
    method: "POST",
    body: JSON.stringify({ uid } as AuthAdminDto),
  });

const useLogin = () => {
  const [error, setError] = useState<{ message: string }>();
  const [loading, setLoading] = useState<boolean>(false);

  const toggleLoading = () => setLoading((prevState) => !prevState);
  const router = useRouter();

  const handleLogin = async (data: Credential) => {
    try {
      toggleLoading();
      const { email, password } = data;
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const response: R = await fetcher(user.uid).then(async (res) => await res.json());
      if (!response || !response.data || !response.data?.token)
        throw new Error("Authentication failed.");
      Cookies.set(ECookie.ADMIN_AUTH_TOKEN, response.data.token, { expires: 30 });
      router.push(EAdminPaths.DASHBOARD);
    } catch (e: any) {
      setError({ message: "Correo y/o contraseña incorrecta." });
      console.warn(e.message);
    } finally {
      toggleLoading();
    }
  };

  return {
    handleLogin,
    loading,
    error,
    setError,
  };
};

export { useLogin };
