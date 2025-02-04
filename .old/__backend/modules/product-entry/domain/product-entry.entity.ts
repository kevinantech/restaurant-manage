import { Units } from "@/backend/common/constants/units-enum";
import { ProductEntryCategory } from "./product-entry-category-enum";

export interface IProductEntry {
  id: string; // Unique identifier for the ingredient
  name: string; // Name of the ingredient (e.g., Beef, Orange Juice)
  category: ProductEntryCategory; // Category (e.g., Meats, Beverages, Dairy)
  unitOfMeasure: Units; // Unit of measurement (e.g., kg, liters, units)
  unitWeight: number; // Weight or quantity per unit (portion or product) in the unit of measure
  stock: number; // Total available stock of the ingredient (in units or total weight)
}
