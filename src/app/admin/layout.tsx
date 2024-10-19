/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Header, Loader, Nav } from "@/components/admin";
import { Drawer, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

/**
 * Intern components
 */

const DesktopNav = () => {
  return (
    <div className="fixed z-50 left-0">
      <Nav />
    </div>
  );
};

interface ResponsiveNavProps {
  open: boolean;
  onClose: () => void;
}
const ResponsiveNav: React.FC<ResponsiveNavProps> = ({ open, onClose }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Nav onClickOnALink={() => onClose()} />
    </Drawer>
  );
};

/**
 * Custom hooks
 */
const useResponsiveNav = () => {
  const [open, setOpen] = useState<boolean>(false);
  return {
    open,
    show: () => setOpen(true),
    hide: () => setOpen(false),
  };
};

const useMounting = () => {
  const [mounting, setMounting] = useState<boolean>(true);
  useEffect(() => setMounting(false), []);
  return { mounting };
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { mounting } = useMounting();
  const nav = useResponsiveNav();
  const matchResponsive = useMediaQuery("(max-width:1024px)");

  /* Cambia background del body */
  useEffect(() => document.body.classList.add("bg-[#f5fbfd]"), []);

  return mounting ? (
    <Loader />
  ) : (
    <>
      {matchResponsive ? (
        <ResponsiveNav open={nav.open} onClose={() => nav.hide()} />
      ) : (
        <DesktopNav />
      )}
      <div className="lg:ml-[17.5rem]">
        <Header onClickMobileMenu={() => nav.show()} />
        <section className="max-w-7xl mx-auto px-6 py-8">{children}</section>
      </div>
    </>
  );
}
