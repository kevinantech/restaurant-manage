import { CSSObject } from '@emotion/styled';
import Drawer from '@mui/material/Drawer';
import { styled, Theme } from '@mui/material/styles';
import zIndex from '@mui/material/styles/zIndex';

type DrawerStyledProps = {
  open: boolean;
  downMD: boolean;
};

const expandedMixin = (theme: Theme): CSSObject => ({
  width: 'var(--sidebar-width-expanded)',
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.enteringScreen,
    easing: theme.transitions.easing.easeInOut,
  }),
});

const reducedMixin = (theme: Theme): CSSObject => ({
  width: 'var(--sidebar-width-reduced)',
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.leavingScreen,
    easing: theme.transitions.easing.easeInOut,
  }),
});

const DrawerStyled = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'downMD',
})<DrawerStyledProps>(({ open, downMD, theme }) => ({
  ...(open ? expandedMixin(theme) : reducedMixin(theme)),
  '& .MuiDrawer-paper': {
    borderRight: 'none',
    ...(!downMD && { zIndex: zIndex.appBar - 1 }),
    ...(open ? expandedMixin(theme) : reducedMixin(theme)),
  },
}));

export default DrawerStyled;
