import { styled } from '@mui/material/styles';
import MuiInputLabel, { InputLabelProps } from '@mui/material/InputLabel';

const InputLabel = styled((props: InputLabelProps) => (
  <MuiInputLabel {...props} />
))(({ theme }) => ({
  color: theme.vars?.palette.text.primary,
  fontWeight: 500,
  marginBottom: '0.5rem', // 8px
}));

export default InputLabel;
