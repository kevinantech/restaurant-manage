"use client";
import { EAdminPaths } from "@/common/constants/paths-enum";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import StyleIcon from "@mui/icons-material/Style";
import React from "react";
import { NavGroup } from "../NavGroup";
import { NavLink } from "../NavLink";

export interface NavProps {
  onClickOnALink?: () => void;
}

const Nav: React.FC<NavProps> = ({ onClickOnALink }) => {
  return (
    <div className="w-[17.5rem] h-screen bg-slate-800 text-white">
      <span className="block pl-8 pt-5 pb-10 font-bold text-base">BISTRO R.M.</span>
      <span className="block pl-8 pb-4 font-semibold text-sm">ADMIN</span>
      <div className="px-4">
        <NavLink
          href={EAdminPaths.DASHBOARD}
          startIcon={<DashboardRoundedIcon />}
          onClick={onClickOnALink}
        >
          Panel Principal
        </NavLink>
        <NavGroup startIcon={<Inventory2RoundedIcon />} label="Productos">
          <NavLink href={EAdminPaths.PRODUCTS} onClick={onClickOnALink}>
            Lista de Productos
          </NavLink>
          <NavLink href={EAdminPaths.PRODUCTS + "/add"} onClick={onClickOnALink}>
            Añadir Productos
          </NavLink>
        </NavGroup>
      </div>
    </div>
  );
};

export default Nav;
