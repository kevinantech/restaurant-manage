import { IProductEntry } from "./product-entry.entity";

export interface ProductEntryRepository {
  /**
   * Encuentra un producto por su ID.
   * @param id - Identificador único del producto.
   * @returns El producto encontrado o null si no existe.
   */
  findById(id: string): Promise<IProductEntry | null>;

  /**
   * Guarda un nuevo producto en el repositorio.
   * @param productEntry - Producto a guardar.
   */
  save(productEntry: IProductEntry): Promise<void>;

  /**
   * Actualiza un producto existente en el repositorio.
   * @param productEntry - Producto con los datos actualizados.
   */
  update(id: string, payload: Partial<Omit<IProductEntry, "id">>): Promise<void>;

  /**
   * Obtiene todos los productos del repositorio.
   * @returns Una lista con todos los productos.
   */
  findAll(): Promise<IProductEntry[]>;
}
