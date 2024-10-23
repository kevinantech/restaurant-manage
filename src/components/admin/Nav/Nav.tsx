"use client";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
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
          href="/admin"
          startIcon={<DashboardRoundedIcon />}
          onClick={onClickOnALink}
        >
          Panel Principal
        </NavLink>
        <NavGroup startIcon={<Inventory2RoundedIcon />} label="Productos">
          <NavLink href="/admin/products" onClick={onClickOnALink}>
            Lista de Productos
          </NavLink>
          <NavLink href="/admin/products/add" onClick={onClickOnALink}>
            Añadir Productos
          </NavLink>
        </NavGroup>
        <NavGroup startIcon={<MonetizationOnRoundedIcon />} label="Ventas">
          <NavLink href="/admin/sales" onClick={onClickOnALink}>
            Lista de Ventas
          </NavLink>
          <NavLink href="/admin/sales/add" onClick={onClickOnALink}>
            Añadir Venta
          </NavLink>
        </NavGroup>
      </div>
    </div>
  );
};

export default Nav;
