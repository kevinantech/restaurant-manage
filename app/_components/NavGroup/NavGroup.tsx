'use client';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { Button } from '@mui/material';
import { Color } from 'app/styles';
import { usePathname } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { marginBottom, NavLinkProps } from '../NavLink/NavLink';
import colors from 'tailwindcss/colors';

export interface NavGroupProps {
  children: React.ReactNode;
  label: string;
  startIcon: React.ReactNode;
}

const NavGroup: React.FC<NavGroupProps> = ({ children, label, startIcon }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const path = usePathname();
  const containerId = `${label}-container`;
  const contentId = `${label}-content`;
  const arrowIconId = `${label}-arrow`;
  const pathnames = useMemo(() => {
    const hrefs = React.Children.map(children, (child) => {
      if (React.isValidElement<NavLinkProps>(child)) {
        return child.props.href;
      }
    });
    return hrefs?.filter((href) => !!href) ?? [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);
  const active = pathnames?.some((href) => href === path);

  const handleClick = () => {
    const container = document.getElementById(containerId);
    const contentOffsetHeight =
      document.getElementById(contentId)?.offsetHeight;
    const arrowIcon = document.getElementById(arrowIconId);
    if (container && contentOffsetHeight && arrowIcon) {
      const newContainerHeigth =
        contentOffsetHeight + pathnames.length * marginBottom;
      container.style.height = !isOpen ? `${newContainerHeigth}px` : '0px';
      arrowIcon.style.transform = !isOpen ? 'rotate(90deg)' : '';
    }

    setOpen((state) => !state);
  };

  return (
    <>
      <Button
        startIcon={startIcon}
        endIcon={
          <KeyboardArrowRightRoundedIcon
            id={arrowIconId}
            sx={{
              color: 'inherit',
              transition: 'transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms',
            }}
          />
        }
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
          color: 'inherit',
          '&.MuiButtonBase-root.MuiButton-root': {
            backgroundColor: active ? Color.pompadour : 'transparent',
            color: active ? colors.white : 'inherit',
          },
          '& .MuiButton-icon': {
            marginLeft: 0,
          },
          '& .MuiButton-endIcon': {
            flex: 1,
            display: 'flex',
            flexDirection: 'row-reverse',
          },
          '& .MuiTouchRipple-root': {
            color: Color.pompadour,
          },
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
        onClick={handleClick}
      >
        {label}
      </Button>
      <div
        id={containerId}
        className="h-0 overflow-hidden transition-[height] duration-300 ease-in-out"
      >
        <div id={contentId} className="overflow-hidden">
          {children}
        </div>
      </div>
    </>
  );
};

export default NavGroup;
