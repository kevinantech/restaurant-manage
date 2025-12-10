'use client';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SvgIcon from '@mui/material/SvgIcon';
import { WebRoutes } from 'app/_common/routes-enum';
import { Color } from 'app/styles';
import tailwindColor from 'tailwindcss/colors';
import { usePathname } from 'next/navigation';

type MenuData = {
  title: string;
  href: string;
  Icon: typeof SvgIcon;
};

const menuData: MenuData[] = [
  {
    title: 'Inicio',
    href: WebRoutes.HOME,
    Icon: HomeOutlinedIcon,
  },
  {
    title: 'Inventario',
    href: WebRoutes.INVENTORY,
    Icon: InventoryOutlinedIcon,
  },
];

/**
 * https://mui.com/material-ui/api/list-item-button/#inheritance
 */
const MenuButton: React.FC<{
  children: React.ReactNode;
  href: string;
}> = (props) => {
  const pathname = usePathname();

  return (
    <ListItemButton
      {...props}
      component="a"
      selected={pathname.startsWith(props.href)}
      sx={{
        color: tailwindColor.slate[700],
        '& .MuiTypography-root': {
          fontSize: '0.875rem',
        },
        '& .MuiListItemIcon-root': {
          minWidth: '2.25rem',
          color: 'inherit',
        },
        '&:hover, &.Mui-selected, &.Mui-selected:hover': {
          color: Color.primary[800],
          backgroundColor: Color.primary[200],
        },
        '&.Mui-selected .MuiTypography-root': {
          fontWeight: '600',
        },
      }}
    />
  );
};

export type SidebarMenuProps = {};
const SidebarMenu: React.FC<SidebarMenuProps> = ({}) => {
  return (
    <List component="ul" className="space-y-1">
      <span className="py-3 px-2 text-sm text-slate-900 font-semibold">
        Menu
      </span>
      {menuData.map(({ title, href, Icon }) => (
        <MenuButton key={href} href={href}>
          <ListItemIcon>
            <Icon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{title}</ListItemText>
        </MenuButton>
      ))}
    </List>
  );
};

export { SidebarMenu };
