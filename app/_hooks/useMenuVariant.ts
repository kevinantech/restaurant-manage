import { useMemo } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAppLayout } from 'app/_context/AppLayoutContext';

/**
 * Determines menu variant based on 'md' breakpoint and navigation state.
 */
const useMenuVariant = () => {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const { navigationMenu } = useAppLayout();

  return useMemo(
    () => (downMD || navigationMenu.isOpen ? 'default' : 'compact'),
    [downMD, navigationMenu.isOpen]
  );
};

export default useMenuVariant;
