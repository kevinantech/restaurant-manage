import { CSSObject } from '@emotion/styled';
import Drawer from '@mui/material/Drawer';
import { styled, Theme } from '@mui/material/styles';
import zIndex from '@mui/material/styles/zIndex';

type DrawerStyledProps = {
  open: boolean;
  downMD: boolean;
};

const defaultVariantMixin = (theme: Theme): CSSObject => ({
  width: 'var(--sidebar-width-expanded)',
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.enteringScreen,
    easing: theme.transitions.easing.easeInOut,
  }),
});

const compactVariantMixin = (theme: Theme): CSSObject => ({
  width: 'var(--sidebar-width-collapsed)',
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.leavingScreen,
    easing: theme.transitions.easing.easeInOut,
  }),
});

const DrawerStyled = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'downMD',
})<DrawerStyledProps>(({ open, downMD, theme }) => ({
  ...(open ? defaultVariantMixin(theme) : compactVariantMixin(theme)),
  '& .MuiDrawer-paper': {
    overflowX: 'hidden',
    borderRight: 'none',
    ...(!downMD && { zIndex: zIndex.appBar - 1 }),
    ...(open ? defaultVariantMixin(theme) : compactVariantMixin(theme)),
  },
}));

export default DrawerStyled;
