import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import { WebRoutes } from 'app/_common/routes-enum';
import Link from 'next/link';

export type BackButtonProps = {};

const BackButton: React.FC<BackButtonProps> = ({}) => {
  return (
    <Link href={WebRoutes.LOGIN} className="absolute m-8 mt-4 sm:mt-8">
      <Button variant="contained" size="small" startIcon={<ArrowBackIcon />}>
        Volver
      </Button>
    </Link>
  );
};

export { BackButton };
