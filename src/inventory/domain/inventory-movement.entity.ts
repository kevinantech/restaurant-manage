import { MovementType } from './enums/inventory-movement.enum';

// Movimiento de inventario
export interface InventoryMovement {
  id: string;
  ingredientId: string;
  movementType: MovementType;
  quantity: number;

  // En caso de compra
  providerId: string;
  unitPurchasePrice: number;
  totalCost: number;

  movementContext: any;
  notes?: string;

  createdAt: string;
}
