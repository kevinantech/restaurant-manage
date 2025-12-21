import { SxProps, Theme } from '@mui/material/styles';
import { Color } from 'app/styles';

const sxCollapse: SxProps<Theme> = {
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
};

export default sxCollapse;
