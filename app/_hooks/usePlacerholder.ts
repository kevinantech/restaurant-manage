import { useEffect, useState } from "react";

/**
 * Avoids placeholder superposition while Input MUI component is rendering.
 * @param placeholder
 * @returns
 */
const usePlaceholder = (placeholder: string) => {
  const [value, setValue] = useState<string>();
  useEffect(() => setValue(placeholder), []);
  return value;
};

export { usePlaceholder };
