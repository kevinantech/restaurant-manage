import type { SvgIconComponent } from '@mui/icons-material';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import { paths } from './paths';

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
    href: paths.app.home,
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
        href: paths.app.inventory.root,
      },
      {
        id: crypto.randomUUID(),
        title: 'Añadir Insumo',
        href: paths.app.inventory.add,
      },
    ],
  },
];
