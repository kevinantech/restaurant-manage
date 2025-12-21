import CircleIcon from '@mui/icons-material/Circle';
import ButtonBase from '@mui/material/ButtonBase';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import useMenuVariant from 'app/_hooks/useMenuVariant';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavGroup } from '../../../config';
import sxListItemButton from './sx/ListItemButton';

export type GroupItemProps = {
  item: NavGroup['subItems'][0];
};

const GroupItem: React.FC<GroupItemProps> = (props) => {
  const pathname = usePathname();
  const variant = useMenuVariant();

  return (
    <ListItemButton
      component={Link}
      href={props.item.href}
      selected={pathname === props.item.href}
      sx={sxListItemButton({ variant })}
    >
      <ButtonBase disableRipple>
        <ListItemIcon>
          <CircleIcon />
        </ListItemIcon>
      </ButtonBase>
      <ListItemText>{props.item.title}</ListItemText>
    </ListItemButton>
  );
};

export default GroupItem;
