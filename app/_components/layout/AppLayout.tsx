'use client';
import { cn } from 'app/_common/cn-util';
import { AppLayoutContext } from 'app/_context/AppLayoutContext';
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export type AppLayoutProps = {
  children: React.ReactNode;
};

/**
 * Permite gestionar la apertura/cierre del menú lateral.
 */
const useMenuToggle = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const toggle = () => setOpen((prev) => !prev);
  return {
    open: isOpen,
    toggle,
    set: setOpen,
  };
};

export type AppLayoutHook = ReturnType<typeof _useAppLayout>;
const _useAppLayout = () => {
  const menuToggle = useMenuToggle();

  return {
    menuToggle,
  };
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const appLayoutHook = _useAppLayout();

  return (
    <AppLayoutContext value={appLayoutHook}>
      <SessionProvider>
        <div className="min-h-screen">
          <Header />
          <Sidebar />
          <div
            className={cn(
              'min-h-[calc(100dvh_-_var(--header-height))] p-4 rounded-t-3xl bg-secondary-200 transition-[margin-left] duration-300 ease-in-out',
              /* Mobile */
              'mx-4',

              /* Desktop */
              appLayoutHook.menuToggle.open
                ? 'lg:ml-[var(--sidebar-width-expanded)]'
                : 'lg:ml-[var(--sidebar-width-collapsed)]'
            )}
          >
            <div className="container mx-auto"></div>
            {children}
          </div>
        </div>
      </SessionProvider>
    </AppLayoutContext>
  );
};

export { AppLayout };
