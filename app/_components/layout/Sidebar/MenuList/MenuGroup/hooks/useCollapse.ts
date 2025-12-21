import useMenuVariant from 'app/_hooks/useMenuVariant';
import { useState } from 'react';

const useCollapse = () => {
  const [isOpen, setOpen] = useState(false);
  const menuVariant = useMenuVariant();
  const toggleOpen = () => setOpen((prev) => !prev);

  const mainButtonHandlers = {
    onClick: () => {
      if (menuVariant === 'default') toggleOpen();
    },
  };

  return {
    isOpen,
    mainButtonHandler: mainButtonHandlers,
  };
};

export default useCollapse;
