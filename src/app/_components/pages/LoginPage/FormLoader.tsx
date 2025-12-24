import styles from './FormLoader.module.css';
import { GradientCircularProgress } from '../../GradientCircularProgress/GradientCircularProgress';
import { cn } from 'app/_common/cn-util';

type FormLoaderProps = {
  open?: boolean;
};

const FormLoader: React.FC<FormLoaderProps> = ({ open }) =>
  open ? (
    <div className="absolute z-10 inset-0 place-content-center place-items-center rounded-lg bg-black bg-opacity-50">
      <div className={cn(styles['form-submit-animation'])}>
        <GradientCircularProgress />
      </div>
    </div>
  ) : (
    <></>
  );

export { FormLoader };
