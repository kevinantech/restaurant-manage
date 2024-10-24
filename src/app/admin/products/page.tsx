"use client";
import { PrimaryButton, SearchBar, Title } from "@/components/admin";
import { useProducts } from "@/hooks";
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
  const { products } = useProducts();

  return (
    <main className="bg-transparent">
      <Title>Lista de Productos</Title>
      <ProductBar />
      <TableContainer className="rounded-lg shadow-none" component={Paper}>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow className="bg-slate-100">
              <Cell align="left">Producto</Cell>
              <Cell align="left">Cantidad inicial</Cell>
              <Cell align="left">Cantidad actual</Cell>
              <Cell align="left">Contenido neto por unidad</Cell>
              <Cell align="left">Costo</Cell>
              <Cell align="left"></Cell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <Cell align="left">{product.name}</Cell>
                <Cell align="left">{product.initialAmount}</Cell>
                <Cell align="left">{product.currentAmount}</Cell>
                <Cell align="left">{`${product.weightPerUnit} ${product.unit}`}</Cell>
                <Cell align="left">{product.cost}</Cell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
}
