import { model, models, Schema } from "mongoose";
import { ICategory } from "../domain/category.entity";

const CategorySchema = new Schema<ICategory>(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const CategoryModel = models.Categories || model("Categories", CategorySchema);
export { CategoryModel };
