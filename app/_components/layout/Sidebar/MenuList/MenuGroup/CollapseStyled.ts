import Collapse from '@mui/material/Collapse';
import styled from '@mui/material/styles/styled';
import { Color } from 'app/styles';

type CollapseStyledProps = {};
const CollapseStyled = styled(Collapse)<CollapseStyledProps>(({}) => ({
  position: 'relative',

  /* Vertical divider */
  '& > div.MuiCollapse-wrapper > div.MuiCollapse-wrapperInner::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '1px',
    marginLeft: '1.5rem' /* 24px */,
    backgroundColor: Color.primary[200],
  },
}));

export default CollapseStyled;
