import { WebRoutes } from 'app/_common/routes-enum';
import Link from 'next/link';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

export type BackButtonProps = {};

const BackButton: React.FC<BackButtonProps> = ({}) => {
  return (
    <Link
      href={WebRoutes.LOGIN}
      className="absolute m-8 mt-4 md:mt-8 flex items-center w-40 p-2 rounded-full bg-[#661a5e] shadow-sm transition-all ease-in-out duration-200 hover:bg-primary hover:shadow-lg hover:translate-y-[-1px]"
    >
      <div className="flex-1 flex">
        <ArrowBackIosRoundedIcon fontSize="small" className="text-white" />
      </div>
      <span className="text-sm text-white">Volver</span>
      <div className="flex-1"></div>
    </Link>
  );
};

export { BackButton };
