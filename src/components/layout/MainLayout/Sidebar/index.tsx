'use client';
import useMainLayout from '@/hooks/useMainLayout';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import DrawerStyled from './DrawerStyled';
import MenuList from './MenuList';

export type SidebarProps = {};
const Sidebar: React.FC<SidebarProps> = ({}) => {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down('md'));
  const { navigationMenu } = useMainLayout();

  return (
    <DrawerStyled
      open={navigationMenu.isOpen}
      onClose={navigationMenu.close}
      variant={downMd ? 'temporary' : 'permanent'}
    >
      {/* sidebar header */}
      <div className="h-[var(--header-height)]"></div>

      {/* sidebar menus */}
      <MenuList />
    </DrawerStyled>
  );
};

export default Sidebar;
