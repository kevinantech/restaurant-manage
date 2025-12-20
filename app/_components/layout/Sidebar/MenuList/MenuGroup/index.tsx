import useMenuVariant from 'app/_hooks/useMenuVariant';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';
import { NavGroup } from '../../config';
import CollapseStyled from './CollapseStyled';
import GroupButton from './GroupButton';
import GroupItem from './GroupItem';
import useCollapse from './hooks/useCollapse';
import usePopper from './hooks/usePopper';
import PopperStyled from './PopperStyled';

const useMenuGroup = (props: MenuGroupProps) => {
  const pathname = usePathname();
  const popper = usePopper();
  const collapse = useCollapse();
  const menuVariant = useMenuVariant();

  const isMenuOpen = useMemo(() => {
    if (menuVariant === 'expanded') return collapse.isOpen;
    if (menuVariant === 'collapsed') return popper.isOpen;
    return false;
  }, [menuVariant, collapse.isOpen, popper.isOpen]);

  const isSelected = useMemo(() => {
    const isThereSubItemSelected = props.navGroup.subItems.some(
      (subItem) => subItem.href === pathname
    );
    return isMenuOpen || isThereSubItemSelected;
  }, [isMenuOpen, pathname]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    collapse.groupButtonHandlers.onClick();
    popper.groupButtonHandlers.onClick(event);
  };

  return { collapse, handleClick, isMenuOpen, isSelected, menuVariant, popper };
};

export type MenuGroupProps = {
  navGroup: NavGroup;
};

const MenuGroup: React.FC<MenuGroupProps> = (props) => {
  const { collapse, handleClick, isSelected, isMenuOpen, menuVariant, popper } =
    useMenuGroup(props);
  const { navGroup } = props;

  const navGroupSubItems = navGroup.subItems.map((subItem) => (
    <GroupItem key={subItem.id} item={subItem} />
  ));

  return (
    <>
      <GroupButton
        title={navGroup.title}
        icon={navGroup.icon}
        isOpen={isMenuOpen}
        selected={isSelected}
        onClick={handleClick}
        onMouseEnter={popper.groupButtonHandlers.onMouseEnter}
      />
      {menuVariant === 'expanded' && (
        <CollapseStyled in={collapse.isOpen}>{navGroupSubItems}</CollapseStyled>
      )}
      {menuVariant === 'collapsed' && (
        <PopperStyled
          ref={popper.ref}
          anchorEl={popper.anchorEl}
          open={popper.isOpen}
          placement="right"
        >
          {navGroupSubItems}
        </PopperStyled>
      )}
    </>
  );
};

export default MenuGroup;
