import { cn } from 'app/_common/cn-util';
import { SidebarMenu } from './SidebarMenu';
import { useAppLayout } from 'app/_context/AppLayoutContext';
import { Brand } from './Brand';

export type SidebarProps = {};
const Sidebar: React.FC<SidebarProps> = ({}) => {
  const { navigationMenu } = useAppLayout();

  return (
    <aside
      className={cn(
        'fixed bottom-0 bg-white',
        'transition-[transform,width] duration-300 ease-in-out',
        /* Mobile */
        'top-0 w-[var(--sidebar-width-expanded)]',
        navigationMenu.isOpen ? 'translate-x-0' : 'translate-x-[-100%]',

        /* Desktop  */
        'lg:translate-x-0 lg:top-[var(--header-height)]',
        navigationMenu.isOpen
          ? 'lg:w-[var(--sidebar-width-expanded)]'
          : 'lg:w-[var(--sidebar-width-collapsed)]'
      )}
    >
      <SidebarHeader />
      <SidebarMenu />
    </aside>
  );
};

// Solo para mobiles
const SidebarHeader = () => {
  return (
    <div
      className={cn(
        'flex items-center h-[var(--header-height)] p-4',
        'lg:hidden'
      )}
    >
      <Brand />
    </div>
  );
};

export { Sidebar };
