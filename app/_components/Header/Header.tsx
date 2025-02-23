import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { LayoutContext } from 'app/_context/Layout';
import { signOut, useSession } from 'next-auth/react';
import { useContext, useState } from 'react';
import colors from 'tailwindcss/colors';

export interface HeaderProps {}

const useUserMenu = () => {
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
};

const Header: React.FC<HeaderProps> = ({}) => {
  const { menu } = useContext(LayoutContext);
  const userMenu = useUserMenu();
  const session = useSession();
  const logout = () => signOut();

  return (
    <header className="flex items-center h-full mx-auto px-8 border-b border-b-gray-300 text-neutral-600 bg-neutral-50">
      <div className="flex items-center mr-4 sm:mr-8 lg:hidden">
        <IconButton className="p-0" onClick={menu.open}>
          <MenuIcon />
        </IconButton>
      </div>
      <span className="block py-5 text-base font-bold">BISTRO R.M.</span>
      <div className="flex-1">{/* Futuro contenido */}</div>
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
        <MenuItem onClick={logout}>Cerrar sesión</MenuItem>
      </Menu>
    </header>
  );
};

export default Header;
