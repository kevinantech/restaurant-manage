'use client';
import { Drawer, useMediaQuery } from '@mui/material';
import { Header, Nav } from 'app/_components';
import { LayoutContext } from 'app/_context/Layout';
import { SessionProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface ResponsiveNavProps {
  open: boolean;
  onClose: () => void;
}

const NavDrawer: React.FC<ResponsiveNavProps> = ({ open, onClose }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Nav />
    </Drawer>
  );
};

const useResponsive = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const isResponsive = useMediaQuery('(max-width:1024px)');

  useEffect(() => {
    if (!isResponsive && isOpen) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResponsive]);

  return {
    menu: {
      isOpen,
      isResponsive,
      open: () => setOpen(true),
      close: () => setOpen(false),
    },
  };
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const { menu } = useResponsive();

  return (
    <SessionProvider>
      <LayoutContext.Provider value={{ menu }}>
        <div className="fixed left-0 right-0 z-10 border-b border-b-gray-300 bg-neutral-50">
          <Header />
        </div>
        <div className="fixed flex w-full min-h-screen">
          {menu.isResponsive ? (
            <NavDrawer open={menu.isOpen} onClose={menu.close} />
          ) : (
            <aside className="max-w-[280px]">
              <Nav />
            </aside>
          )}
          <section className="flex-1 pt-20 pb-8 px-6 ">
            <div className="container mx-auto">{children}</div>
          </section>
        </div>
      </LayoutContext.Provider>
    </SessionProvider>
  );
}
