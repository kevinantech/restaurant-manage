import grey from '@mui/material/colors/grey';
import { SxProps, Theme } from '@mui/material/styles';
import useMenuVariant from 'app/_hooks/useMenuVariant';
import { Color } from 'app/styles';

type ListItemButtonSxProps = {
  variant: ReturnType<typeof useMenuVariant>;
};

const sxListItemButton = ({
  variant,
}: ListItemButtonSxProps): SxProps<Theme> => ({
  color: grey[700],

  '&:hover, &.Mui-selected, &.Mui-selected:hover': {
    color: Color.primary[800],
    backgroundColor: 'transparent',
  },

  /* ListItemIcon */
  '& > button.MuiButtonBase-root > div.MuiListItemIcon-root': {
    color: 'inherit',
    minWidth: '2.25rem' /* 36px */,
  },

  /* CircleIcon */
  '& > button.MuiButtonBase-root > div.MuiListItemIcon-root > svg.MuiSvgIcon-root':
    {
      width: '0.375rem' /* 6px */,
      height: '0.375rem' /* 6px */,
    },

  /* Apply styles to CircleIcon when selected */
  '&.Mui-selected > button.MuiButtonBase-root > div.MuiListItemIcon-root > svg.MuiSvgIcon-root':
    {
      width: '0.5rem' /* 8px */,
      height: '0.5rem' /* 8px */,
    },

  /* ListItemText */
  '& > div.MuiListItemText-root > span.MuiTypography-root': {
    fontSize: '0.875rem' /* 16px */,
  },

  /* Apply styles to ListItemText when selected */
  '&.Mui-selected > div.MuiListItemText-root > span.MuiTypography-root': {
    fontWeight: 500,
  },

  ...(variant === 'default' && { marginLeft: '2.25rem' /* 36px */ }),
});

export default sxListItemButton;
