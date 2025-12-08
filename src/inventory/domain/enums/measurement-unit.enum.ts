export enum MeasurementUnit {
  // Peso
  KG = 'KG',
  G = 'G',
  LB = 'LB',
  OZ = 'OZ',

  // Volumen
  L = 'L',
  ML = 'ML',
  GAL = 'GAL',

  // Unidades
  UNIT = 'UNIT',
  DOZEN = 'DOZEN',
}

export const MeasurementUnitLabels: Record<MeasurementUnit, string> = {
  [MeasurementUnit.KG]: 'Kilogramo (kg)',
  [MeasurementUnit.G]: 'Gramo (g)',
  [MeasurementUnit.LB]: 'Libra (lb)',
  [MeasurementUnit.OZ]: 'Onza (oz)',
  [MeasurementUnit.L]: 'Litro (L)',
  [MeasurementUnit.ML]: 'Mililitro (ml)',
  [MeasurementUnit.GAL]: 'Galón (gal)',
  [MeasurementUnit.UNIT]: 'Unidad',
  [MeasurementUnit.DOZEN]: 'Docena',
};
