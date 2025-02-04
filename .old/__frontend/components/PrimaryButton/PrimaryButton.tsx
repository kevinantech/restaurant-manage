"use client";
import React, { ReactNode, MouseEvent } from "react";

export interface PrimaryButtonProps {
  children?: ReactNode;
  className?: string;
  label: string;
  onClick?: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  className,
  label,
  onClick,
}) => {
  return (
    <button
      className={`flex justify-center items-center gap-1 h-11 px-4 rounded-lg bg-blue-500 text-sm text-white transition-[background] duration-300 ease-in-out hover:bg-blue-800 
      ${className}`}
      onClick={onClick}
    >
      {children}
      <span>{label}</span>
    </button>
  );
};

export default PrimaryButton;
