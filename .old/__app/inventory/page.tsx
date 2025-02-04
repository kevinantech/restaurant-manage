"use client";
import { PrimaryButton, SearchBar, Title } from "@/frontend/components";
import { useInventory } from "@/frontend/hooks";
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

const InventoryBar = () => {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-4 justify-between mb-5">
      <SearchBar
        className="min-w-full semi-sm:min-w-[20rem]"
        placeholder="Buscar un Insumo..."
      />
      <PrimaryButton
        className="min-w-full semi-sm:min-w-[auto]"
        label="Añadir insumo"
        onClick={() => router.push("/app/inventory/add")}
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

export default function Inventory() {
  const { inventory } = useInventory();

  return (
    <main className="bg-transparent">
      <Title>Lista de Insumos</Title>
      <InventoryBar />
      <TableContainer className="rounded-lg shadow-none" component={Paper}>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow className="bg-slate-100">
              <Cell align="left">Insumo</Cell>
              <Cell align="left">Tipo</Cell>
              <Cell align="left">Porcion</Cell>
              <Cell align="left">Stock</Cell>
              <Cell align="left"></Cell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((inventoryItem) => (
              <TableRow key={inventoryItem.id}>
                <Cell align="left">{inventoryItem.name}</Cell>
                <Cell align="left">{inventoryItem.category}</Cell>
                <Cell align="left">{`${inventoryItem.unitWeight} ${inventoryItem.unitOfMeasure}`}</Cell>
                <Cell align="left">{inventoryItem.stock}</Cell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
}
