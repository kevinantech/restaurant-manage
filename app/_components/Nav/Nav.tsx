'use client';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { LayoutContext } from 'app/_context/Layout';
import React, { useContext } from 'react';
import { NavGroup } from '../NavGroup';
import { NavLink } from '../NavLink';

export interface NavProps {}

const Nav: React.FC<NavProps> = () => {
  const { menu } = useContext(LayoutContext);

  return (
    <div className="relative min-h-screen pt-10 lg:pt-16 border-r border-r-gray-300 text-neutral-600 bg-white">
      <p className="block lg:hidden absolute top-5 right-5">
        <CloseRoundedIcon onClick={menu.close} />
      </p>
      <div className="p-4">
        <span className="block py-2 px-4 text-sm font-semibold">Menu</span>
        <NavLink
          href="/app/dashboard"
          startIcon={<DashboardRoundedIcon />}
          onClick={menu.close}
        >
          Panel Principal
        </NavLink>
        <NavGroup startIcon={<Inventory2RoundedIcon />} label="Insumos">
          <NavLink href="/app/inventory" onClick={menu.close}>
            Lista de Insumos
          </NavLink>
          <NavLink href="/app/inventory/add" onClick={menu.close}>
            Añadir Insumo
          </NavLink>
        </NavGroup>
        <NavGroup startIcon={<Inventory2RoundedIcon />} label="Productos">
          <NavLink href="/app/products" onClick={menu.close}>
            Lista de Productos
          </NavLink>
          <NavLink href="/app/products/add" onClick={menu.close}>
            Añadir Productos
          </NavLink>
        </NavGroup>
        <NavGroup startIcon={<ReceiptIcon />} label="Ordenes">
          <NavLink href="/app/order" onClick={menu.close}>
            Lista de Ordenes
          </NavLink>
          <NavLink href="/app/order/add" onClick={menu.close}>
            Añadir Orden
          </NavLink>
        </NavGroup>
        <NavLink
          href="/app/sales"
          startIcon={<MonetizationOnRoundedIcon />}
          onClick={menu.close}
        >
          Ventas
        </NavLink>
      </div>
    </div>
  );
};

export default Nav;
