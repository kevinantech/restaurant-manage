import { IInventoryItem } from './inventory-item.entity';

export interface InventoryItemRepository {
  /**
   * Encuentra un producto por su ID.
   * @param id - Identificador único del producto.
   * @returns El producto encontrado o null si no existe.
   */
  findItemById(id: string): Promise<IInventoryItem | null>;

  /**
   * Guarda un nuevo item del inventario en el repositorio.
   * @param item - Producto a guardar.
   */
  createItem(item: IInventoryItem): Promise<void>;

  /**
   * Actualiza un producto existente del inventario en el repositorio.
   * @param payload - Producto con los datos actualizados.
   */
  updateItem(
    id: string,
    payload: Partial<Omit<IInventoryItem, 'id' | 'userId'>>
  ): Promise<void>;

  /**
   * Obtiene los productos de un usuario.
   * @returns Una lista con todos los productos.
   */
  getItemsByUserId(userId: string): Promise<IInventoryItem[]>;
}
