import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import { useAppLayout } from 'app/_context/AppLayoutContext';
import { Fragment, memo } from 'react';
import { NavList } from './config';
import MenuListStyled from './MenuListStyled';
import MenuItem from './MenuItem';
export type MenuListProps = {
  menuList: NavList;
};

const SubheaderStyled = memo(
  styled(Typography)({
    display: 'block',
    marginTop: '0.625rem' /* 10px */,
    padding: '0.375rem' /* 6px */,
    fontSize: '0.875rem' /* 14px */,
    fontWeight: '500',
    textTransform: 'capitalize',
  })
);

const MenuList: React.FC<MenuListProps> = ({ menuList }) => {
  const { navigationMenu } = useAppLayout();

  return (
    <MenuListStyled
      expanded={navigationMenu.isOpen}
      subheader={
        navigationMenu.isOpen && (
          <SubheaderStyled>{menuList.title}</SubheaderStyled>
        )
      }
    >
      {menuList.items.map((item) => (
        <Fragment key={`menuItem-${item.title}`}>
          {item.type === 'item' && <MenuItem item={item} />}
          {/* TODO: add nav group */}
        </Fragment>
      ))}
    </MenuListStyled>
  );
};

export default MenuList;
