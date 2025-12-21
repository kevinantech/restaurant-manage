import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import ButtonBase from '@mui/material/ButtonBase';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import useMenuVariant from 'app/_hooks/useMenuVariant';
import { OmitTyped } from 'lib/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { NavGroup, NavItem } from '../../config';
import sxListItemButton from './sx/ListItemButton';

export type MenuItemProps = {
  item: NavItem | OmitTyped<NavGroup, 'subItems'>;

  // NavGroup-specific props
  selected?: boolean;
  isExpanded?: boolean;
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const checkProps = (props: MenuItemProps) => {
  if (
    props.item.type === 'NavGroup' &&
    (typeof props.selected !== 'boolean' ||
      typeof props.isExpanded !== 'boolean' ||
      typeof props.onMouseEnter !== 'function' ||
      typeof props.onClick !== 'function')
  ) {
    throw new Error(
      'MenuItem component expects selected, isExpanded, onMouseEnter, and onClick props for NavGroup items'
    );
  }
};

const MenuItem: React.FC<MenuItemProps> = (props) => {
  console.log('🚀 ~ MenuItem ~ props:', props);
  checkProps(props);
  const variant = useMenuVariant();
  const pathname = usePathname();

  return (
    <ListItemButton
      {...(props.item.type === 'NavItem' && {
        component: Link,
        href: props.item.href,
        selected: pathname === props.item.href,
      })}
      {...(props.item.type === 'NavGroup' && {
        selected: props.selected,
        onClick: props.onClick,
        onMouseEnter: props.onMouseEnter,
      })}
      sx={sxListItemButton({ variant })}
    >
      {/* button icon wrapper */}
      <ButtonBase disableRipple>
        <ListItemIcon>
          <props.item.icon
            sx={{ width: variant === 'default' ? '1.25rem' : '1.5rem' }}
          />
        </ListItemIcon>
      </ButtonBase>

      {/* button text */}
      {variant === 'default' && <ListItemText>{props.item.title}</ListItemText>}

      {props.item.type === 'NavGroup' &&
        variant === 'default' &&
        (props.isExpanded ? (
          <KeyboardArrowUpRoundedIcon />
        ) : (
          <KeyboardArrowDownRoundedIcon />
        ))}
    </ListItemButton>
  );
};

export default MenuItem;
