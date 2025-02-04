import { useState } from "react";

const useShowPassword = () => {
  const [value, set] = useState<boolean>(false);
  const toggle = () => set((prevState) => !prevState);

  return {
    value,
    toggle,
  };
};

export { useShowPassword };
