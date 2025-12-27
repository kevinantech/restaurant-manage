import { Color } from '@/app/styles';
import { styled } from '@mui/material/styles';
type MainContentStyledProps = { sidebarSize: 'expanded' | 'collapsed' };

const MainContentStyled = styled('main', {
  shouldForwardProp: (prop) => prop !== 'sidebarSize',
})<MainContentStyledProps>(({ theme, sidebarSize }) => ({
  minHeight: 'calc(100vh - var(--header-height))',
  margin: 'var(--header-height) 0.625rem 0',
  padding: '1.25rem' /* 20px */,
  borderTopLeftRadius: '1rem' /* 16px */,
  borderTopRightRadius: '1rem' /* 16px */,
  backgroundColor: Color.secondary[200],

  [theme.breakpoints.up('md')]: {
    marginRight: '1.25rem' /* 20px */,
    ...(sidebarSize === 'expanded' && {
      marginLeft: 'var(--sidebar-width-expanded)',
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shorter + 200,
      }),
    }),

    ...(sidebarSize === 'collapsed' && {
      marginLeft: 'var(--sidebar-width-collapsed)',
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter + 200,
      }),
    }),
  },
}));

export default MainContentStyled;
