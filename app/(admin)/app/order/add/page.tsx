'use client';
import {
  CreateOrderBody,
  CreateOrderBodySchema,
  OrderProductBody,
} from '@/order/domain/order.entity';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Backdrop,
  Button,
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Title } from 'app/_components';
import { useHandler } from 'app/_hooks/useHandler';
import { useProducts } from 'app/_hooks/useProducts';
import { ThemeProvider } from 'app/_providers/ThemeProvider';
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
    resolver: zodResolver(CreateOrderBodySchema),
    defaultValues: { products: [{ id: '' } as OrderProductBody] },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });
  const { handler, isLoading, error } = useHandler();

  const handleCreate = async (data: CreateOrderBody) => {
    await handler(async () => {
      const response = await createOrder(data);
      if (response.status === 'success') reset();
      else if (response.status === 'error' && response.message) {
        throw new Error(response.message);
      }
    });
  };

  const handleAppendProduct = () => append({ id: '' } as OrderProductBody);

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
  const { products } = useProducts();

  const renderProductsField = form.products.fields.map((field, index) => {
    return (
      <div key={field.id}>
        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <FormControl
              fullWidth
              error={
                form.errors.products
                  ? !!form.errors.products[index]?.id
                  : undefined
              }
            >
              <InputLabel id="label-product">Producto</InputLabel>
              <Select
                labelId="label-product"
                label="Producto"
                defaultValue=""
                {...form.register(`products.${index}.id` as const)}
              >
                <MenuItem value="">Selecciona un producto</MenuItem>
                {products.map(({ id, name }) => (
                  <MenuItem key={`${field.id}-${id}`} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {!!form.errors.products &&
                  form.errors.products[index]?.id?.message}
              </FormHelperText>
            </FormControl>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="number"
              label="Cantidad"
              {...form.register(`products.${index}.quantity`, {
                setValueAs: (value) =>
                  !isNaN(value) ? Number(value) : undefined,
              })}
              error={
                form.errors.products
                  ? !!form.errors.products[index]?.quantity
                  : false
              }
              helperText={
                form.errors.products
                  ? form.errors.products[index]?.quantity?.message
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
    <ThemeProvider>
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
