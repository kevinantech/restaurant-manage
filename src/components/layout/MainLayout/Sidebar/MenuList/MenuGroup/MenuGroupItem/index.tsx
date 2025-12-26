import { Color } from '@/app/styles';
import CircleIcon from '@mui/icons-material/Circle';
import ButtonBase from '@mui/material/ButtonBase';
import { grey } from '@mui/material/colors';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type GroupItemProps = {
  variant: 'collapse' | 'popper';
  href: string;
  title: string;
};

const GroupItemBase: React.FC<GroupItemProps & { className?: string }> = (
  props
) => {
  const pathname = usePathname();

  return (
    <ListItemButton
      component={Link}
      href={props.href}
      selected={pathname === props.href}
      className={props.className}
    >
      <ButtonBase disableRipple>
        <ListItemIcon>
          <CircleIcon />
        </ListItemIcon>
      </ButtonBase>
      <ListItemText>{props.title}</ListItemText>
    </ListItemButton>
  );
};

const MenuGroupItem = styled(GroupItemBase)(({ variant }) => ({
  color: grey[700],

  '&:hover, &.Mui-selected, &.Mui-selected:hover': {
    color: Color.primary[800],
    backgroundColor: 'transparent',
  },

  /* ListItemIcon */
  '& > button.MuiButtonBase-root > div.MuiListItemIcon-root': {
    color: 'inherit',
    minWidth: '1.125rem' /* 18px */,
  },

  /* CircleIcon */
  '& > button.MuiButtonBase-root > div.MuiListItemIcon-root > svg.MuiSvgIcon-root':
    {
      width: '0.375rem' /* 6px */,
      height: '0.375rem' /* 6px */,
    },

  /* Apply styles to CircleIcon when selected */
  '&.Mui-selected > button.MuiButtonBase-root > div.MuiListItemIcon-root > svg.MuiSvgIcon-root':
    {
      width: '0.5rem' /* 8px */,
      height: '0.5rem' /* 8px */,
    },

  /* ListItemText */
  '& > div.MuiListItemText-root > span.MuiTypography-root': {
    fontSize: '0.875rem' /* 16px */,
  },

  /* Apply styles to ListItemText when selected */
  '&.Mui-selected > div.MuiListItemText-root > span.MuiTypography-root': {
    fontWeight: 500,
  },

  ...(variant === 'collapse' && { marginLeft: '2.25rem' /* 36px */ }),
}));

export default MenuGroupItem;
