import type { SvgIconComponent } from '@mui/icons-material';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import { WebRoutes } from 'app/_common/routes-enum';

// Item de navegación simple
export type NavItem = {
  type: 'item';
  title: string;
  href: string;
  icon: SvgIconComponent;
};

// Item con sub-items (grupo expandible)
export type NavGroup = {
  type: 'group';
  title: string;
  icon: SvgIconComponent;
  subItems: {
    title: string;
    href: string;
  }[];
};

export type NavList = {
  title: string;
  items: (NavItem | NavGroup)[];
};

export const navItems: NavList[] = [
  {
    title: 'Menu',
    items: [
      {
        type: 'item',
        title: 'Inicio',
        href: WebRoutes.HOME,
        icon: SpaceDashboardOutlinedIcon,
      },
      {
        type: 'item',
        title: 'Inventario',
        href: WebRoutes.INVENTORY,
        icon: InventoryOutlinedIcon,
      },
    ],
  },
];
