import MenuIcon from '@mui/icons-material/Menu';
import { useAppLayout } from 'app/_context/AppLayoutContext';
import { Brand } from './Brand';

const MenuButton = () => {
  const { navigationMenu } = useAppLayout();
  return (
    <button
      onClick={navigationMenu.toggle}
      className="p-1 rounded-[0.25rem] text-primary-600 bg-primary-200 transition-colors duration-[250ms] ease-in-out hover:text-primary-200 hover:bg-primary-600"
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
