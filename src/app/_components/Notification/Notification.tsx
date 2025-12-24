import { cn } from 'app/_common/cn-util';

export type NotificationProps = {
  text: string;
  variant?: 'default' | 'error';
};

const Notification: React.FC<NotificationProps> = ({ text, variant = 'default' }) => {
  return (
    <p
      className={cn({
        'mt-3 p-2 border border-cinnabar rounded font-medium text-xs text-cinnabar bg-[#fad7d7]':
          variant === 'error',
      })}
    >
      {text}
    </p>
  );
};

export { Notification };

/**
 * className="self-start mt-3 p-2 border border-cinnabar rounded font-medium text-xs text-cinnabar bg-[#fad7d7]"
 */
