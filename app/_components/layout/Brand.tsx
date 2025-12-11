import SetMealIcon from '@mui/icons-material/SetMeal';

export type BrandProps = {};
const Brand: React.FC<BrandProps> = ({}) => {
  return (
    <div className="flex items-center gap-2">
      <SetMealIcon fontSize="large" className="text-primary-800" />
      <div className="text-lg text-primary-800 font-medium">
        <p>RestoStack</p>
      </div>
    </div>
  );
};
export { Brand };
