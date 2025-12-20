import { SvgIconComponent } from '@mui/icons-material';
import ButtonBase from '@mui/material/ButtonBase';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import useMenuVariant from 'app/_hooks/useMenuVariant';
import React from 'react';
import ListItemButtonStyled from '../MenuItem/ListItemButtonStyled';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

export type GroupButtonProps = {
  icon: SvgIconComponent;
  isOpen: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseEnter: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  selected: boolean;
  title: string;
};

const GroupButton = React.forwardRef<HTMLDivElement, GroupButtonProps>(
  (props, ref) => {
    const menuVariant = useMenuVariant();
    return (
      <ListItemButtonStyled
        ref={ref}
        variant={menuVariant}
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
        selected={props.selected}
      >
        {/* button icon wrapper */}
        <ButtonBase disableRipple>
          <ListItemIcon>
            <props.icon
              sx={{ width: menuVariant === 'expanded' ? '1.25rem' : '1.5rem' }}
            />
          </ListItemIcon>
        </ButtonBase>

        {/* button text */}
        {menuVariant === 'expanded' && (
          <ListItemText>{props.title}</ListItemText>
        )}

        {/* arrow icon */}
        {menuVariant === 'expanded' &&
          (props.isOpen ? (
            <KeyboardArrowUpRoundedIcon />
          ) : (
            <KeyboardArrowDownRoundedIcon />
          ))}
      </ListItemButtonStyled>
    );
  }
);

GroupButton.displayName = 'GroupButton';

export default GroupButton;
