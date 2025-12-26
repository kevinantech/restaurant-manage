'use client';
import Loader from '@/components/Loader';
import { MainLayoutContext } from '@/context/MainLayoutContext';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SessionProvider } from 'next-auth/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Header from './Header';
import MainContentStyled from './MainContentStyled';
import Sidebar from './Sidebar';

const useMounted = () => {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return isMounted;
};

const useNavigationMenu = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const toggle = useCallback(() => setOpen((prev) => !prev), []);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  return { isOpen, toggle, open, close };
};

export type MainLayoutHook = ReturnType<typeof _useMainLayout>;
const _useMainLayout = () => {
  const navigationMenu = useNavigationMenu();
  const isMounted = useMounted();

  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));

  const size = useMemo<'icon' | 'full'>(
    () => (upMd && !navigationMenu.isOpen ? 'icon' : 'full'),
    [upMd, navigationMenu.isOpen]
  );

  return { navigationMenu, isMounted, size };
};

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mainLayoutHook = _useMainLayout();

  if (!mainLayoutHook.isMounted) return <Loader />;

  return (
    <MainLayoutContext value={mainLayoutHook}>
      <SessionProvider>
        {/* header */}
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            backgroundColor: 'white',
          }}
        >
          <Toolbar sx={{ height: 'var(--header-height)', py: 2 }}>
            <Header />
          </Toolbar>
        </AppBar>

        {/* sidebar menu */}
        <Sidebar />

        {/* main content */}
        <MainContentStyled
          sidebarSize={
            mainLayoutHook.navigationMenu.isOpen ? 'expanded' : 'collapsed'
          }
        >
          <Container>{children}</Container>
        </MainContentStyled>
      </SessionProvider>
    </MainLayoutContext>
  );
};

export default MainLayout;
