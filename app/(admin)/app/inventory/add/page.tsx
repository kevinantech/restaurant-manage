'use client';
import {
  CreateInventoryItemBody,
  CreateInventoryItemBodySchema,
} from '@/inventory/domain/inventory-item.entity';
import { Units } from '@/inventory/domain/units-enum';
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
import { useForm } from 'react-hook-form';
import { createInventoryItem } from '../actions';

const useRegisterInventory = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateInventoryItemBody>({
    resolver: zodResolver(CreateInventoryItemBodySchema),
  });
  const { handler, isLoading, error } = useHandler();

  const handleRegister = async (data: CreateInventoryItemBody) => {
    await handler(async () => {
      const response = await createInventoryItem(data);
      if (response.status === 'success') return reset();
      else if (response.status === 'error' && response.message) {
        throw new Error(response.message);
      }
    });
  };

  return {
    form: {
      register,
      handleSubmit,
      reset,
      errors,
    },
    handleRegister,
    loading: isLoading,
    error,
  };
};

export default function RegisterInventory() {
  const { form, handleRegister, loading, error } = useRegisterInventory();

  return (
    <>
      <main className="max-w-3xl space-y-10 mx-auto">
        <Title>Añadir Nuevo Insumo</Title>
        <form
          onSubmit={form.handleSubmit(handleRegister)}
          className="space-y-5"
        >
          <Grid2 container spacing={4}>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Nombre"
                color="secondary"
                {...form.register('name')}
                error={!!form.errors.name}
                helperText={form.errors.name?.message}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <FormControl
                fullWidth
                error={!!form.errors.unitOfMeasure}
                color="secondary"
              >
                <InputLabel id="label-unitOfMeasure">Unidad regular</InputLabel>
                <Select
                  labelId="label-unitOfMeasure"
                  label="Unidad regular"
                  defaultValue={Units.DEFAULT}
                  {...form.register('unitOfMeasure')}
                >
                  <MenuItem value={Units.DEFAULT}>UNIDAD</MenuItem>
                  <MenuItem value={Units.KILOGRAM}>KG</MenuItem>
                  <MenuItem value={Units.GRAM}>G</MenuItem>
                  <MenuItem value={Units.LITER}>L</MenuItem>
                  <MenuItem value={Units.MILILITER}>ML</MenuItem>
                </Select>
                <FormHelperText>
                  {form.errors.unitOfMeasure?.message}
                </FormHelperText>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Precio unitario"
                slotProps={{ htmlInput: { step: 0.1 } }}
                {...form.register('unitPrice', {
                  setValueAs: (value) =>
                    !isNaN(value) ? Number(value) : undefined,
                })}
                error={!!form.errors.unitPrice}
                helperText={form.errors.unitPrice?.message}
                color="secondary"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Stock"
                {...form.register('stock', {
                  setValueAs: (value) =>
                    !isNaN(value) ? Number(value) : undefined,
                })}
                error={!!form.errors.stock}
                helperText={form.errors.stock?.message}
                color="secondary"
              />
            </Grid2>
          </Grid2>
          <Button variant="contained" type="submit" className="bg-pompadour">
            Guardar Insumo
          </Button>
          {!!error && (
            <div className="w-fit py-2 px-5 border rounded-md border-red-500 text-sm text-red-700 font-medium bg-red-100">
              {error}
            </div>
          )}
        </form>
      </main>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <LinearProgress className="absolute top-0 w-full" />
      </Backdrop>
    </>
  );
}
