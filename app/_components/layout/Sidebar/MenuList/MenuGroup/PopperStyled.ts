import styled from '@mui/material/styles/styled';
import Popper from '@mui/material/Popper';

type PopperStyledProps = {};

const PopperStyled = styled(Popper)<PopperStyledProps>(({ theme }) => ({
  zIndex: theme.zIndex.appBar + 1,
}));

export default PopperStyled;
