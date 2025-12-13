import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import { WebRoutes } from 'app/_common/routes-enum';
import { MenuButtonProps } from './SidebarMenuButton';

export const menu: MenuButtonProps[] = [
  {
    title: 'Inicio',
    href: WebRoutes.HOME,
    Icon: SpaceDashboardOutlinedIcon,
  },
  {
    title: 'Inventario',
    href: WebRoutes.INVENTORY,
    Icon: InventoryOutlinedIcon,
  },
];
