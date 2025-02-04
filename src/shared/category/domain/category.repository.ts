import { ICategory } from "./category.entity";

export interface CategoryRepository {
  save(category: ICategory): Promise<void>;
}
