import { IProduct } from "./product.entity";

export interface ProductRepository {
  /**
   * Encuentra un producto por su ID.
   * @param id - Identificador único del producto.
   * @returns El producto encontrado o null si no existe.
   */
  findById(id: string): Promise<IProduct | null>;

  /**
   * Guarda un nuevo producto en el repositorio.
   * @param product - Producto a guardar.
   */
  save(product: IProduct): Promise<void>;

  /**
   * Actualiza un producto existente en el repositorio.
   * @param payload - Producto con los datos actualizados.
   */
  update(id: string, payload: Partial<Omit<IProduct, "id">>): Promise<void>;

  /**
   * Obtiene todos los productos del repositorio.
   * @returns Una lista con todos los productos.
   */
  findAll(): Promise<IProduct[]>;
}
