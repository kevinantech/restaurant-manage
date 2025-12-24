import { CSSObject } from '@emotion/styled';
import Drawer from '@mui/material/Drawer';
import { styled, Theme } from '@mui/material/styles';

const defaultVariantMixin = (theme: Theme): CSSObject => ({
  width: 'var(--sidebar-width-default)',
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.enteringScreen,
    easing: theme.transitions.easing.easeInOut,
  }),
});

const compactVariantMixin = (theme: Theme): CSSObject => ({
  width: 'var(--sidebar-width-compact)',
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.leavingScreen,
    easing: theme.transitions.easing.easeInOut,
  }),
});

const DrawerStyled = styled(Drawer)(({ open, theme }) => ({
  '& > div.MuiDrawer-paper': {
    overflowX: 'hidden',
    borderRight: 'none',
    ...defaultVariantMixin(theme),
  },

  [theme.breakpoints.up('md')]: {
    '& > div.MuiDrawer-paper': {
      ...(!open && compactVariantMixin(theme)),
    },
  },
}));

export default DrawerStyled;
