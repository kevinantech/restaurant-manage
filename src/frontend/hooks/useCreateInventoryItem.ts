"use client";
import { CreateProductEntryDto } from "@/backend/modules/product-entry/application/dto/create-product-entry.dto";
import { API } from "@/frontend/common/constants/api-enum";
import { useState } from "react";

/* type R = ServerResponse; */
const fetcher = (data: CreateProductEntryDto) =>
  fetch(API.INVENTORY, {
    method: "POST",
    body: JSON.stringify(data),
  });

const useCreateInventoryItem = () => {
  const [error, setError] = useState<{ message: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const toggleLoading = () => setLoading((prevState) => !prevState);

  const handleCreate = async (data: CreateProductEntryDto) => {
    const unitWeight = Number(data.unitWeight);
    data.unitWeight = isNaN(unitWeight) ? 0 : unitWeight;
    try {
      toggleLoading();
      await fetcher(data).then(async (res) => await res.json());
    } catch (e: any) {
      console.warn(e.message);
    } finally {
      toggleLoading();
    }
  };

  return { handleCreate, loading, error, setError };
};

export { useCreateInventoryItem };
