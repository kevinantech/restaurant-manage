'use client';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SvgIcon from '@mui/material/SvgIcon';
import { cn } from 'app/_common/cn-util';
import { WebRoutes } from 'app/_common/routes-enum';
import { useAppLayout } from 'app/_context/AppLayoutContext';
import { Color } from 'app/styles';
import { usePathname } from 'next/navigation';
import colors from 'tailwindcss/colors';

type MenuData = {
  title: string;
  href: string;
  Icon: typeof SvgIcon;
};

const menuData: MenuData[] = [
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

export type SidebarMenuProps = {};
const SidebarMenu: React.FC<SidebarMenuProps> = ({}) => {
  const pathname = usePathname();
  const { navigationMenu } = useAppLayout();
  return (
    <List
      sx={{
        paddingX: '1rem',
        ...(!navigationMenu.isOpen && {
          paddingLeft: { lg: '0.625rem' },
        }),
      }}
      className="space-y-1"
    >
      <Caption>Menu</Caption>
      {menuData.map(({ title, href, Icon }) => (
        <ListItemButton
          key={href}
          href={href}
          component="a"
          selected={pathname.startsWith(href)}
          sx={{
            color: colors.slate[700],
            ...(!navigationMenu.isOpen && {
              padding: { lg: 0 },
            }),

            '&:hover, &.Mui-selected, &.Mui-selected:hover': {
              color: Color.primary[800],
              backgroundColor: Color.primary[200],
            },
            '&.Mui-selected .MuiTypography-root': {
              fontWeight: '600',
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: 'inherit',
              minWidth: '2.25rem',
              ...(!navigationMenu.isOpen && {
                width: { lg: '2.875rem' /* 46px */ },
                aspectRatio: { lg: '1' },
                justifyContent: { lg: 'center' },
                alignItems: { lg: 'center' },
              }),
            }}
          >
            <Icon
              sx={{
                ...(navigationMenu.isOpen && {
                  width: '1.25rem',
                }),
              }}
            />
          </ListItemIcon>
          <ListItemText
            sx={{
              '& .MuiTypography-root': {
                fontSize: '0.875rem',
              },
              ...(!navigationMenu.isOpen && {
                display: { lg: 'none' },
              }),
            }}
          >
            {title}
          </ListItemText>
        </ListItemButton>
      ))}
    </List>
  );
};

export { SidebarMenu };

// ============================================================================
// Componentes internos
// ============================================================================

const Caption: React.FC<{ children: string }> = ({ children }) => {
  const { navigationMenu } = useAppLayout();
  return (
    <p
      className={cn('p-2 text-sm text-slate-900 font-semibold', {
        'lg:hidden': !navigationMenu.isOpen,
      })}
    >
      Menu
    </p>
  );
};
