'use client';
import {
  createOrderBody,
  CreateOrderBody,
  OrderItemBody,
} from '@/order/domain/order.entity';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Backdrop,
  Button,
  createTheme,
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
} from '@mui/material';
import { globalTheme } from 'app/_common/constants/styles/global-theme';
import { Title } from 'app/_components';
import { useHandler } from 'app/_hooks/useHandler';
import { useFieldArray, useForm } from 'react-hook-form';
import { createOrder } from '../actions';

const useCreateOrder = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<CreateOrderBody>({
    resolver: zodResolver(createOrderBody),
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'items' });
  const { handler, isLoading, error } = useHandler();

  const handleCreate = async (data: CreateOrderBody) => {
    await handler(async () => {
      const response = await createOrder(data);
      if (response.code === 'OK') reset();
      else if (!Array.isArray(response.message))
        throw new Error(response.message);
    });
  };

  const handleAppendProduct = () =>
    append({ productId: '', quantity: 0 } as OrderItemBody);

  return {
    form: {
      register,
      handleSubmit,
      errors,
      products: {
        fields,
        remove,
      },
    },
    error,
    loading: isLoading,
    handleCreate,
    handleAppendProduct,
  };
};

export default function CreateOrder() {
  const { form, handleCreate, handleAppendProduct, loading } = useCreateOrder();
  /* const { products } = useProducts(); */

  const renderProductsField = form.products.fields.map((field, index) => {
    return (
      <div key={field.id}>
        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <FormControl
              fullWidth
              error={
                form.errors.items
                  ? !!form.errors.items[index]?.productId
                  : undefined
              }
            >
              <InputLabel id="label-product">Producto</InputLabel>
              <Select
                labelId="label-product"
                label="Producto"
                defaultValue=""
                {...form.register(`items.${index}.productId` as const)}
              >
                {[{ id: '', name: 'Selecciona un producto' }].map(
                  ({ id, name }) => (
                    <MenuItem key={`${field.id}-${id}`}>{name}</MenuItem>
                  )
                )}
              </Select>
              <FormHelperText>
                {!!form.errors.items &&
                  form.errors.items[index]?.productId?.message}
              </FormHelperText>
            </FormControl>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="number"
              label="Cantidad"
              {...form.register(`items.${index}.quantity`, {
                setValueAs: (value) =>
                  !isNaN(value) ? Number(value) : undefined,
              })}
              error={
                form.errors.items ? !!form.errors.items[index]?.quantity : false
              }
              helperText={
                form.errors.items
                  ? form.errors.items[index]?.quantity?.message
                  : undefined
              }
            />
          </Grid2>
        </Grid2>
        {index !== 0 && (
          <button
            onClick={() => form.products.remove(index)}
            className="mt-1 ml-2 text-sm text-red-600 font-medium underline bg-transparent"
          >
            Remover
          </button>
        )}
      </div>
    );
  });

  return (
    <ThemeProvider theme={createTheme(globalTheme)}>
      <main className="max-w-3xl space-y-10 mx-auto">
        <Title>Añadir Nueva Orden</Title>
        <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-5">
          {renderProductsField}
          <div className="flex gap-2">
            <Button variant="contained" type="submit">
              Registrar Orden
            </Button>
            <Button
              onClick={handleAppendProduct}
              variant="outlined"
              className="font-semibold"
            >
              Agregar Producto
            </Button>
          </div>
        </form>
      </main>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <LinearProgress className="absolute top-0 w-full" />
      </Backdrop>
    </ThemeProvider>
  );
}
