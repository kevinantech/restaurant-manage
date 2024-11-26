export class LS {
  /**
   * Guarda un valor en localStorage.
   * @param key - Clave para identificar el valor.
   * @param value - Valor a guardar. Puede ser cualquier tipo serializable.
   */
  static set(key: string, value: unknown): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.warn(`LS.set() -> ${error}`);
    }
  }

  /**
   * Obtiene un valor de localStorage.
   * @param key - Clave del valor a obtener.
   * @returns El valor deserializado o null si no existe.
   */
  static get<T>(key: string): T | null {
    try {
      const serializedValue = localStorage.getItem(key);
      return serializedValue ? (JSON.parse(serializedValue) as T) : null;
    } catch (error) {
      console.warn(`LS.get() -> ${error}`);
      return null;
    }
  }

  /**
   * Elimina un valor de localStorage.
   * @param key - Clave del valor a eliminar.
   */
  static del(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`LS.del() -> ${error}`);
    }
  }

  /**
   * Limpia todo el localStorage.
   */
  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn(`LS.clear() -> ${error}`);
    }
  }
}
