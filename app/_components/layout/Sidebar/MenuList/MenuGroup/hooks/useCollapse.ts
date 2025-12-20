import useMenuVariant from 'app/_hooks/useMenuVariant';
import { useState } from 'react';

const useCollapse = () => {
  const [isOpen, setOpen] = useState(false);
  const menuVariant = useMenuVariant();
  const toggleOpen = () => setOpen((prev) => !prev);

  const groupButtonHandlers = {
    onClick: () => {
      if (menuVariant === 'expanded') toggleOpen();
    },
  };

  return {
    isOpen,
    groupButtonHandlers,
  };
};

export default useCollapse;
