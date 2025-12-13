import List from '@mui/material/List';
import { MenuButton } from './SidebarMenuButton';
import { MenuCaption } from './SidebarMenuCaption';
import { menu } from './menu';

export type SidebarMenuProps = {
  expanded?: boolean;
};
export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  expanded = true,
}) => {
  return (
    <List className="space-y-1">
      {expanded && <MenuCaption>Menu</MenuCaption>}
      {menu.map(({ title, href, Icon }) => (
        <MenuButton
          key={href}
          title={title}
          href={href}
          Icon={Icon}
          expanded={expanded}
        />
      ))}
    </List>
  );
};
