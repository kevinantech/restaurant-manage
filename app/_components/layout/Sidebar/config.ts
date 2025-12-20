import type { SvgIconComponent } from '@mui/icons-material';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import { WebRoutes } from 'app/_common/routes-enum';

// Item de navegación simple
export type NavItem = {
  id: string;
  type: 'NavItem';
  title: string;
  href: string;
  icon: SvgIconComponent;
};

// Item con sub-items (grupo expandible)
export type NavGroup = {
  id: string;
  type: 'NavGroup';
  title: string;
  icon: SvgIconComponent;
  subItems: {
    id: string;
    title: string;
    href: string;
  }[];
};

export const navList: (NavItem | NavGroup)[] = [
  {
    id: crypto.randomUUID(),
    type: 'NavItem',
    title: 'Inicio',
    href: WebRoutes.HOME,
    icon: SpaceDashboardOutlinedIcon,
  },
  {
    id: crypto.randomUUID(),
    type: 'NavGroup',
    title: 'Inventario',
    icon: InventoryOutlinedIcon,
    subItems: [
      {
        id: crypto.randomUUID(),
        title: 'Lista de Insumos',
        href: WebRoutes.INVENTORY,
      },
    ],
  },
];
