import styled from '@mui/material/styles/styled';
import ListItemButton from '@mui/material/ListItemButton';
import { slate } from 'tailwindcss/colors';
import { Color } from 'app/styles';

type ListItemButtonStyledProps = {};
const ListItemButtonStyled = styled(ListItemButton)(({}) => ({
  color: slate[700],
  '&:hover, &.Mui-selected': {
    color: Color.primary[800],

    /* ListItemText */
    '& > div.MuiListItemText-root > span.MuiTypography-root': {
      fontSize: '0.875rem' /* 16px */,
    },

    /* Apply styles to ListItemIcon when selected */
    '&.Mui-selected > div.MuiListItemText-root > span.MuiTypography-root': {
      fontWeight: 500,
    },
  },
}));

export default ListItemButtonStyled;
