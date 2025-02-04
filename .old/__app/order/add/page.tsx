"use client";
import { CreateProductDto } from "@/backend/modules/product/application/dto/create-product.dto";
import { Title } from "@/frontend/components";
import {
  useCreateOrder,
  useCreateProduct,
  useInventory,
  useProducts,
} from "@/frontend/hooks";
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
import { CreateOrderDto } from "@/backend/modules/order/application/dto/create-order.dto";

type FormType = Omit<CreateOrderDto, "items"> & {
  items: string[];
};
export default function AddOrder() {
  const { register, handleSubmit, reset } = useForm<FormType>();
  const { handleCreate, loading } = useCreateOrder();
  const { products } = useProducts();

  /* TODO: Add loader after submit. */
  return (
    <AdminThemeProvider>
      <main className="bg-transparent">
        <Title>Añadir Nueva Orden</Title>
        <form
          onSubmit={handleSubmit(async (d) => {
            const formattedData: CreateOrderDto = {
              items: d.items.map((productId) => ({
                productId,
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
              <FormControl fullWidth>
                <InputLabel id="label-products">Productos</InputLabel>
                <Select
                  labelId="label-products"
                  label="Productos"
                  defaultValue={[]}
                  multiple
                  {...register("items", { required: true })}
                >
                  {products.map(({ id, name, price }) => (
                    <MenuItem key={id} value={id}>
                      {`${name} - ${price} COP`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <button
            type="submit"
            className="mt-8 py-2 px-5 rounded-lg font-semibold text-sm text-white bg-blue-500 shadow transition-[background] duration-150 ease-in-out hover:bg-blue-600"
          >
            Añadir Orden
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
