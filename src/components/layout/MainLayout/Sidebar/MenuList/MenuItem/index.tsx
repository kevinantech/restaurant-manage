/**
 * Acts as:
 * - A regular menu item when linked (`href`).
 * - A group controller when used inside a MenuGroup.
 *
 * This component doesn't manage state by itself.
 */
import { Color } from '@/app/styles';
import { SvgIconComponent } from '@mui/icons-material/';
import ArrowDown from '@mui/icons-material/KeyboardArrowDownRounded';
import ArrowUp from '@mui/icons-material/KeyboardArrowUpRounded';
import ButtonBase from '@mui/material/ButtonBase';
import { grey } from '@mui/material/colors';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CSSObject, styled } from '@mui/material/styles';
import Link from 'next/link';
import React from 'react';
import { MainLayoutHook } from '../../..';

export type MenuItemProps = {
  size: MainLayoutHook['size'];
  href?: string;
  icon: SvgIconComponent;
  title: string;
  expanded?: boolean;
  selected?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
};

const MenuItemBase: React.FC<MenuItemProps & { className?: string }> = (
  props
) => {
  return (
    <ListItemButton
      {...(props.href && {
        component: Link,
        href: props.href,
      })}
      selected={props.selected}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      disableRipple={props.size === 'icon'}
      className={props.className}
    >
      {/* button icon wrapper */}
      <ButtonBase disableRipple={props.size === 'full'}>
        <ListItemIcon>
          <props.icon
            sx={{ width: props.size === 'icon' ? '1.5rem' : '1.25rem' }}
          />
        </ListItemIcon>
      </ButtonBase>

      {/* button text */}
      {props.size === 'full' && <ListItemText>{props.title}</ListItemText>}

      {/* arrow */}
      {props.size === 'full' &&
        typeof props.expanded === 'boolean' &&
        (props.expanded ? <ArrowUp /> : <ArrowDown />)}
    </ListItemButton>
  );
};

//-----------------------------------------------------------------------------
// Styles
//-----------------------------------------------------------------------------

/**
 * When the menu is default ListItemButton takes styles for the hover and selected.
 * but when the menu is compact, those styles are assigned to ButtonBase.
 */
const iconContainer: CSSObject = {
  color: 'inherit',
  minWidth: '2.25rem' /* 36px */,
};

const activeItemState: CSSObject = {
  color: Color.primary[800],
  backgroundColor: Color.primary[200],
};

const fullSizeMixin = (): CSSObject => ({
  '&:hover, &.Mui-selected, &.Mui-selected:hover': activeItemState,

  /* Apply styles to ListItemText when MenuItem is selected */
  '&.Mui-selected > div.MuiListItemText-root > span.MuiTypography-root': {
    fontWeight: 500,
  },
});

const iconSizeMixin = (): CSSObject => ({
  padding: '0 0.625rem 0 1rem' /* 0 10px 0 16px */,

  /* Clear ListButtonItem's styles */
  '&:hover, &.Mui-selected, &.Mui-selected:hover': {
    backgroundColor: 'transparent',
  },

  /* Apply styles to ButtonBase */
  '& > button.MuiButtonBase-root:hover, &.Mui-selected > button.MuiButtonBase-root':
    activeItemState,

  /* Apply styles to ListItemIcon */
  '& > button.MuiButtonBase-root > div.MuiListItemIcon-root': {
    ...iconContainer,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '2.875rem' /* 46px */,
    height: '2.875rem' /* 46px */,
  },
});

const MenuItem = styled(MenuItemBase)(({ size }) => ({
  color: grey[700],
  marginBottom: '0.25rem' /* 4px */,

  /* ListItemIcon */
  '& > button.MuiButtonBase-root > div.MuiListItemIcon-root': iconContainer,

  /* ListItemText */
  '& > div.MuiListItemText-root > span.MuiTypography-root': {
    fontSize: '0.875rem' /* 14px */,
  },

  ...(size === 'icon' && iconSizeMixin()),
  ...(size === 'full' && fullSizeMixin()),
}));

export default MenuItem;
