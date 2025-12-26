'use client';
import { Fragment } from 'react';

// mui-material
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

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
import {
  AddIngredientBody,
  AddIngredientBodySchema,
} from '../../infraestructure/dto/add-ingredient.dto';

type FormType = AddIngredientBody;

type Option = { value: string; label: string };

type FieldConfig =
  | {
      name: keyof FormType;
      label: string;
      type: 'text' | 'number';
      placeholder: string;
    }
  | { name: keyof FormType; label: string; type: 'select'; options: Option[] };

const fieldGroups: FieldConfig[][] = [
  // indentification fields
  [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      placeholder: '',
    },
    {
      name: 'code',
      label: 'Código',
      type: 'text',
      placeholder: '',
    },
    {
      name: 'category',
      label: 'Categoría',
      type: 'select',
      options: [
        { value: '', label: 'Seleccione una categoría' },
        ...Object.values(IngredientCategory).map((category) => ({
          value: category,
          label: IngredientCategoryLabels[category],
        })),
      ],
    },
  ],
  // inventory control fields
  [
    {
      name: 'unit',
      label: 'Unidad de Medida',
      type: 'select',
      options: [
        { value: '', label: 'Seleccione una unidad de medida' },
        ...Object.values(MeasurementUnit).map((unit) => ({
          value: unit,
          label: MeasurementUnitLabels[unit],
        })),
      ],
    },
    {
      name: 'minStock',
      label: 'Stock Mínimo',
      type: 'number',
      placeholder: '',
    },
  ],

  // additional information fields
  [
    {
      name: 'notes',
      label: 'Notas',
      type: 'text',
      placeholder: '',
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
    <Grid key={item.name} size={{ xs: 12, md: 4 }}>
      <Controller
        name={item.name}
        control={control}
        render={({ field }) => (
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
                type={item.type}
                name={field.name}
                value={field.value}
                onBlur={field.onBlur}
                onChange={field.onChange}
                placeholder={item.placeholder}
              />
            )}
          </Stack>
        )}
      />
    </Grid>
  ));
};

const useAddIngredientPage = () => {
  const form = useForm<FormType>({
    resolver: zodResolver(AddIngredientBodySchema),
    defaultValues: {
      name: '',
      code: '',
      category: '' as any,
      unit: '' as any,
      minStock: '' as any,
      notes: '',
    },
  });

  const control = form.control;

  return { form };
};
0;
export default function AddIngredientPage() {
  const { form } = useAddIngredientPage();

  return (
    <Card sx={{ borderRadius: '0.5rem' /* 8px */, boxShadow: 'none' }}>
      <CardHeader title="Agregar Ingrediente" />
      <Divider />
      <CardContent>
        <Grid component="form" container spacing={3}>
          {fieldGroups.map((group, index) => (
            <Fragment key={`Group-${index}`}>
              <GroupFields control={form.control} fields={group} />
              {index < fieldGroups.length - 1 && (
                <Grid size={12}>
                  <Divider />
                </Grid>
              )}
            </Fragment>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
