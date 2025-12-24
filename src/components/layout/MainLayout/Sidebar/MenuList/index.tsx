import { navList } from '@/config/navigation';
import useMainLayout from '@/hooks/useMainLayout';
import List from '@mui/material/List';
import styled from '@mui/material/styles/styled';
import Typography from '@mui/material/Typography';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
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
  const pathname = usePathname();
  const { size } = useMainLayout();

  return (
    <List
      sx={{ paddingX: size === 'icon' ? 0 : '1rem' /* 16px */ }}
      subheader={size === 'full' && <Caption>Menu</Caption>}
    >
      {navList.map((item) => (
        <Fragment key={item.id}>
          {item.type === 'NavItem' && (
            <MenuItem
              size={size}
              href={item.href}
              icon={item.icon}
              title={item.title}
              selected={pathname === item.href}
            />
          )}
          {item.type === 'NavGroup' && (
            <MenuGroup
              icon={item.icon}
              title={item.title}
              items={item.subItems}
            />
          )}
        </Fragment>
      ))}
    </List>
  );
};

export default MenuList;
