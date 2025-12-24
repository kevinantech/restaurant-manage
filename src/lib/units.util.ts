import { Units } from '@/inventory/domain/units-enum';

export const unitName = (unit: Units, plural = false) => {
  switch (unit) {
    case Units.LITER:
      return plural ? 'litros' : 'litro';
    case Units.KILOGRAM:
      return plural ? 'kilogramos' : 'kilogramo';
    default:
      return plural ? 'unidades' : 'unidad';
  }
};
