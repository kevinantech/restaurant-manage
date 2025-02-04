export interface TitleProps {
  children: string;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return <h1 className="block mb-4 font-bold text-xl text-slate-950">{children}</h1>;
};

export default Title;
