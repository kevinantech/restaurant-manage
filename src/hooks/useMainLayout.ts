import { MainLayoutContext } from '@/context/MainLayoutContext';
import { useContext } from 'react';

const useMainLayout = () => useContext(MainLayoutContext);
export default useMainLayout;
