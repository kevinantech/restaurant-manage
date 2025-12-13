import Typography from '@mui/material/Typography';
export type MenuCaptionProps = { children: string };

export const MenuCaption: React.FC<MenuCaptionProps> = ({ children }) => {
  return (
    <Typography
      variant="caption"
      sx={{
        display: 'block',
        padding: '0.5rem',
        fontSize: '0.875rem',
        fontWeight: '500',
      }}
    >
      {children}
    </Typography>
  );
};
