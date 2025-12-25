import { CSSObject } from '@emotion/styled';
import Drawer from '@mui/material/Drawer';
import { styled, Theme } from '@mui/material/styles';

const expandedMixin = (theme: Theme): CSSObject => ({
  width: 'var(--sidebar-width-expanded)',
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.enteringScreen,
    easing: theme.transitions.easing.easeInOut,
  }),
});

const collapsedMixin = (theme: Theme): CSSObject => ({
  width: 'var(--sidebar-width-collapsed)',
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.leavingScreen,
    easing: theme.transitions.easing.easeInOut,
  }),
});

const DrawerStyled = styled(Drawer)(({ open, theme }) => ({
  '& > .MuiDrawer-paper': {
    zIndex: theme.zIndex.appBar - 1,
    overflowX: 'hidden',
    borderRight: 'none',
    width: 'var(--sidebar-width-expanded)',
  },

  [theme.breakpoints.up('md')]: {
    '& > .MuiDrawer-paper': {
      ...(open ? expandedMixin(theme) : collapsedMixin(theme)),
    },
  },
}));

export default DrawerStyled;
