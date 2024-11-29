"use client";
import { CreateProductDto } from "@/backend/modules/product/application/dto/create-product.dto";
import { Title } from "@/frontend/components";
import { useCreateProduct, useInventory } from "@/frontend/hooks";
import { AdminThemeProvider } from "@/frontend/providers";
import {
  Backdrop,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import styles from "./page.module.css";

type FormType = Omit<CreateProductDto, "ingredients"> & {
  ingredients: string[];
};
export default function AddOrder() {
  const { register, handleSubmit, reset } = useForm<FormType>();
  const { handleCreate, loading } = useCreateProduct();
  const { inventory } = useInventory();

  /* TODO: Add loader after submit. */
  return (
    <AdminThemeProvider>
      <main className="bg-transparent">
        <Title>Añadir Nuevo Producto</Title>
        <form
          onSubmit={handleSubmit(async (d) => {
            const formattedData: CreateProductDto = {
              ...d,
              ingredients: d.ingredients.map((ingr) => ({
                inventoryItemId: ingr,
                quantity: 1,
              })),
            };
            await handleCreate(formattedData);
            reset();
          })}
          className={`${styles.shadow} py-10 px-8 md:p-12 rounded-2xl bg-white`}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Producto"
                {...register("name", { required: true })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                defaultValue=""
                label="Descripción"
                {...register("description")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="label-ingredientes">Ingredientes</InputLabel>
                <Select
                  labelId="label-ingredientes"
                  label="Ingredientes"
                  defaultValue={[]}
                  multiple
                  {...register("ingredients", { required: true })}
                >
                  {inventory.map(({ id, name, unitWeight, unitOfMeasure }) => (
                    <MenuItem key={id} value={id}>
                      {`${name} - ${unitWeight} ${unitOfMeasure}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Precio de venta"
                {...register("price", { min: 10000, valueAsNumber: true })}
              />
            </Grid>
          </Grid>
          <button
            type="submit"
            className="mt-8 py-2 px-5 rounded-lg font-semibold text-sm text-white bg-blue-500 shadow transition-[background] duration-150 ease-in-out hover:bg-blue-600"
          >
            Guardar Producto
          </button>
        </form>
      </main>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <LinearProgress
          className="absolute top-0 w-full"
          sx={{ color: "rgb(59, 130, 246)" /* => bg-blue-500 */ }}
        />
      </Backdrop>
    </AdminThemeProvider>
  );
}
