/**
 * When the menu is expanded ListItemButton takes styles for the hover and selected.
 * but when the menu collapses, they are assigned to ButtonBase.
 */
import styled, { CSSObject } from '@emotion/styled';
import ListItemButton from '@mui/material/ListItemButton';
import { Color } from 'app/styles';
import colors from 'tailwindcss/colors';

const defaultStyles = {
  ListItemIcon: {
    color: 'inherit',
    minWidth: '2.25rem' /* 36px */,
  } as CSSObject,
};

type ListItemButtonStyledProps = {
  variant: 'expanded' | 'collapsed';
};

const expandedMixin = (): CSSObject => ({
  '&:hover, &.Mui-selected, &.Mui-selected:hover': {
    color: Color.primary[800],
    backgroundColor: Color.primary[200],
  },

  /* Apply styles to ListItemText */
  '&.Mui-selected > div.MuiListItemText-root > span.MuiTypography-root': {
    fontWeight: 500,
  },
});

const collapsedMixin = (): CSSObject => ({
  padding: 0,

  /* Clear ListButtonItem's styles */
  '&.Mui-selected': {
    backgroundColor: 'transparent',
  },

  /* Apply styles to ButtonBase */
  '& > button.MuiButtonBase-root:hover, &.Mui-selected > button.MuiButtonBase-root':
    {
      color: Color.primary[800],
      backgroundColor: Color.primary[200],
    },

  /* Apply styles to ListItemIcon */
  '& > button.MuiButtonBase-root > div.MuiListItemIcon-root': {
    ...defaultStyles.ListItemIcon,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '2.875rem' /* 46px */,
    height: '2.875rem' /* 46px */,
  },
});

const ListItemButtonStyled = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'variant',
})<ListItemButtonStyledProps>(({ variant }) => ({
  color: colors.slate[700],
  marginBottom: '0.25rem',

  /* ListItemIcon */
  '& > button.MuiButtonBase-root > div.MuiListItemIcon-root': {
    ...defaultStyles.ListItemIcon,
  },

  /* ListItemText */
  '& > div.MuiListItemText-root > span.MuiTypography-root': {
    fontSize: '0.875rem' /* 14px */,
  },

  ...(variant === 'expanded' && expandedMixin()),
  ...(variant === 'collapsed' && collapsedMixin()),
}));

export default ListItemButtonStyled;
