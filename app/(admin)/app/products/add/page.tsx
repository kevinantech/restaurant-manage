'use client';
import {
  CreateProductBody,
  CreateProductBodySchema,
  ProductRecipe,
} from '@/product/domain/product.entity';
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
import { useInventory } from 'app/_hooks/useInventory';
import { useMemo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { createProduct } from '../actions';

const useRegisterProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    watch,
    getValues,
  } = useForm<CreateProductBody>({
    defaultValues: { recipe: [{ id: '' }] },
    resolver: zodResolver(CreateProductBodySchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'recipe',
  });
  const { handler, isLoading, error } = useHandler();

  const handleRegister = async (body: CreateProductBody) => {
    await handler(async () => {
      const response = await createProduct(body);
      if (response.status === 'success') return reset();
      else if (response.status === 'error' && response.message) {
        throw new Error(response.message);
      }
    });
  };

  const handleAppendIngredient = () => append({ id: '' } as ProductRecipe);

  return {
    form: {
      register,
      handleSubmit,
      reset,
      errors,
      getValues,
      recipe: {
        value: watch('recipe'),
        fields,
        remove,
      },
    },
    handleRegister,
    handleAppendIngredient,
    loading: isLoading,
    error,
  };
};

export default function RegisterProduct() {
  const { form, handleRegister, handleAppendIngredient, loading, error } =
    useRegisterProduct();
  const { inventory, inventoryById } = useInventory();

  /**
   * form.recipe.values contains the updated ingredients. But without reference updating.
   * Then, use the watch prop from useForm, for array values dont allow to update the view,
   * because always holds the same reference.
   * This state forces the trigger.
   */
  const [isModifiedIngredients, setModifiedIngredients] = useState(0);
  const triggerIngredientsModified = () =>
    setModifiedIngredients((prevState) => prevState + 1);

  const unselectIngredients = useMemo(() => {
    return inventory.filter(
      (item) =>
        form.recipe.value
          .map((ingredient) => ingredient.id)
          .includes(item.id) === false
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModifiedIngredients, form.recipe.fields, inventory]);

  // Manejo dinamico de los inputs
  const renderIngrendientsField = form.recipe.fields.map((field, index) => {
    const ingredientId = form.getValues(`recipe.${index}.id`);
    const name = inventoryById[ingredientId]?.name;
    return (
      <div key={field.id}>
        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <FormControl
              fullWidth
              error={
                form.errors.recipe ? !!form.errors.recipe[index]?.id : undefined
              }
            >
              <InputLabel id="label-ingredient">Ingrediente</InputLabel>
              <Select
                labelId="label-ingredient"
                label="Ingrediente"
                defaultValue=""
                {...form.register(`recipe.${index}.id` as const)}
              >
                {!!name && <MenuItem value={ingredientId}>{name}</MenuItem>}
                {unselectIngredients.map(({ id, name }) => (
                  <MenuItem
                    key={`${field.id}-${id}`}
                    value={id}
                    onClick={
                      triggerIngredientsModified /* When one option is clicked, the picked ingredients changes */
                    }
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {!!form.errors.recipe && form.errors.recipe[index]?.id?.message}
              </FormHelperText>
            </FormControl>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Cantidad"
              {...form.register(`recipe.${index}.quantity`, {
                setValueAs: (value) =>
                  !isNaN(value) ? Number(value) : undefined,
              })}
              error={
                form.errors.recipe
                  ? !!form.errors.recipe[index]?.quantity
                  : false
              }
              helperText={
                form.errors.recipe
                  ? form.errors.recipe[index]?.quantity?.message
                  : undefined
              }
            />
          </Grid2>
        </Grid2>
        {index !== 0 && (
          <button
            onClick={() => form.recipe.remove(index)}
            className="mt-1 ml-2 text-sm text-red-600 font-medium underline bg-transparent"
          >
            Remover
          </button>
        )}
      </div>
    );
  });

  return (
    <>
      <main className="max-w-3xl space-y-10 mx-auto">
        <Title>Añadir Nuevo Producto</Title>
        <form
          onSubmit={form.handleSubmit(handleRegister)}
          className="space-y-5"
        >
          <Grid2 container spacing={4}>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Producto"
                {...form.register('name', {
                  required: 'Ingrese el nombre del producto',
                })}
                error={!!form.errors.name}
                helperText={form.errors.name?.message}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                defaultValue=""
                label="Descripción"
                {...form.register('description')}
                error={!!form.errors.description}
                helperText={form.errors.description?.message}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Precio de venta"
                {...form.register('price', {
                  setValueAs: (value) =>
                    !isNaN(value) ? Number(value) : undefined,
                })}
                error={!!form.errors.price}
                helperText={form.errors.price?.message}
              />
            </Grid2>
          </Grid2>
          <div>
            <p className="font-semibold">Receta</p>
            <hr className="mt-2" />
          </div>
          {renderIngrendientsField}
          <div className="flex gap-2">
            <Button variant="contained" type="submit">
              Guardar Producto
            </Button>
            <Button
              onClick={handleAppendIngredient}
              variant="outlined"
              className="font-semibold"
            >
              Agregar Ingrediente
            </Button>
          </div>
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
