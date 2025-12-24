import { HydratedDocument, Model, model, models, Schema } from 'mongoose';
import { IngredientCategory } from '../domain/enums/ingredient-category.enum';
import { MeasurementUnit } from '../domain/enums/measurement-unit.enum';
import { Ingredient } from '../domain/ingredient.entity';
export type IngredientDocument = HydratedDocument<Ingredient>;
export type IngredientModel = Model<IngredientDocument>;

const schema = new Schema<Omit<Ingredient, 'id' | 'updatedAt'>>(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: IngredientCategory,
      required: true,
    },
    unit: {
      type: String,
      enum: MeasurementUnit,
      required: true,
    },
    minStock: {
      type: Number,
      required: true,
    },
    averageCost: {
      type: Number,
      default: 0,
    },
    currentStock: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true, // Agrega createdAt y updatedAt.
  }
);

export const ingredientModel: IngredientModel =
  models?.ingredients || model('ingredients', schema);
