"use client";
import { Color } from "@/frontend/common/constants/styles/color.style";
import { Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { MouseEvent, ReactNode } from "react";
import styles from "./NavLink.module.css";

export const marginBottom = 4;

interface DotProps {
  active: boolean;
}

const Dot: React.FC<DotProps> = ({ active }) => {
  return (
    <div
      className={`w-1 h-1 mx-2 rounded ${
        active ? `${styles["active-shadow"]} bg-admin-active` : "bg-white"
      }`}
    ></div>
  );
};

export interface NavLinkProps {
  children: string;
  href: string;
  onClick?: (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
  startIcon?: ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({
  children,
  href,
  onClick,
  startIcon,
}) => {
  const path = usePathname();
  const router = useRouter();
  const active = path === href;

  return (
    <Button
      startIcon={startIcon ? startIcon : <Dot active={active} />}
      sx={{
        height: 44,
        width: "100%",
        marginBottom: `${marginBottom}px`,
        padding: "0 12px 0 16px",
        borderRadius: 2,
        justifyContent: "start",
        fontFamily: "inherit",
        fontSize: 14,
        textTransform: "none",
        color: active ? Color["admin-active"] : "inherit",
        "&.MuiButtonBase-root.MuiButton-root": {
          backgroundColor: active ? "rgba(55, 63, 80, 0.6)" : "transparent",
        },
        "& .MuiButton-icon": {
          marginLeft: 0,
        },
        "&:hover": {
          backgroundColor: "transparent",
        },
      }}
      onClick={(event) => {
        if (onClick) onClick(event);
        router.push(href);
      }}
    >
      {children}
    </Button>
  );
};

export default NavLink;
