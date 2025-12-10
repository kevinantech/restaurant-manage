import { createContext, useContext } from 'react';
import { AppLayoutHook } from 'app/_components/layout/AppLayout';

export const AppLayoutContext = createContext<AppLayoutHook>(
  {} as AppLayoutHook
);

export const useAppLayout = () => useContext(AppLayoutContext);
