import List from '@mui/material/List';
import styled from '@mui/material/styles/styled';
import Typography from '@mui/material/Typography';
import useMenuVariant from 'app/_hooks/useMenuVariant';
import { Fragment } from 'react';
import { navList } from './config';
import MenuGroup from './MenuGroup';
import MenuItem from './MenuItem';

const Caption = styled(Typography)({
  display: 'block',
  marginTop: '0.625rem' /* 10px */,
  padding: '0.375rem' /* 6px */,
  fontSize: '0.875rem' /* 14px */,
  fontWeight: '500',
  textTransform: 'capitalize',
});

export type MenuListProps = {};
const MenuList: React.FC<MenuListProps> = ({}) => {
  const menuVariant = useMenuVariant();

  return (
    <List
      sx={{
        paddingX: '1rem' /* 16px */,
        ...(menuVariant === 'compact' && { paddingX: '0' }),
      }}
      subheader={menuVariant === 'default' && <Caption>Menu</Caption>}
    >
      {navList.map((item) => (
        <Fragment key={item.id}>
          {item.type === 'NavItem' && <MenuItem item={item} />}
          {item.type === 'NavGroup' && <MenuGroup group={item} />}
        </Fragment>
      ))}
    </List>
  );
};

export default MenuList;
