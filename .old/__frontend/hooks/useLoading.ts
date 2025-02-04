import { useState } from "react";

/**
 * Custom hook para gestionar el estado de carga (loading).
 *
 * @param {boolean} defaultValue - Valor inicial del estado de carga (predeterminado: false).
 * @returns {Object} - Objeto con:
 *   - `value`: Estado actual del loading (true o false).
 *   - `setter`: Función para actualizar el estado de loading.
 *   - `toggle`: Función para alternar el estado de loading.
 */
const useLoading = (defaultValue: boolean = false) => {
  const [value, set] = useState<boolean>(defaultValue);
  const toggle = () => set((prevState) => !prevState);
  return {
    value,
    set,
    toggle,
  };
};

export { useLoading };
