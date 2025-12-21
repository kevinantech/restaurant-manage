import Collapse from '@mui/material/Collapse';
import Popper from '@mui/material/Popper';
import useMenuVariant from 'app/_hooks/useMenuVariant';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';
import { NavGroup } from '../config';
import MenuItem from '../MenuItem';
import GroupItem from './GroupItem';
import useCollapse from './hooks/useCollapse';
import usePopper from './hooks/usePopper';
import sxCollapse from './sx/Collapse';

const useMenuGroup = (props: MenuGroupProps) => {
  const pathname = usePathname();
  const popper = usePopper();
  const collapse = useCollapse();
  const variant = useMenuVariant();

  const isMenuOpen = useMemo(() => {
    if (variant === 'default') return collapse.isOpen;
    if (variant === 'compact') return popper.isOpen;
    return false;
  }, [variant, collapse.isOpen, popper.isOpen]);

  const isSelected = useMemo(() => {
    const isThereSubItemSelected = props.group.subItems.some(
      (subItem) => subItem.href === pathname
    );
    return isMenuOpen || isThereSubItemSelected;
  }, [isMenuOpen, pathname]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    collapse.mainButtonHandler.onClick();
    popper.mainButtonHandlers.onClick(event);
  };

  return {
    collapse,
    handleClick,
    isMenuOpen,
    isSelected,
    variant,
    popper,
  };
};

export type MenuGroupProps = { group: NavGroup };

const MenuGroup: React.FC<MenuGroupProps> = (props) => {
  const { collapse, handleClick, isSelected, isMenuOpen, variant, popper } =
    useMenuGroup(props);
  const { subItems, ...item } = props.group;

  const navGroupSubItems = subItems.map((subItem) => (
    <GroupItem key={subItem.id} item={subItem} />
  ));

  return (
    <>
      <MenuItem
        item={item}
        isExpanded={isMenuOpen}
        selected={isSelected}
        onClick={handleClick}
        onMouseEnter={popper.mainButtonHandlers.onMouseEnter}
      />
      {variant === 'default' && (
        <Collapse in={collapse.isOpen} sx={sxCollapse}>
          {navGroupSubItems}
        </Collapse>
      )}
      {variant === 'compact' && (
        <Popper
          ref={popper.ref}
          anchorEl={popper.anchorEl}
          open={popper.isOpen}
          placement="right"
        >
          {navGroupSubItems}
        </Popper>
      )}
    </>
  );
};

export default MenuGroup;
