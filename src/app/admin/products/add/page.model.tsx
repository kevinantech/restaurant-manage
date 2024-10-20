import { CreateJerseyDto } from "@/backend/modules/jersey/infrastructure/dto/create-jersey.dto";
import { API } from "@/common/constants/api-enum";
import { ICreateProduct } from "@/common/interfaces";
import { usePlaceholder } from "@/hooks";
import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import {
  useClubField,
  useEditionField,
  useImageField,
  useTitleField,
} from "./page.hooks";

type Placeholder = Partial<Record<keyof ICreateProduct, string>>;

const postJersey = async ({
  title,
  clubId,
  editions,
  isRetro,
  images,
}: ICreateProduct & {
  images: File[];
}) => {
  const formData = new FormData();
  formData.append("title" as keyof CreateJerseyDto, title);
  formData.append("clubId" as keyof CreateJerseyDto, clubId);
  formData.append("editions" as keyof CreateJerseyDto, JSON.stringify(editions));
  formData.append("isRetro" as keyof CreateJerseyDto, JSON.stringify(isRetro));
  images.forEach((image) => formData.append("images" as keyof CreateJerseyDto, image));
  return await fetch(API.JERSEYS, {
    method: "POST",
    body: formData,
  }).then(async (response) => response.json());
};

const usePage = () => {
  const { register, handleSubmit, setValue } = useForm<ICreateProduct>({
    defaultValues: {
      title: "",
      clubId: "",
      isRetro: false,
      editions: [],
    },
  });
  const [formErrors, setFormErrors] = useState<FieldErrors<ICreateProduct>>(
    {} as FieldErrors<ICreateProduct>
  );
  const title = useTitleField({
    formErrors,
    name: "title",
    register,
    options: { required: "El título es requerido." },
  });
  const clubId = useClubField({
    formErrors,
    name: "clubId",
    register,
    options: { required: "El club es requerido." },
  });
  const editions = useEditionField({
    formErrors,
    name: "editions",
    register,
    options: { required: "La edición es requerida." },
  });
  const productImages = useImageField();
  const [loading, setLoading] = useState<boolean>(false);
  const toggleLoading = () => setLoading((prevState) => !prevState);

  const placeholder: Placeholder = {
    title: usePlaceholder("Título"),
    clubId: usePlaceholder("Buscar un club..."),
  };

  const handleToggleRetroSwitch = () => editions.setDisabled((prevState) => !prevState);

  const handleInvalid = (errors: FieldErrors<ICreateProduct>): void => {
    setFormErrors(errors);
    const message = productImages.rules();
    if (message) productImages.setError({ message });
  };

  const handleCreateProduct = async (data: ICreateProduct): Promise<void> => {
    const message = productImages.rules();
    if (message) return productImages.setError({ message });

    try {
      toggleLoading();
      const images = productImages.getFiles();
      const jerseyCreated = await postJersey({ ...data, images });
      console.log("jerseyCreated:", { jerseyCreated });
    } catch (error) {
      console.info(error);
    } finally {
      toggleLoading();
    }
  };

  return {
    form: {
      title,
      clubId,
      editions,
      productImages,
    },
    handleCreateProduct,
    handleInvalid,
    handleSubmit,
    handleToggleRetroSwitch,
    loading,
    register,
    placeholder,
    setValue,
  };
};

export { usePage };
