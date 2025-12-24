import { Color } from '@/app/styles';
import useMainLayout from '@/hooks/useMainLayout';
import Collapse from '@mui/material/Collapse';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { usePathname } from 'next/navigation';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import MenuItem, { MenuItemProps } from '../MenuItem';
import MenuGroupItem from './MenuGroupItem';

type MenuGroupItem = {
  id: string;
  title: string;
  href: string;
};

export type MenuGroupProps = {
  items: MenuGroupItem[];
} & Pick<MenuItemProps, 'icon' | 'title'>;

//-----------------------------------------------------------------------------
// Hooks
//-----------------------------------------------------------------------------

export const useCollapse = () => {
  const [isOpen, setOpen] = useState(false);
  const { size } = useMainLayout();

  const handleToggle = useCallback(() => {
    if (size === 'full') setOpen((prev) => !prev);
  }, [size]);

  return {
    isOpen,
    handlers: {
      onToggle: handleToggle,
    },
  };
};

const usePopper = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);
  const [anchorEl, setAchorEl] = useState<HTMLDivElement | null>(null);
  const { size } = useMainLayout();

  // Close the popper when the menu size is full.
  useEffect(() => {
    if (size === 'full' && isOpen) setOpen(false);
  }, [size, isOpen]);

  // Close the popper when the user left the trigger button or the popper.
  useEffect(() => {
    const handleMouseOver = (event: MouseEvent) => {
      if (size === 'icon' && isOpen) {
        const target = event.target as HTMLElement;
        const isMouseOutsideGroupButton =
          anchorEl && !anchorEl.contains(target);
        const isMouseOutsidePopper =
          ref.current && !ref.current.contains(target);
        if (isMouseOutsideGroupButton && isMouseOutsidePopper) setOpen(false);
      }
    };
    document.addEventListener('mouseover', handleMouseOver);
    return () => document.removeEventListener('mouseover', handleMouseOver);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleClick = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (event) => {
      if (size === 'icon') {
        setAchorEl(event.currentTarget as HTMLDivElement);
        setOpen((prev) => !prev);
      }
    },
    [size]
  );

  const handleMouseEnter = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (event) => {
      if (size === 'icon') {
        setAchorEl(event.currentTarget as HTMLDivElement);
        setOpen(true);
      }
    },
    [size]
  );

  return {
    anchorEl,
    isOpen,
    handlers: {
      onClick: handleClick,
      onMouseEnter: handleMouseEnter,
    },
    ref,
  };
};

const useMenuGroup = (props: MenuGroupProps) => {
  const { size } = useMainLayout();
  const pathname = usePathname();
  const popper = usePopper();
  const collapse = useCollapse();

  const isMenuOpen = useMemo(() => {
    if (size === 'full') return collapse.isOpen;
    if (size === 'icon') return popper.isOpen;
    return false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapse.isOpen, popper.isOpen]);

  const selected = useMemo(() => {
    return isMenuOpen || props.items.some(({ href }) => href === pathname);
  }, [isMenuOpen, props.items, pathname]);

  const handleClick = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (event) => {
      collapse.handlers.onToggle();
      popper.handlers.onClick(event);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collapse.handlers.onToggle, popper.handlers.onClick]
  );

  return {
    collapse,
    handlers: { onClick: handleClick },
    isMenuOpen,
    popper,
    selected,
    size,
  };
};

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------

const MenuGroup: React.FC<MenuGroupProps> = (props) => {
  const { collapse, handlers, isMenuOpen, size, popper, selected } =
    useMenuGroup(props);

  const navGroupSubItems = props.items.map((subItem) => (
    <MenuGroupItem
      key={subItem.id}
      title={subItem.title}
      href={subItem.href}
      variant={size === 'full' ? 'collapse' : 'popper'}
    />
  ));

  return (
    <>
      <MenuItem
        size={size}
        icon={props.icon}
        title={props.title}
        selected={selected}
        expanded={isMenuOpen}
        onClick={handlers.onClick}
        onMouseEnter={popper.handlers.onMouseEnter}
      />
      {size === 'full' && (
        <Collapse
          in={collapse.isOpen}
          sx={{
            position: 'relative',

            /* Vertical divider */
            '& > div.MuiCollapse-wrapper > div.MuiCollapse-wrapperInner::after':
              {
                content: '""',
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: '1px',
                marginLeft: '1.5rem' /* 24px */,
                backgroundColor: Color.primary[200],
              },
          }}
        >
          {navGroupSubItems}
        </Collapse>
      )}
      {size === 'icon' && (
        <Popper
          ref={popper.ref}
          anchorEl={popper.anchorEl}
          open={popper.isOpen}
          placement="right"
          sx={(theme) => ({
            zIndex: theme.zIndex.drawer + 1,

            '& > .MuiPaper-root': {
              borderRadius: '0.5rem' /* 8px */,
              boxShadow:
                'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px',
            },
          })}
        >
          <Paper elevation={0}>{navGroupSubItems}</Paper>
        </Popper>
      )}
    </>
  );
};

export default MenuGroup;
