'use client';
import { Fragment, useCallback, useState } from 'react';

// mui-material
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { grey } from '@mui/material/colors';

// ui-components
import InputLabel from '@/components/form/InputLabel';

// hookform
import { zodResolver } from '@hookform/resolvers/zod';
import { Control, Controller, useForm } from 'react-hook-form';

// core
import {
  IngredientCategory,
  IngredientCategoryLabels,
} from '../../domain/enums/ingredient-category.enum';
import {
  MeasurementUnit,
  MeasurementUnitLabels,
} from '../../domain/enums/measurement-unit.enum';
import { createIngredient } from '../../infraestructure/actions/create-ingredient.action';
import {
  CreateIngredientBody,
  CreateIngredientBodySchema,
} from '../../infraestructure/dto/create-ingredient.dto';
import Toast from '@/components/Toast';

type FormType = CreateIngredientBody;

type Option = { value: string; label: string };

type BaseField = {
  name: keyof FormType;
  label: string;
  placeholder?: string;
  mdSize?: number;
};

type TextFieldConfig = BaseField & {
  type: 'text' | 'number';
  multiline?: boolean;
  normalize?: (value: string) => any;
};

type SelectFieldConfig = BaseField & {
  type: 'select';
  options: Option[];
};

export type FieldConfig = TextFieldConfig | SelectFieldConfig;

const fieldGroups: FieldConfig[][] = [
  // indentification fields
  [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      placeholder: 'Ej: Tomate Chonto',
    },
    {
      name: 'code',
      label: 'Código',
      type: 'text',
      placeholder: 'Ej: INS-001',
      normalize: (value) => value.toUpperCase().trim(),
    },
    {
      name: 'category',
      label: 'Categoría',
      type: 'select',
      placeholder: 'Selecciona una categoría',
      options: Object.values(IngredientCategory).map((category) => ({
        value: category,
        label: IngredientCategoryLabels[category],
      })),
    },
  ],
  // inventory control fields
  [
    {
      name: 'unit',
      label: 'Unidad de Medida',
      type: 'select',
      placeholder: 'Selecciona una unidad',
      options: Object.values(MeasurementUnit).map((unit) => ({
        value: unit,
        label: MeasurementUnitLabels[unit],
      })),
    },
    {
      name: 'minStock',
      label: 'Stock Mínimo',
      type: 'number',
      placeholder: 'Ej: 10',
      normalize: (value) => (value !== '' ? Number(value) : undefined),
    },
  ],

  // additional information fields
  [
    {
      name: 'notes',
      label: 'Notas:',
      type: 'text',
      placeholder: 'Ej: Proveedor local, uso diario',
      multiline: true,
      mdSize: 12,
    },
  ],
];

type GroupFieldsProps = {
  control: Control<FormType>;
  fields: FieldConfig[];
};

/**
 * https://mui.com/material-ui/react-grid/#multiple-breakpoints
 * https://www.react-hook-form.com/api/usecontroller/controller/
 */
const GroupFields: React.FC<GroupFieldsProps> = ({ control, fields }) => {
  return fields.map((item) => (
    <Grid key={item.name} size={{ xs: 12, md: item.mdSize ? item.mdSize : 4 }}>
      <Controller
        name={item.name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Stack>
            <InputLabel required={item.name !== 'notes'}>
              {item.label}
            </InputLabel>
            {item.type === 'select' ? (
              <TextField
                select
                fullWidth
                variant="outlined"
                name={field.name}
                value={field.value}
                onBlur={field.onBlur}
                onChange={field.onChange}
                error={!!error}
                helperText={error?.message}
                sx={{
                  /* placeholder */
                  '& .MuiSelect-select > span::before': {
                    content: `'${item.placeholder}'`,
                    fontWeight: 400,
                    color: grey[400],
                  },
                }}
              >
                {item.options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                fullWidth
                variant="outlined"
                multiline={item.multiline}
                type={!item.multiline ? item.type : undefined}
                name={field.name}
                value={field.value ?? ''}
                onBlur={field.onBlur}
                onChange={(event) => {
                  const value = event.target.value;
                  field.onChange(
                    item.normalize ? item.normalize(value) : value
                  );
                }}
                placeholder={item.placeholder}
                error={!!error}
                helperText={error?.message}
              />
            )}
          </Stack>
        )}
      />
    </Grid>
  ));
};

type ResponseType = Awaited<ReturnType<typeof createIngredient>>;
const useCreateIngredientPage = () => {
  const [response, setResponse] = useState<ResponseType>();
  const form = useForm<FormType>({
    resolver: zodResolver(CreateIngredientBodySchema),
    defaultValues: {
      name: '',
      code: '',
      category: '' as any,
      unit: '' as any,
      minStock: '' as any,
      notes: '',
    },
  });

  const handleToastClose = useCallback(() => setResponse(undefined), []);

  const handleCreate = async (data: FormType) => {
    const result = await createIngredient(data);
    setResponse(
      result.status === 'success'
        ? { ...result, message: 'Insumo creado correctamente' }
        : result
    );
    if (result.status === 'success') form.reset();
  };

  return {
    form,
    handleCreate,
    handleToastClose,
    response,
  };
};

export default function CreateIngredientPage() {
  const { form, handleCreate, handleToastClose, response } =
    useCreateIngredientPage();

  const divider = (
    <Grid size={12}>
      <Divider />
    </Grid>
  );

  const submitButton = (
    <Grid size={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button type="submit" variant="contained" color="primary">
        Agregar Insumo
      </Button>
    </Grid>
  );

  const emptySpace = <Grid size={12} />;

  return (
    <>
      <Card sx={{ borderRadius: '0.5rem' /* 8px */, boxShadow: 'none' }}>
        <CardHeader title="Crear Insumo" />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
            component="form"
            autoComplete="off"
            onSubmit={form.handleSubmit(handleCreate)}
          >
            {fieldGroups.map((group, index) => (
              <Fragment key={`Group-${index}`}>
                <GroupFields control={form.control} fields={group} />
                {divider}
              </Fragment>
            ))}
            {submitButton}
            {emptySpace}
          </Grid>
        </CardContent>
        {form.formState.isSubmitting && <LinearProgress color="primary" />}
      </Card>
      <Toast
        open={!!response}
        severity={response?.status}
        message={response?.message}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        onClose={handleToastClose}
      />
    </>
  );
}
