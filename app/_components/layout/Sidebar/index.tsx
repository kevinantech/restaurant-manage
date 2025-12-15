import useMediaQuery from '@mui/material/useMediaQuery';
import { useAppLayout } from 'app/_context/AppLayoutContext';
import { navItems } from '../Sidebar/MenuList/config';
import DrawerStyled from './DrawerStyled';
import MenuList from './MenuList';

export type SidebarProps = {};
const Sidebar: React.FC<SidebarProps> = ({}) => {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const { navigationMenu } = useAppLayout();

  return (
    <DrawerStyled
      open={navigationMenu.isOpen}
      downMD={downMD}
      variant={downMD ? 'temporary' : 'permanent'}
    >
      {/* sidebar header */}
      <div className="h-[var(--header-height)]"></div>

      {/* sidebar menus */}
      {navItems.map((menuList) => (
        <MenuList key={`menuList-${menuList.title}`} menuList={menuList} />
      ))}
    </DrawerStyled>
  );
};

export default Sidebar;
