/* eslint-disable react-hooks/exhaustive-deps */
import { ICreateProduct } from "@/common/interfaces";
import { generateKey } from "@/common/utils";
import { SelectChangeEvent } from "@mui/material";
import { useEffect, useState, ChangeEvent, FocusEvent } from "react";
import { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";

export type ProductImageItem = {
  file: File;
  key: string;
  isCover: boolean;
};

type ErrorState = {
  message: string | undefined;
};

type UseFieldParams = {
  formErrors: FieldErrors<ICreateProduct>;
  name: keyof ICreateProduct;
  options?: RegisterOptions<ICreateProduct>;
  register: UseFormRegister<ICreateProduct>;
};

const useTitleField = ({ formErrors, name, register, options }: UseFieldParams) => {
  const { onBlur, onChange, ref } = register(name, options);
  const [error, setError] = useState<ErrorState>();
  const required = typeof options?.required === "string" ? options.required : undefined;

  /* Sets error when the current input has something error from the form. */
  useEffect(() => {
    if (formErrors && !!formErrors[name])
      setError({ message: formErrors[name]?.message });
  }, [formErrors]);

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    onBlur(event);
    const inputValue = event.target.value.trim();

    if (!inputValue && !error && options?.required) {
      return setError({ message: required });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(event);
    const inputValue = event.target.value.trim();

    if (!inputValue && !error && options?.required) {
      return setError({ message: required });
    }

    if (inputValue && !!error) {
      return setError(undefined);
    }
  };

  return {
    name,
    onBlur: handleBlur,
    onChange: handleChange,
    ref,
    error,
    setError,
  };
};

const useClubField = ({ formErrors, name, register, options }: UseFieldParams) => {
  /* Allows the register options will be registered for the form rules */
  register(name, options);

  const [error, setError] = useState<ErrorState>();

  /* Sets error when the current input has something error from the form. */
  useEffect(() => {
    if (formErrors && !!formErrors[name])
      setError({ message: formErrors[name]?.message });
  }, [formErrors]);

  return {
    error,
    setError,
  };
};

const useEditionField = ({ formErrors, name, register, options }: UseFieldParams) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const { onBlur, onChange, ref } = register(name, {
    ...options,
    required: disabled ? false : true,
  });
  const [error, setError] = useState<ErrorState>();
  const required = typeof options?.required === "string" ? options.required : undefined;

  /* Sets error when the current input has something error from the form. */
  useEffect(() => {
    if (formErrors && !!formErrors[name] && !disabled)
      setError({ message: formErrors[name]?.message });
  }, [formErrors]);

  /* Remove error state if it is disabled. */
  useEffect(() => {
    if (disabled && !!error) setError(undefined);
  }, [disabled]);

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    onBlur(event);
    const inputValue = event.target.value;

    if (inputValue.length === 0 && !error && options?.required) {
      return setError({ message: required });
    }
  };

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    onChange(event);
    const inputValue = event.target.value;

    if (inputValue.length === 0 && !error && options?.required) {
      return setError({ message: required });
    }

    if (inputValue.length !== 0 && !!error) {
      return setError(undefined);
    }
  };

  return {
    name,
    onBlur: handleBlur,
    onChange: handleChange,
    ref,
    error,
    disabled,
    setDisabled,
  };
};

const useImageField = () => {
  const [error, setError] = useState<ErrorState>();
  const [items, setItems] = useState<ProductImageItem[]>([]);

  const maxImages = 10;
  const messages = {
    required: "Este campo es requerido.",
    notIsCover: "Selecciona la portada del producto.",
  };

  /* Remove the error if it has been displayed before, when adding an image */
  useEffect(() => {
    const coverIsSetted = items.some((item) => item.isCover);
    if (!!error && items.length !== 0 && coverIsSetted) setError(undefined);
    if (!!error && items.length === 0) setError({ message: messages.required });
  }, [items]);

  const addImages = (fileList: FileList | null) => {
    if (fileList) {
      const remainingPositions = maxImages - items.length;
      if (remainingPositions > 0) {
        const entries = mapFileListToProductImageItems(fileList);
        const entriesTrimmed = entries.slice(0, remainingPositions);
        setItems((prevState) => [...prevState, ...entriesTrimmed]);
      }
    }
  };

  const removeImageByKey = (key: string) => {
    const updatedItems = items.filter(({ key: imageKey }) => imageKey !== key);
    setItems(updatedItems);
  };

  const rules = () => {
    if (items.length === 0) return messages.required;
    if (items.every((item) => item.isCover === false)) return messages.notIsCover;
    return undefined;
  };

  const setProductCoverByKey = (key: string) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) => ({
        ...item,
        isCover: item.key === key,
      }));
      return updatedItems;
    });
  };

  /** Util */
  const mapFileListToProductImageItems = (fileList: FileList): ProductImageItem[] => {
    const transformedFileList = Array.from(fileList);
    return transformedFileList.map((file) => ({
      file,
      isCover: false,
      key: generateKey(file.name),
    }));
  };

  /* Transform to array files, move the cover at the start of the array */
  const getFiles = () => {
    const coverIndex = items.findIndex((item) => item.isCover);
    if (coverIndex === -1) throw new Error("Index of product cover was not found");
    const files = items.map((item) => item.file);
    const cover = files[coverIndex];
    files.splice(coverIndex, 1);
    files.unshift(cover);
    return files;
  };

  return {
    addImages,
    getFiles,
    items,
    messages,
    removeImageByKey,
    rules,
    error,
    setError,
    setProductCoverByKey,
  };
};

export { useTitleField, useClubField, useEditionField, useImageField };
