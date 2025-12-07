import { Backdrop, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type FormFeedbackProps = {
  open: boolean;
  onAccept: () => void;
};

const FormFeedback: React.FC<FormFeedbackProps> = ({ open, onAccept }) => (
  <Backdrop open={open} className="backdrop-blur-md">
    <div className="space-y-2 flex flex-col bg-white p-4 rounded-md shadow-2xl">
      <div className="flex items-center gap-2 font-semibold">
        <CheckCircleIcon fontSize="medium" className="text-pompadour" />
        <span>¡Tu registro fue exitoso!</span>
      </div>
      <p className="text-sm pr-4 !mb-4">
        Ahora puedes iniciar sesión para acceder a tu cuenta.
      </p>
      <Button
        variant="contained"
        className="self-end font-semibold normal-case"
        onClick={onAccept}
      >
        Continuar
      </Button>
    </div>
  </Backdrop>
);

export { FormFeedback };
