import Drawer from '@mui/material/Drawer';
import { useAppLayout } from 'app/_context/AppLayoutContext';
import { SidebarMenu } from './SidebarMenu';
import { Brand } from './Brand';

/**
 * Versión para dispositivos móviles.
 */
export type SidebarDrawerProps = {};
export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({}) => {
  const { navigationMenu } = useAppLayout();

  return (
    <Drawer
      open={navigationMenu.isOpen}
      onClose={() => navigationMenu.set(false)}
      sx={{
        display: { md: 'none' },
        '& .MuiPaper-root': {
          width: 'var(--sidebar-width-expanded)',
          paddingX: '1rem',
        },
      }}
    >
      <div className="flex items-center h-[var(--header-height)]">
        <Brand />
      </div>
      <SidebarMenu expanded />
    </Drawer>
  );
};
