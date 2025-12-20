import { usePathname } from 'next/navigation';
import { NavGroup } from '../../../config';
import ListItemButtonStyled from './ListItemButtonStyled';
import Link from 'next/link';
import useMenuVariant from 'app/_hooks/useMenuVariant';
import ButtonBase from '@mui/material/ButtonBase';
import CircleIcon from '@mui/icons-material/Circle';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export type GroupItemProps = {
  item: NavGroup['subItems'][0];
};

const useGroupItem = (props: GroupItemProps) => {
  const pathname = usePathname();
  const isSelected = pathname === props.item.href;
  return { isSelected };
};

const GroupItem: React.FC<GroupItemProps> = (props) => {
  const { isSelected } = useGroupItem(props);
  const menuVariant = useMenuVariant();

  return (
    <ListItemButtonStyled
      component={Link}
      href={props.item.href}
      selected={isSelected}
      variant={menuVariant}
    >
      <ButtonBase disableRipple>
        <ListItemIcon>
          <CircleIcon />
        </ListItemIcon>
      </ButtonBase>
      <ListItemText>{props.item.title}</ListItemText>
    </ListItemButtonStyled>
  );
};

export default GroupItem;
