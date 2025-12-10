import MenuIcon from '@mui/icons-material/Menu';
import SetMealIcon from '@mui/icons-material/SetMeal';
import { useAppLayout } from 'app/_context/AppLayoutContext';

const Brand = () => {
  return (
    <div className="flex items-center gap-2">
      <SetMealIcon fontSize="large" className="text-primary-800" />
      <div className="text-lg text-primary-800 font-medium">
        <p>RestoStack</p>
      </div>
    </div>
  );
};

const MenuButton = () => {
  const { menuToggle } = useAppLayout();

  return (
    <button
      onClick={menuToggle.toggle}
      className="p-1 rounded-[4px] text-primary-600 bg-primary-200 transition-colors duration-[250ms] ease-in-out hover:text-primary-200 hover:bg-primary-600"
    >
      <MenuIcon />
    </button>
  );
};

export type HeaderProps = {};
const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <header className="sticky h-[var(--header-height)] py-4 px-6 flex items-center">
      <div className="flex justify-between w-[calc(var(--sidebar-width-expanded)_-_1.5rem)] pr-4">
        <Brand />
        <MenuButton />
      </div>
      <div className="grow"></div>
      <div></div>
    </header>
  );
};

export { Header };

/* const useUserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = !!anchorEl;
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.target instanceof HTMLButtonElement) setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return {
    anchorEl,
    open,
    handleOpen,
    handleClose,
  };
}; */

/**
 * <div className="flex items-center mr-4 sm:mr-8 lg:hidden">
        <IconButton className="p-0" onClick={menuToggle.toggle}>
          <MenuIcon />
        </IconButton>
      </div>
      <span className="block py-5 text-base font-bold">BISTRO R.M.</span>
      <div className="flex-1"></div>
      <button
        type="button"
        className="py-2 text-sm bg-transparent focus:outline-none"
        onClick={userMenu.handleOpen}
      >
        {session.data?.user?.name}
        <KeyboardArrowDownRoundedIcon className="ml-1" />
      </button>
      <Menu
        open={userMenu.open}
        anchorEl={userMenu.anchorEl}
        onClose={userMenu.handleClose}
        elevation={0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiMenu-paper': {
            borderWidth: 1,
            borderColor: colors.gray[300],
          },
          '& .MuiMenuItem-root': {
            fontSize: 13,
          },
        }}
      >
        <MenuItem onClick={() => signOut()}>Cerrar sesión</MenuItem>
      </Menu>
 * 
 */
