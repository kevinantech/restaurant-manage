import {
  MovementDirection,
  MovementType,
} from '../enums/ingredient-movement.enum';

// ADJUSTMENT no tiene una dirección fija por defecto, por eso se excluye.
export const MOVEMENT_TYPE_DIRECTION: Record<
  Exclude<MovementType, MovementType.ADJUSTMENT>,
  MovementDirection
> = {
  [MovementType.CONSUMPTION]: MovementDirection.OUT,
  [MovementType.PURCHASE]: MovementDirection.IN,
  [MovementType.LOSS]: MovementDirection.OUT,
};
