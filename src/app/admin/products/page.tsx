"use client";
import { EAdminPaths } from "@/common/constants/paths-enum";
import { SearchBar, Title, PrimaryButton } from "@/components/admin";
import AddIcon from "@mui/icons-material/Add";

import { useRouter } from "next/navigation";

const ProductBar = () => {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-4 justify-between mb-5">
      <SearchBar
        className="min-w-full semi-sm:min-w-[20rem]"
        placeholder="Buscar un Producto..."
      />
      <PrimaryButton
        className="min-w-full semi-sm:min-w-[auto]"
        label="Añadir producto"
        onClick={() => router.push(EAdminPaths.PRODUCTS + "/create")}
      >
        <AddIcon />
      </PrimaryButton>
    </div>
  );
};

export default function Products() {
  return (
    <main className="bg-transparent">
      <Title>Lista de Productos</Title>
      <ProductBar />
      <span>Tabla de productos...</span>
    </main>
  );
}
