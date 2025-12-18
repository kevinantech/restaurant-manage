import { useMemo } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAppLayout } from 'app/_context/AppLayoutContext';

/**
 * Determines menu variant based on 'md' breakpoint and navigation state.
 * Mobile: always expanded (Drawer component manages the closing).
 * Desktop: follows navigationMenu.isOpen.
 */
const useMenuVariant = () => {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const { navigationMenu } = useAppLayout();

  return useMemo(
    () => (downMD || navigationMenu.isOpen ? 'expanded' : 'collapsed'),
    [downMD, navigationMenu.isOpen]
  );
};

export default useMenuVariant;
