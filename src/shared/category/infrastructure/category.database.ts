import { ICategory } from "../domain/category.entity";
import { CategoryRepository } from "../domain/category.repository";

export class CategoryDatabase implements CategoryRepository {
  async save(category: ICategory): Promise<void> {}
}
