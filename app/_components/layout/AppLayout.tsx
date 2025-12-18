'use client';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { AppLayoutContext } from 'app/_context/AppLayoutContext';
import { SessionProvider } from 'next-auth/react';
import { useMemo, useState } from 'react';
import Header from './Header';
import MainContentStyled from './MainContentStyled';
import Sidebar from './Sidebar';
import useMediaQuery from '@mui/material/useMediaQuery';

const useNavigationMenu = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const toggle = () => setOpen((prev) => !prev);

  return {
    isOpen,
    toggle,
    set: setOpen,
  };
};

export type AppLayoutHook = ReturnType<typeof _useAppLayout>;
const _useAppLayout = () => {
  const navigationMenu = useNavigationMenu();

  return { navigationMenu };
};

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const appLayoutHook = _useAppLayout();

  return (
    <AppLayoutContext value={appLayoutHook}>
      <SessionProvider>
        {/* header */}
        <AppBar position="fixed" color="transparent" elevation={0}>
          <Toolbar sx={{ height: 'var(--header-height)', py: 2 }}>
            <Header />
          </Toolbar>
        </AppBar>

        {/* sidebar menu */}
        <Sidebar />

        {/* main content */}
        <MainContentStyled expanded={appLayoutHook.navigationMenu.isOpen}>
          {children}
        </MainContentStyled>
      </SessionProvider>
    </AppLayoutContext>
  );
};

export { AppLayout };
