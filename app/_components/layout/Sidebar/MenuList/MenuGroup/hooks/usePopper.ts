import useMenuVariant from 'app/_hooks/useMenuVariant';
import { useEffect, useRef, useState } from 'react';

const usePopper = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);
  const [anchorEl, setAchorEl] = useState<HTMLDivElement | null>(null);
  const menuVariant = useMenuVariant();
  const toggleOpen = () => setOpen((prev) => !prev);

  // Close the popper when the menu variant is expanded.
  useEffect(() => {
    if (menuVariant === 'expanded' && isOpen) setOpen(false);
  }, [menuVariant]);

  // Close the popper when the user left the trigger button or the popper.
  useEffect(() => {
    const handleMouseOver = (event: MouseEvent) => {
      if (menuVariant === 'collapsed' && isOpen) {
        const target = event.target as HTMLElement;
        const isMouseOutsideGroupButton =
          anchorEl && !anchorEl.contains(target);
        const isMouseOutsidePopper =
          ref.current && !ref.current.contains(target);
        if (isMouseOutsideGroupButton && isMouseOutsidePopper) setOpen(false);
      }
    };
    document.addEventListener('mouseover', handleMouseOver);
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, [isOpen]);

  const groupButtonHandlers = {
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (menuVariant === 'collapsed') {
        setAchorEl(event.target as HTMLDivElement);
        toggleOpen();
      }
    },
    onMouseEnter: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (menuVariant === 'collapsed') {
        setAchorEl(event.target as HTMLDivElement);
        setOpen(true);
      }
    },
  };

  return {
    anchorEl,
    groupButtonHandlers,
    isOpen,
    ref,
  };
};

export default usePopper;
