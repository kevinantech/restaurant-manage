"use client";
import { PrimaryButton, SearchBar, Title } from "@/components/admin";
import { productsMock } from "@/data/products.mock";
import AddIcon from "@mui/icons-material/Add";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";

import { useRouter } from "next/navigation";

const ProductBar = () => {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-4 justify-between mb-5">
      <SearchBar
        className="min-w-full semi-sm:min-w-[20rem]"
        placeholder="Buscar un Producto..."
      />
      <PrimaryButton
        className="min-w-full semi-sm:min-w-[auto]"
        label="Añadir producto"
        onClick={() => router.push("/admin/products/add")}
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

export default function Products() {
  return (
    <main className="bg-transparent">
      <Title>Lista de Productos</Title>
      <ProductBar />
      <TableContainer className="rounded-lg shadow-none" component={Paper}>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow className="bg-slate-100">
              <Cell align="left">
                <TableSortLabel active>Producto</TableSortLabel>
              </Cell>
              <Cell align="left">
                <TableSortLabel active>Cantidad</TableSortLabel>
              </Cell>
              <Cell align="left">
                <TableSortLabel active>Cont. Neto / u</TableSortLabel>
              </Cell>
              <Cell align="left">
                <TableSortLabel active>Costo</TableSortLabel>
              </Cell>
              <Cell align="left"></Cell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsMock.map((product) => (
              <TableRow key={product.id}>
                <Cell align="left">{product.name}</Cell>
                <Cell align="left">{product.quantity}</Cell>
                <Cell align="left">{`${product.unitContent} ${product.unit}`}</Cell>
                <Cell align="left">{product.cost}</Cell>
                <Cell align="left">{"<Funcionaliades>"}</Cell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
}
