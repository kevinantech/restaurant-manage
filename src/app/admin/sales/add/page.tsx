"use client";
import { ISale } from "@/backend/modules/sale/domain/sale.entity";
import { Title } from "@/components/admin";
import { useProducts } from "@/hooks";
import { useRegisterSale } from "@/hooks/useRegisterSale";
import { AdminThemeProvider } from "@/providers";
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

export type S = Omit<ISale, "id">;

export default function RegisterSale() {
  const { register, handleSubmit, reset } = useForm<S>();
  const { products } = useProducts();
  const { handleRegister, loading } = useRegisterSale();

  /* TODO: Add loader after submit. */
  return (
    <AdminThemeProvider>
      <main className="bg-transparent">
        <Title>Añadir Nueva Venta</Title>
        <form
          onSubmit={handleSubmit(async (saleData) => {
            handleRegister(saleData);
            reset();
          })}
          className={`${styles.shadow} py-10 px-8 md:p-12 rounded-2xl bg-white`}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Descripción"
                {...register("description", { required: true })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="label-unit">Productos</InputLabel>
                <Select
                  labelId="label-unit"
                  label="Productos"
                  defaultValue={[]}
                  multiple
                  {...register("products", { required: true })}
                >
                  {products.map(({ id, name }) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Ingreso"
                {...register("income", { required: true })}
              />
            </Grid>
          </Grid>
          <button
            type="submit"
            className="mt-8 py-2 px-5 rounded-lg font-semibold text-sm text-white bg-blue-500 shadow transition-[background] duration-150 ease-in-out hover:bg-blue-600"
          >
            Guardar Venta
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
