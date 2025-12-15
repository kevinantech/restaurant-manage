import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useAppLayout } from 'app/_context/AppLayoutContext';
import { Brand } from './Brand';
import { Color } from 'app/styles';
/* const MenuButton = () => {
  const { navigationMenu } = useAppLayout();
  return (
    <button
      onClick={navigationMenu.toggle}
      className={cn(
        'flex justify-center items-center size-[2.125rem] rounded-lg text-primary-600 bg-primary-200',
        'transition-colors duration-[250ms] ease-in-out',
        'hover:text-primary-200 hover:bg-primary-600'
      )}
    >
      <MenuIcon />
    </button>
  );
}; */

export type HeaderProps = {};
const Header: React.FC<HeaderProps> = ({}) => {
  const { navigationMenu } = useAppLayout();

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
