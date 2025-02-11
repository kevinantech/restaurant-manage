import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { LayoutContext } from 'app/_context/Layout';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const {
    menu: { open },
  } = useContext(LayoutContext);

  const { data: session } = useSession();

  return (
    <header className="flex items-center h-full mx-auto px-8 border-b border-b-gray-300 text-neutral-600 bg-neutral-50">
      <div className="flex items-center mr-4 sm:mr-8 lg:hidden">
        <IconButton className="p-0" onClick={open}>
          <MenuIcon />
        </IconButton>
      </div>
      <span className="block py-5 text-base font-bold">BISTRO R.M.</span>
      <div className="flex-1">{/* Futuro contenido */}</div>
      <button
        type="button"
        className="border border-yellow-400 px-2 text-sm bg-transparent"
      >
        {session?.user?.name}
      </button>
    </header>
  );
};

export default Header;
