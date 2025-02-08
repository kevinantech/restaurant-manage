'use client';
import { Button } from '@mui/material';
import { Color } from 'app/_common/constants/styles/color.style';
import { usePathname, useRouter } from 'next/navigation';
import React, { MouseEvent, ReactNode, useMemo } from 'react';
import colors from 'tailwindcss/colors'; // Default colors from tailwind.
import styles from './NavLink.module.css';

export const marginBottom = 4;

interface DotProps {
  active: boolean;
}

const Dot: React.FC<DotProps> = ({ active }) => {
  return (
    <div
      className={`w-1 h-1 mx-2 rounded ${
        active ? `${styles['active-shadow']} bg-pompadour` : 'bg-neutral-600'
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const active = useMemo(() => path === href, [path]);

  return (
    <Button
      startIcon={startIcon ? startIcon : <Dot active={active} />}
      sx={{
        height: 44,
        width: '100%',
        marginBottom: `${marginBottom}px`,
        padding: '0 12px 0 16px',
        borderRadius: 1,
        justifyContent: 'start',
        fontFamily: 'inherit',
        fontSize: 14,
        textTransform: 'none',
        color: active ? Color.pompadour : 'inherit',
        '&.MuiButtonBase-root.MuiButton-root': {
          backgroundColor: active ? colors.gray[100] : 'transparent',
        },
        '& .MuiButton-icon': {
          marginLeft: 0,
        },
        '& .MuiTouchRipple-root': {
          color: Color.pompadour,
        },
        '&:hover': {
          backgroundColor: 'transparent',
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
