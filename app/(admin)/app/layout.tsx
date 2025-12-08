'use client';
import { Drawer, useMediaQuery } from '@mui/material';
import { Header } from 'app/_components/Header/Header';
import { Nav } from 'app/_components/Nav/Nav';
import { LayoutContext } from 'app/_context/Layout';
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';
import styles from './layout.module.css';

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
        <div className={`${styles.container} h-screen`}>
          <div className="fixed top-0 left-0 right-0 z-10 h-16">
            <Header />
          </div>
          {menu.isResponsive ? (
            <NavDrawer open={menu.isOpen} onClose={menu.close} />
          ) : (
            <div className="fixed top-0 left-0 hidden lg:block min-h-screen max-w-xs">
              <Nav />
            </div>
          )}
          <section className={`${styles.body} p-8 overflow-y-auto lg:ml-80`}>
            <div className="container mx-auto">{children}</div>
          </section>
        </div>
      </LayoutContext.Provider>
    </SessionProvider>
  );
}
