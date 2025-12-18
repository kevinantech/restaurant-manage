import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import ButtonBase from '@mui/material/ButtonBase';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import useMenuVariant from 'app/_hooks/useMenuVariant';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import { NavItemGroup, NavItemSingle } from '../../config';
import MenuCollapse from '../MenuCollapse';
import ListItemButtonStyled from './ListItemButtonStyled';

export type MenuItemProps = { menuItem: NavItemSingle | NavItemGroup };

const useMenuItem = ({ menuItem }: MenuItemProps) => {
  const pathname = usePathname();
  const menuVariant = useMenuVariant();

  // when the type is group
  const [isGroupOpen, setGroupOpen] = useState<boolean>(false);
  const toggleGroupOpen = () => setGroupOpen((prev) => !prev);

  const isSelected = useMemo(() => {
    if (menuItem.type === 'item') {
      return pathname === menuItem.href;
    }
    if (menuItem.type === 'group') {
      const isActiveBySubItems = menuItem.subItems.some(
        (subItem) => subItem.href === pathname
      );
      return (menuVariant === 'expanded' && isGroupOpen) || isActiveBySubItems;
    }

    return false;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, menuVariant, isGroupOpen]);

  const handleClick = () => {
    if (menuItem.type === 'group') toggleGroupOpen();
  };

  const handleMouseEnter = () => {
    if (menuItem.type === 'group' && menuVariant === 'collapsed') {
      setGroupOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (menuItem.type === 'group' && menuVariant === 'collapsed') {
      setGroupOpen(false);
    }
  };

  return {
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
    isGroupOpen,
    isSelected,
  };
};

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const {
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
    isGroupOpen,
    isSelected,
  } = useMenuItem(props);
  const menuVariant = useMenuVariant();
  const menuItem = props.menuItem;

  return (
    <>
      <ListItemButtonStyled
        variant={menuVariant}
        selected={isSelected}
        component={menuItem.type === 'item' ? Link : undefined}
        href={menuItem.type === 'item' ? menuItem.href : undefined}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* button icon wrapper */}
        <ButtonBase disableRipple>
          <ListItemIcon>
            <menuItem.icon
              sx={{ width: menuVariant === 'expanded' ? '1.25rem' : '1.5rem' }}
            />
          </ListItemIcon>
        </ButtonBase>

        {/* button text */}
        {menuVariant === 'expanded' && (
          <ListItemText>{menuItem.title}</ListItemText>
        )}

        {/* arrow icon */}
        {menuItem.type === 'group' &&
          menuVariant === 'expanded' &&
          (isGroupOpen ? (
            <KeyboardArrowUpRoundedIcon />
          ) : (
            <KeyboardArrowDownRoundedIcon />
          ))}
      </ListItemButtonStyled>

      {/* group sub-items  */}
      {menuItem.type === 'group' && (
        <MenuCollapse open={isGroupOpen} subItems={menuItem.subItems} />
      )}
    </>
  );
};

export default MenuItem;
