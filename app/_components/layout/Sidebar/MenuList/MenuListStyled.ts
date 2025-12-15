import styled from '@emotion/styled';
import List from '@mui/material/List';

type MenuListStyledProps = {
  expanded: boolean;
};

const MenuListStyled = styled(List, {
  shouldForwardProp: (prop) => prop !== 'expanded',
})<MenuListStyledProps>(({ expanded }) => ({
  paddingLeft: expanded ? '1rem' : '0.625rem',
  paddingRight: '1rem',
}));

export default MenuListStyled;
