"use client";

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
import { usePage } from "./page.model";
import styles from "./page.module.css";

export default function CreateProduct() {
  const {
    form,
    handleCreateProduct,
    handleInvalid,
    handleSubmit,
    handleToggleRetroSwitch,
    loading,
    register,
    placeholder,
    setValue,
  } = usePage();

  /* TODO: Add loader after submit. */
  return (
    <AdminThemeProvider>
      <main className="bg-transparent">
        <Title>Añadir Nuevo Producto</Title>
        <div className={`${styles.shadow} py-10 px-8 md:p-12 rounded-2xl bg-white`}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Producto" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="label-unit">Unidad</InputLabel>
                <Select
                  labelId="label-unit"
                  id="demo-simple-select"
                  value={""}
                  label="Unidad"
                  onChange={() => {}}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <button
            className="mt-8 py-2 px-5 rounded-lg font-semibold text-sm text-white bg-blue-500 shadow transition-[background] duration-150 ease-in-out hover:bg-blue-600"
            onClick={handleSubmit(handleCreateProduct, handleInvalid)}
          >
            Guardar Producto
          </button>
        </div>
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
