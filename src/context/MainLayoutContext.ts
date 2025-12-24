import type { MainLayoutHook } from '@/components/layout/MainLayout';
import { createContext } from 'react';
export const MainLayoutContext = createContext<MainLayoutHook>(
  {} as MainLayoutHook
);
