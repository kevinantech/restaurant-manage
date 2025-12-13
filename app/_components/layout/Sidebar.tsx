import Box from '@mui/material/Box';
import { useAppLayout } from 'app/_context/AppLayoutContext';
import React from 'react';
import { SidebarMenu } from './SidebarMenu';

/**
 * Versión para dispositivos NO móviles.
 */
export type SidebarProps = {};
export const Sidebar: React.FC<SidebarProps> = ({}) => {
  const { navigationMenu } = useAppLayout();
  return (
    <Box
      component="aside"
      sx={{
        display: { xs: 'none', md: 'block' },
        height: 'calc(100dvh - var(--header-height))',
        paddingX: '1rem',
        width: navigationMenu.isOpen
          ? 'var(--sidebar-width-expanded)'
          : 'var(--sidebar-width-reduced)',
        ...(!navigationMenu.isOpen && { paddingLeft: '0.625rem' }),
        transition: 'width 300ms ease-in-out',
      }}
    >
      <SidebarMenu expanded={navigationMenu.isOpen} />
    </Box>
  );
};
