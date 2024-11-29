"use client";
import { PrimaryButton, SearchBar, Title } from "@/frontend/components";
import { useProducts, useOrders } from "@/frontend/hooks";
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

const OrderBar = () => {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-4 justify-between mb-5">
      <SearchBar
        className="min-w-full semi-sm:min-w-[20rem]"
        placeholder="Buscar una venta..."
      />
      <PrimaryButton
        className="min-w-full semi-sm:min-w-[auto]"
        label="Añadir nueva orden"
        onClick={() => router.push("/app/order/add")}
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

export default function Orders() {
  const { orders } = useOrders();
  const { indexedProducts } = useProducts();

  return (
    <main className="bg-transparent">
      <Title>Lista de Ordenes</Title>
      <OrderBar />
      <TableContainer className="rounded-lg shadow-none" component={Paper}>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow className="bg-slate-100">
              <Cell align="left">Referencia</Cell>
              <Cell align="left">Fecha</Cell>
              <Cell align="left">Productos consumidos</Cell>
              <Cell align="left">Valor total</Cell>
              <Cell align="left"></Cell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((o) => {
              console.log("🚀 ~ {orders.map ~ o:", o);
              const formattedDate = new Intl.DateTimeFormat("en-GB").format(
                new Date(o.date)
              );
              return (
                <TableRow key={o.id}>
                  <Cell align="left">{o.id.slice(0, 8)}</Cell>
                  <Cell align="left">{formattedDate}</Cell>
                  <Cell align="left">
                    {o.items
                      .map(({ productId }) => {
                        const p = indexedProducts[productId];
                        return p
                          ? [p.name, " - ", p.price.toString(), "COP"].join(" ")
                          : "";
                      })
                      .join(", ")}
                  </Cell>
                  <Cell align="left">{o.totalAmount}</Cell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
}
