'use client';
import { createContext } from 'react';

type LayoutContextValue = {
  menu: {
    isResponsive: boolean;
    isOpen: boolean;
    open: () => void;
    close: () => void;
  };
};

export const LayoutContext = createContext<LayoutContextValue>(
  {} as LayoutContextValue
);
