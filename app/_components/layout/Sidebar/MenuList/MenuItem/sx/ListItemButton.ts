/**
 * When the menu is default ListItemButton takes styles for the hover and selected.
 * but when the menu is compact, those styles are assigned to ButtonBase.
 */
import grey from '@mui/material/colors/grey';
import { CSSObject, SxProps, Theme } from '@mui/material/styles';
import useMenuVariant from 'app/_hooks/useMenuVariant';
import { Color } from 'app/styles';

const defaultStyles = {
  ListItemIcon: {
    color: 'inherit',
    minWidth: '2.25rem' /* 36px */,
  } as CSSObject,
};

const defaultVariantMixin = (): CSSObject => ({
  '&:hover, &.Mui-selected, &.Mui-selected:hover': {
    color: Color.primary[800],
    backgroundColor: Color.primary[200],
  },

  /* Apply styles to ListItemText */
  '&.Mui-selected > div.MuiListItemText-root > span.MuiTypography-root': {
    fontWeight: 500,
  },
});

const compactVariantMixin = (): CSSObject => ({
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

type ListItemButtonSxProps = {
  variant: ReturnType<typeof useMenuVariant>;
};

const sxListItemButton = ({
  variant,
}: ListItemButtonSxProps): SxProps<Theme> => ({
  color: grey[700],
  marginBottom: '0.25rem',

  /* ListItemIcon */
  '& > button.MuiButtonBase-root > div.MuiListItemIcon-root': {
    ...defaultStyles.ListItemIcon,
  },

  /* ListItemText */
  '& > div.MuiListItemText-root > span.MuiTypography-root': {
    fontSize: '0.875rem' /* 14px */,
  },

  ...(variant === 'default' && defaultVariantMixin()),
  ...(variant === 'compact' && compactVariantMixin()),
});

export default sxListItemButton;
