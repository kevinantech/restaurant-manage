import styles from './FormLoader.module.css';
import { GradientCircularProgress } from '../../GradientCircularProgress/GradientCircularProgress';
import { cn } from 'app/_common/cn-util';

type FormLoaderProps = {
  open?: boolean;
};

const FormLoader: React.FC<FormLoaderProps> = ({ open }) =>
  open ? (
    <div
      className={cn(
        styles['form-submit-animation'],
        'absolute z-10 inset-0 flex items-center w-full h-full m-0 rounded-lg bg-black bg-opacity-50'
      )}
    >
      <div className="w-max my-0 mx-auto">
        <GradientCircularProgress />
      </div>
    </div>
  ) : (
    <></>
  );

export { FormLoader };
