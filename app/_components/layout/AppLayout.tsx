'use client';
import { cn } from 'app/_common/cn-util';
import { AppLayoutContext } from 'app/_context/AppLayoutContext';
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { SidebarDrawer } from './SidebarDrawer';

export type AppLayoutProps = {
  children: React.ReactNode;
};

/**
 * Permite gestionar la apertura/cierre del menu de navegación.
 */
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

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const appLayoutHook = _useAppLayout();

  return (
    <AppLayoutContext value={appLayoutHook}>
      <SessionProvider>
        <Header />
        <div
          className={cn(
            'flex min-h-[calc(100dvh-var(--header-height))]',
            'px-4 md:px-0 md:pr-5'
          )}
        >
          <Sidebar />
          <SidebarDrawer />
          <div className="grow p-4 rounded-t-[1.5rem] bg-secondary-200 transition-[flex-grow] duration-300 ease-in-out">
            <div className="container mx-auto">{children}</div>
          </div>
        </div>
      </SessionProvider>
    </AppLayoutContext>
  );
};

export { AppLayout };
