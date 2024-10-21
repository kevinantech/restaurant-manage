"use client";
import { Units } from "@/backend/common/constants/units-enum";
import { IProduct } from "@/backend/modules/product/domain/product.entity";
import { Title } from "@/components/admin";
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
import { useRegisterProduct } from "@/hooks";

export default function RegisterProduct() {
  const { register, handleSubmit, reset } = useForm<IProduct>();
  const { handleRegister, loading } = useRegisterProduct();

  /* TODO: Add loader after submit. */
  return (
    <AdminThemeProvider>
      <main className="bg-transparent">
        <Title>Añadir Nuevo Producto</Title>
        <form
          onSubmit={handleSubmit(async (productData) => {
            await handleRegister(productData);
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
              <FormControl fullWidth>
                <InputLabel id="label-unit">Unidad regular</InputLabel>
                <Select
                  labelId="label-unit"
                  id="demo-simple-select"
                  label="Unidad regular"
                  defaultValue={""}
                  {...register("unit", { required: true })}
                >
                  <MenuItem value={Units.kg}>kg</MenuItem>
                  <MenuItem value={Units.g}>g</MenuItem>
                  <MenuItem value={Units.L}>L</MenuItem>
                  <MenuItem value={Units.mL}>mL</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Cantidad de unidades"
                {...register("quantity", { required: true })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Contenido neto por unidad"
                {...register("unitContent", { required: true })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Costo de compra"
                {...register("cost", { required: true })}
              />
            </Grid>
          </Grid>
          <button className="mt-8 py-2 px-5 rounded-lg font-semibold text-sm text-white bg-blue-500 shadow transition-[background] duration-150 ease-in-out hover:bg-blue-600">
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
