import type { SvgIconComponent } from '@mui/icons-material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Color } from 'app/styles';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import colors from 'tailwindcss/colors';

export type MenuButtonProps = {
  title: string;
  href: string;
  Icon: SvgIconComponent;
  expanded?: boolean;
};

export const MenuButton: React.FC<MenuButtonProps> = ({
  title,
  href,
  Icon,
  expanded = true,
}) => {
  const pathname = usePathname();

  return (
    <ListItemButton
      key={href}
      href={href}
      component={Link}
      selected={pathname.startsWith(href)}
      sx={{
        color: colors.slate[700],
        '&:hover, &.Mui-selected, &.Mui-selected:hover': {
          color: Color.primary[800],
          backgroundColor: Color.primary[200],
        },
        '&.Mui-selected .MuiTypography-root': { fontWeight: '500' },
        ...(!expanded && { padding: 0 }),
      }}
    >
      <ListItemIcon
        sx={{
          color: 'inherit',
          ...(expanded
            ? { minWidth: '2.25rem' /* 36px */ }
            : {
                minWidth: '2.875rem' /* 46px */,
                height: '2.875rem' /* 46px */,
                justifyContent: 'center',
                alignItems: 'center',
              }),
        }}
      >
        <Icon
          sx={
            expanded
              ? { width: '1.25rem' /* 20 px */ }
              : { width: '1.5rem' /* 24px */ }
          }
        />
      </ListItemIcon>
      {expanded && (
        <ListItemText
          sx={{ '& .MuiTypography-root': { fontSize: '0.875rem' } }}
        >
          {title}
        </ListItemText>
      )}
    </ListItemButton>
  );
};
