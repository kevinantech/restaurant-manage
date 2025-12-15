import ButtonBase from '@mui/material/ButtonBase';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useAppLayout } from 'app/_context/AppLayoutContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem } from '../config';
import { ListItemButtonStyled } from './ListItemButtonStyled';

export type MenuItemProps = {
  item: NavItem;
};

/**
 * Initially, ListItemButton takes the color styles for the hover and selected states,
 * but when the menu collapses, they are assigned to ButtonBase.
 */

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const pathname = usePathname();
  const { navigationMenu } = useAppLayout();
  const selected = pathname.startsWith(item.href);
  const icon = (
    <item.icon sx={{ width: navigationMenu.isOpen ? '1.25rem' : '1.5rem' }} />
  );

  return (
    <ListItemButtonStyled
      href={item.href}
      component={Link}
      selected={selected}
      expanded={navigationMenu.isOpen}
    >
      {/* button icon wrapper */}
      <ButtonBase disableRipple={navigationMenu.isOpen}>
        <ListItemIcon
          sx={{
            color: 'inherit',
            minWidth: '2.25rem' /*  36px */,
            /* when the menu is collapsed */
            ...(!navigationMenu.isOpen && {
              justifyContent: 'center',
              alignItems: 'center',
              width: '2.875rem' /* 46px */,
              height: '2.875rem' /* 46px */,
            }),
          }}
        >
          {icon}
        </ListItemIcon>
      </ButtonBase>

      {/* button text */}
      {navigationMenu.isOpen && (
        <ListItemText
          sx={{
            '& .MuiTypography-root': {
              fontSize: '0.875rem',
              ...(selected && { fontWeight: 500 }),
            },
          }}
        >
          {item.title}
        </ListItemText>
      )}
    </ListItemButtonStyled>
  );
};

export default MenuItem;
