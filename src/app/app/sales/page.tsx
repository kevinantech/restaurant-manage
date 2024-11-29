"use client";
import { PrimaryButton, SearchBar, Title } from "@/frontend/components";
import { useProducts } from "@/frontend/hooks";
import { useSales } from "@/frontend/hooks/useSales";
import AddIcon from "@mui/icons-material/Add";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useRouter } from "next/navigation";

const SaleBar = () => {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-4 justify-between mb-5">
      <SearchBar
        className="min-w-full semi-sm:min-w-[20rem]"
        placeholder="Buscar una venta..."
      />
      <PrimaryButton
        className="min-w-full semi-sm:min-w-[auto]"
        label="Añadir venta"
        onClick={() => router.push("/admin/sales/add")}
      >
        <AddIcon />
      </PrimaryButton>
    </div>
  );
};

const Cell: React.FC<TableCellProps> = (props) => {
  const { children, sx, ...otherProps } = props;
  return (
    <TableCell
      {...otherProps}
      sx={{
        fontFamily: "inherit",
        fontWeight: 600,
        "& span.MuiButtonBase-root.MuiTableSortLabel-root": {
          color: "#2B3445",
        },
        ...sx,
      }}
    >
      {children}
    </TableCell>
  );
};

export default function Sales() {
  const { sales } = useSales();

  return (
    <main className="bg-transparent">
      <Title>Lista de Ventas</Title>
      <SaleBar />
      <TableContainer className="rounded-lg shadow-none" component={Paper}>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow className="bg-slate-100">
              <Cell align="left">Referencia</Cell>
              <Cell align="left">Orden</Cell>
              <Cell align="left">Descripción</Cell>
              <Cell align="left">Ingreso</Cell>
              <Cell align="left"></Cell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                <Cell align="left">{sale.id.slice(0, 8)}</Cell>
                <Cell align="left">{sale.orderId.slice(0, 8)}</Cell>
                <Cell align="left">
                  {sale.description ? sale.description : "No hay descripción"}
                </Cell>
                <Cell align="left">{sale.income}</Cell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
}
