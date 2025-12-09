export enum MovementDirection {
  IN = 'in', // Entrada de inventario (aumenta el stock)
  OUT = 'out', // Salida de inventario (disminuye el stock)
}

export enum MovementType {
  PURCHASE = 'purchase', // Compra de ingredientes (entrada de inventario)
  CONSUMPTION = 'consumption', // Consumo de ingredientes en preparaciones (salida de inventario)
  LOSS = 'loss', // Pérdida de ingredientes por deterioro, vencimiento, etc. (salida de inventario)
  ADJUSTMENT = 'adjustment', // Ajuste manual de inventario (puede ser entrada o salida)
}
