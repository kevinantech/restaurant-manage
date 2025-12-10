import { cn } from 'app/_common/cn-util';
import { SidebarMenu } from './SidebarMenu';
import { useAppLayout } from 'app/_context/AppLayoutContext';

export type SidebarProps = {};
const Sidebar: React.FC<SidebarProps> = ({}) => {
  const { menuToggle } = useAppLayout();

  return (
    <aside
      className={cn(
        'fixed bottom-0 px-4 transition-[transform,width] duration-300 ease-in-out',
        /* Mobile */
        'top-0 w-[var(--sidebar-width-expanded)]',
        menuToggle.open ? 'translate-x-0' : 'translate-x-[-100%]',

        /* Desktop  */
        'lg:translate-x-0 lg:top-[var(--header-height)]',
        menuToggle.open
          ? 'lg:w-[var(--sidebar-width-expanded)]'
          : 'lg:w-[var(--sidebar-width-collapsed)]'
      )}
    >
      <SidebarMenu />
    </aside>
  );
};

export { Sidebar };
