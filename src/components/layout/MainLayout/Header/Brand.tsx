import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import { Box, Typography } from '@mui/material';
import { Color } from '@/app/styles';

export type BrandProps = {};

const Brand: React.FC<BrandProps> = ({}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      color={Color.primary['800']}
    >
      <WidgetsRoundedIcon fontSize="large" />
      <Typography variant="h6" sx={{ fontWeight: 500 }}>
        RestoStack
      </Typography>
    </Box>
  );
};

export { Brand };
