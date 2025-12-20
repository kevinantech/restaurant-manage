import ButtonBase from '@mui/material/ButtonBase';
import ListItemIcon from '@mui/material/ListItemIcon';
import useMenuVariant from 'app/_hooks/useMenuVariant';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem } from '../../config';
import ListItemButtonStyled from './ListItemButtonStyled';
import ListItemText from '@mui/material/ListItemText';
export type MenuItemProps = { navItem: NavItem };

const MenuItem: React.FC<MenuItemProps> = ({ navItem }) => {
  const menuVariant = useMenuVariant();
  const pathname = usePathname();

  return (
    <ListItemButtonStyled
      component={Link}
      href={navItem.href}
      selected={pathname === navItem.href}
      variant={menuVariant}
    >
      {/* button icon wrapper */}
      <ButtonBase disableRipple>
        <ListItemIcon>
          <navItem.icon
            sx={{ width: menuVariant === 'expanded' ? '1.25rem' : '1.5rem' }}
          />
        </ListItemIcon>
      </ButtonBase>

      {/* button text */}
      {menuVariant === 'expanded' && (
        <ListItemText>{navItem.title}</ListItemText>
      )}
    </ListItemButtonStyled>
  );
};

export default MenuItem;

/* 
const useNestedMenu = () => {
  const menuVariant = useMenuVariant();
  const [isOpen, setOpen] = useState<boolean>(false);
  const toggleOpen = () => setOpen((prev) => !prev);
  const popperRef = useRef<HTMLDivElement>(null);

  const [popperAnchor, setPopperAnchor] = useState<HTMLDivElement | null>(null);

  // track if the user has left the trigger button.
  const [hasLeftTrigger, setHasLeftTrigger] = useState<boolean>(false);

  // Close the popper if the menu variant is expanded;
  useEffect(() => {
    if (menuVariant === 'expanded') return setOpen(false);
  }, [menuVariant]);

  // Close popper when the user left the trigger button without entering the popper.
  useEffect(() => {
    const handleMouseOverOutsidePopper = (event: MouseEvent) => {
      if (
        hasLeftTrigger &&
        popperRef.current &&
        !popperRef.current.contains(event.target as HTMLElement) // check if the mouse is outside the popper
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOverOutsidePopper);
    return document.removeEventListener(
      'mouseover',
      handleMouseOverOutsidePopper
    );
  }, [hasLeftTrigger]);

  const triggerHandlers = {
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (menuVariant === 'collapsed') setPopperAnchor(event.currentTarget);
      toggleOpen();
    },
    onMouseEnter: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (menuVariant === 'collapsed') {
        setPopperAnchor(event.currentTarget);
        setHasLeftTrigger(false);
        setOpen(true);
      }
    },
    onMouseLeave: () => {
      if (menuVariant === 'collapsed') setHasLeftTrigger(true);
    },
  };

  return { popperAnchor, popperRef, triggerHandlers, isOpen };
};
*/

/* 
const useMenuItem = ({ menuItem }: MenuItemProps) => {
  const pathname = usePathname();
  const menuVariant = useMenuVariant();
  const nestedMenu = useNestedMenu();

  const isSelected = useMemo(() => {
    if (menuItem.type === 'item') {
      return pathname === menuItem.href;
    }
    if (menuItem.type === 'group') {
      const isActiveBySubItems = menuItem.subItems.some(
        (subItem) => subItem.href === pathname
      );
      return (
        (menuVariant === 'expanded' && nestedMenu.isOpen) || isActiveBySubItems
      );
    }
    return false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, menuVariant, nestedMenu.isOpen]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (menuItem.type === 'group') {
      nestedMenu.triggerHandlers.onClick(event);
    }
  };

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (menuItem.type === 'group') {
      nestedMenu.triggerHandlers.onMouseEnter(event);
    }
  };

  const handleMouseLeave = () => {
    if (menuItem.type === 'group') nestedMenu.triggerHandlers.onMouseLeave();
  };

  return {
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
    isSelected,
    nestedMenu,
  };
};
*/

/* 
{menuItem.type === 'group' &&
        menuVariant === 'expanded' &&
        (nestedMenu.isOpen ? (
          <KeyboardArrowUpRoundedIcon />
        ) : (
          <KeyboardArrowDownRoundedIcon />
        ))}
*/

/*
{menuItem.type === 'group' && nestedMenu.popperAnchor && (
        <NestedMenu
          ref={nestedMenu.popperRef}
          popperAnchor={nestedMenu.popperAnchor}
          open={nestedMenu.isOpen}
          subItems={menuItem.subItems}
        />
      )}
 */
