import { Backdrop, Button } from '@mui/material';

type FormFeedbackProps = {
  open: boolean;
  onAccept: () => void;
};

const FormFeedback: React.FC<FormFeedbackProps> = ({ open, onAccept }) => (
  <Backdrop open={open} className="backdrop-blur-md">
    <div className="flex flex-col bg-white pt-8 px-6 pb-4 rounded-md">
      <p className="font-semibold mb-2">✅ ¡Tu registro fue exitoso!</p>
      <p className="text-sm mb-6">
        Ahora puedes iniciar sesión para acceder a tu cuenta.
      </p>
      <Button
        variant="outlined"
        className="self-end w-min font-semibold normal-case"
        onClick={onAccept}
      >
        Continuar
      </Button>
    </div>
  </Backdrop>
);

export { FormFeedback };
