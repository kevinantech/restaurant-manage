import ButtonBase from '@mui/material/ButtonBase';
import Collapse from '@mui/material/Collapse';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import useMenuVariant from 'app/_hooks/useMenuVariant';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItemGroup } from '../../config';
import ListItemButtonStyled from './ListItemButtonStyled';

export type MenuCollapseProps = {
  open: boolean;
  subItems: NavItemGroup['subItems'];
};

const useMenuCollapse = () => {
  // Implement your custom logic here

  return {
    // Provide your custom logic here
  };
};

const MenuCollapse: React.FC<MenuCollapseProps> = (props) => {
  const {} = useMenuCollapse();
  const variant = useMenuVariant();
  const pathname = usePathname();

  const subItems = props.subItems.map((subItem) => (
    <ListItemButtonStyled
      key={subItem.id}
      component={Link}
      href={subItem.href}
      selected={pathname === subItem.href}
      disableRipple
    >
      <ButtonBase disableRipple>
        <ListItemIcon></ListItemIcon>
      </ButtonBase>
      <ListItemText>{subItem.title}</ListItemText>
    </ListItemButtonStyled>
  ));

  return variant === 'expanded' ? (
    <Collapse in={props.open}>{subItems}</Collapse>
  ) : (
    <></>
  );
};

export default MenuCollapse;
