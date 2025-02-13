'use client';
import { CreateInventoryItemDto } from '@/inventory/application/dto/create-inventory-item.dto';
import { Units } from '@/shared/_common/constants/units-enum';
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
import { createInventoryItem } from 'app/actions';
import { useForm } from 'react-hook-form';

export type FormType = Pick<
  CreateInventoryItemDto,
  'name' | 'unitOfMeasure' | 'unitPrice' | 'stock'
>;

const useRegisterInventory = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateInventoryItemDto>();
  const { handler, isLoading, error } = useHandler();

  const handleRegister = async (data: FormType) => {
    await handler(async () => {
      const response = await createInventoryItem(data);
      if (response.code === 'OK') return reset();
      else if (!Array.isArray(response.message))
        throw new Error(response.message);
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
    <ThemeProvider theme={createTheme(globalTheme)}>
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
                {...form.register('name', { required: 'Ingrese el nombre' })}
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
                inputProps={{ inputMode: 'decimal' }}
                label="Precio unitario"
                {...form.register('unitPrice', {
                  required: 'Ingrese el precio',
                })}
                error={!!form.errors.unitPrice}
                helperText={form.errors.unitPrice?.message}
                color="secondary"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Stock"
                {...form.register('stock', { valueAsNumber: true })}
                error={!!form.errors.stock}
                helperText={form.errors.stock?.message}
                color="secondary"
              />
            </Grid2>
          </Grid2>
          <Button variant="contained" type="submit">
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
    </ThemeProvider>
  );
}
