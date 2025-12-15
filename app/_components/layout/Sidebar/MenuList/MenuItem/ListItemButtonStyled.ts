import styled, { CSSObject } from '@emotion/styled';
import ListItemButton from '@mui/material/ListItemButton';
import { Color } from 'app/styles';
import colors from 'tailwindcss/colors';

type ListItemButtonStyledProps = { expanded: boolean };

const expandedMixin = (): CSSObject => ({
  '&:hover, &.Mui-selected, &.Mui-selected:hover': {
    color: Color.primary[800],
    backgroundColor: Color.primary[200],
  },
});

const collapsedMixin = (): CSSObject => ({
  padding: 0,
  '&.Mui-selected': {
    backgroundColor: 'transparent',
  },

  /* applies styles to the ButtonBase */
  '& .MuiButtonBase-root:hover, &.Mui-selected .MuiButtonBase-root': {
    color: Color.primary[800],
    backgroundColor: Color.primary[200],
  },
});

const ListItemButtonStyled = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'expanded',
})<ListItemButtonStyledProps>(({ expanded }) => ({
  color: colors.slate[700],
  marginBottom: '0.25rem',
  ...(expanded ? expandedMixin() : collapsedMixin()),
}));

export { ListItemButtonStyled };
