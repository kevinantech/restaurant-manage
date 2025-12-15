'use client';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { AppLayoutContext } from 'app/_context/AppLayoutContext';
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';
import Header from './Header';
import MainContentStyled from './MainContentStyled';
import Sidebar from './Sidebar';

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

  /*   return (
    <AppLayoutContext value={appLayoutHook}>
      <SessionProvider>
        <Header />
        <div className={cn('flex', 'px-4 md:px-0 md:pr-5 bg-white')}>
          <Sidebar />
          <SidebarDrawer />
          <NewSidebar />
          <div
            className={cn(
              'grow mt-[var(--header-height)] p-4 rounded-t-[1.5rem] bg-secondary-200 transition-[margin-left] duration-300 ease-in-out',
              appLayoutHook.navigationMenu.isOpen
                ? 'md:ml-[var(--sidebar-width-expanded)]'
                : 'md:ml-[var(--sidebar-width-reduced)]'
            )}
          >
            <div className="container mx-auto">{children}</div>
          </div>
        </div>
      </SessionProvider>
    </AppLayoutContext>
  ); */
};

export { AppLayout };
