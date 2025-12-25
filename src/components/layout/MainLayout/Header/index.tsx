import { Color } from '@/app/styles';
import useMainLayout from '@/hooks/useMainLayout';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Brand } from './Brand';

export type HeaderProps = {};
const Header: React.FC<HeaderProps> = ({}) => {
  const { navigationMenu } = useMainLayout();

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          display: 'flex',
          width: 'calc(var(--sidebar-width-expanded) - 2rem)',
        }}
      >
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Brand />
        </Box>
        <IconButton
          disableRipple
          onClick={navigationMenu.toggle}
          sx={{
            borderRadius: '0.5rem',
            transition: 'all .2s ease-in-out',
            backgroundColor: Color.primary[200],
            color: Color.primary[600],
            '&:hover': {
              backgroundColor: Color.primary[600],
              color: Color.primary[200],
            },
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
      </Box>
    </>
  );
};

export default Header;
