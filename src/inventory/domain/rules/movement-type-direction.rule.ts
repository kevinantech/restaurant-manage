import {
  MovementDirection,
  MovementType,
} from '../enums/inventory-movement.enum';

export const MOVEMENT_TYPE_DIRECTION: Record<MovementType, MovementDirection> =
  {
    [MovementType.CONSUMPTION]: MovementDirection.OUT,
    [MovementType.PURCHASE]: MovementDirection.IN,
  };
