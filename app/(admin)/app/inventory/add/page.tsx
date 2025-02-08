"use client";
import { Units } from "@/backend/common/constants/units-enum";
import { IProduct } from "@/backend/modules/product/domain/product.entity";
import { Title } from "@/frontend/components";
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
import { useCreateInventoryItem } from "@/frontend/hooks";
import { CreateProductEntryDto } from "@/backend/modules/product-entry/application/dto/create-product-entry.dto";
import { ProductEntryCategory } from "@/backend/modules/product-entry/domain/product-entry-category-enum";

export type P = Omit<IProduct, "currentAmount" | "id">;

export default function RegisterProduct() {
  const { register, handleSubmit, reset } = useForm<CreateProductEntryDto>();
  const { handleCreate, loading } = useCreateInventoryItem();

  /* TODO: Add loader after submit. */
  return (
    <AdminThemeProvider>
      <main className="bg-transparent">
        <Title>Añadir Nuevo Insumo</Title>
        <form
          onSubmit={handleSubmit(async (d) => {
            await handleCreate(d);
            reset();
          })}
          className={`${styles.shadow} py-10 px-8 md:p-12 rounded-2xl bg-white`}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Insumo"
                {...register("name", { required: true })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="label-category">Tipo</InputLabel>
                <Select
                  labelId="label-category"
                  label="Tipo"
                  defaultValue={""}
                  {...register("category", { required: true })}
                >
                  <MenuItem value={ProductEntryCategory.BEVERAGES}>
                    {ProductEntryCategory.BEVERAGES}
                  </MenuItem>
                  <MenuItem value={ProductEntryCategory.DAIRY}>
                    {ProductEntryCategory.DAIRY}
                  </MenuItem>
                  <MenuItem value={ProductEntryCategory.FROZEN}>
                    {ProductEntryCategory.FROZEN}
                  </MenuItem>
                  <MenuItem value={ProductEntryCategory.FRUITS}>
                    {ProductEntryCategory.FRUITS}
                  </MenuItem>
                  <MenuItem value={ProductEntryCategory.GRAINS}>
                    {ProductEntryCategory.GRAINS}
                  </MenuItem>
                  <MenuItem value={ProductEntryCategory.MEATS}>
                    {ProductEntryCategory.MEATS}
                  </MenuItem>
                  <MenuItem value={ProductEntryCategory.OILS}>
                    {ProductEntryCategory.OILS}
                  </MenuItem>
                  <MenuItem value={ProductEntryCategory.SPICES}>
                    {ProductEntryCategory.SPICES}
                  </MenuItem>
                  <MenuItem value={ProductEntryCategory.VEGETABLES}>
                    {ProductEntryCategory.VEGETABLES}
                  </MenuItem>
                  <MenuItem value={ProductEntryCategory.OTHERS}>
                    {ProductEntryCategory.OTHERS}
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="label-unitOfMeasure">Unidad regular</InputLabel>
                <Select
                  labelId="label-unitOfMeasure"
                  label="Unidad regular"
                  defaultValue={Units.DEFAULT}
                  {...register("unitOfMeasure")}
                >
                  <MenuItem value={Units.DEFAULT}>Defecto</MenuItem>
                  <MenuItem value={Units.KILOGRAM}>kg</MenuItem>
                  <MenuItem value={Units.GRAM}>g</MenuItem>
                  <MenuItem value={Units.LITER}>L</MenuItem>
                  <MenuItem value={Units.MILILITER}>mL</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                inputProps={{ inputMode: "decimal" }}
                label="Contenido neto por unidad"
                {...register("unitWeight", { required: true })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Stock"
                {...register("stock", { valueAsNumber: true })}
              />
            </Grid>
          </Grid>
          <button
            type="submit"
            className="mt-8 py-2 px-5 rounded-lg font-semibold text-sm text-white bg-blue-500 shadow transition-[background] duration-150 ease-in-out hover:bg-blue-600"
          >
            Guardar Insumo
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
