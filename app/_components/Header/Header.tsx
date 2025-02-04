import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Image from "next/image";
import { MouseEvent } from "react";

export interface HeaderProps {
  onClickMobileMenu: (e?: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}

const Header: React.FC<HeaderProps> = ({ onClickMobileMenu }) => {
  return (
    <header className="h-16 bg-slate-700 shadow-md">
      <div className="flex h-full mx-auto px-5 2xl:px-10">
        <div className="lg:hidden flex items-center w-10">
          <IconButton onClick={(e) => onClickMobileMenu(e)}>
            <MenuIcon />
          </IconButton>
        </div>
        <div className="flex-1">{/* Futuro contenido */}</div>
        <div className="flex justify-center items-center w-10">
          <Tooltip title="User">
            <button type="button" className="rounded-full">
              <Image width={40} height={40} src="/account.png" alt="User" />
            </button>
          </Tooltip>
        </div>
      </div>
    </header>
  );
};

export default Header;
