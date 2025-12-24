import { CircularProgress } from '@mui/material';

export type GradientCircularProgressProps = {};

const GradientCircularProgress: React.FC<GradientCircularProgressProps> = ({}) => {
  return (
    <>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        thickness={5}
        sx={{
          'svg circle': { stroke: 'url(#my_gradient)', strokeLinecap: 'round' },
          width: '50px', // Ajusta el tamaño del loader
          height: '50px',
        }}
      />
    </>
  );
};

export { GradientCircularProgress };
