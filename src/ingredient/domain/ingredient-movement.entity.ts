import { MovementType } from './enums/ingredient-movement.enum';

// Movimiento de inventario
export interface IngredientMovement {
  id: string;
  ingredientId: string;
  movementType: MovementType;
  quantity: number;

  // Dependiendo del tipo de moviento
  purchaseData?: PurchaseData;
  consumptionData?: ConsumptionData;

  movementContext: any;
  notes?: string;

  createdAt: string;
}

export interface PurchaseData {
  id: string;
  providerId: string;
  unitPurchasePrice: number;
  totalCost: number;
}

export interface ConsumptionData {
  id: string;
  orderId: string;
}
