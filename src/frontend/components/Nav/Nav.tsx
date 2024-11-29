"use client";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import ReceiptIcon from "@mui/icons-material/Receipt";
import React from "react";
import { NavGroup } from "../NavGroup";
import { NavLink } from "../NavLink";

export interface NavProps {
  onClickOnALink?: () => void;
}

const Nav: React.FC<NavProps> = ({ onClickOnALink }) => {
  return (
    <div className="w-[17.5rem] h-screen bg-slate-800 text-white">
      <span className="block pl-8 pt-5 pb-10 font-bold text-base">
        BISTRO R.M.
      </span>
      <span className="block pl-8 pb-4 font-semibold text-sm">ADMIN</span>
      <div className="px-4">
        <NavLink
          href="/app"
          startIcon={<DashboardRoundedIcon />}
          onClick={onClickOnALink}
        >
          Panel Principal
        </NavLink>
        <NavGroup startIcon={<Inventory2RoundedIcon />} label="Insumos">
          <NavLink href="/app/inventory" onClick={onClickOnALink}>
            Lista de Insumos
          </NavLink>
          <NavLink href="/app/inventory/add" onClick={onClickOnALink}>
            Añadir Insumo
          </NavLink>
        </NavGroup>
        <NavGroup startIcon={<Inventory2RoundedIcon />} label="Productos">
          <NavLink href="/app/products" onClick={onClickOnALink}>
            Lista de Productos
          </NavLink>
          <NavLink href="/app/products/add" onClick={onClickOnALink}>
            Añadir Productos
          </NavLink>
        </NavGroup>
        <NavGroup startIcon={<ReceiptIcon />} label="Ordenes">
          <NavLink href="/app/order" onClick={onClickOnALink}>
            Lista de Ordenes
          </NavLink>
          <NavLink href="/app/order/add" onClick={onClickOnALink}>
            Añadir Orden
          </NavLink>
        </NavGroup>
        <NavLink
          href="/app/sales"
          startIcon={<MonetizationOnRoundedIcon />}
          onClick={onClickOnALink}
        >
          Ventas
        </NavLink>
      </div>
    </div>
  );
};

export default Nav;
