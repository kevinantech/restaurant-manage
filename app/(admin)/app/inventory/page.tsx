'use client';
import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Title } from 'app/_components';
import { useInventory } from 'app/_hooks/useInventory';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Each child element must have a 44 px of height.
const InventoryBar = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-between mb-5">
      {/* <div className="h-10 w-full px-4 sm:w-auto border rounded-[4px] border-gray-200">
        <p className="leading-10">{'<SearchBar/>'}</p>
      </div> */}
      <Link href="/app/inventory/add" className="w-full sm:w-auto">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          className="h-10 w-full normal-case bg-pompadour shadow-none hover:shadow-none active:shadow-none font-[inherit]"
        >
          Añadir Insumo
        </Button>
      </Link>
    </div>
  );
};

const Cell: React.FC<TableCellProps> = ({ children, sx, ...props }) => {
  return (
    <TableCell
      {...props}
      sx={{
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        '& span.MuiButtonBase-root.MuiTableSortLabel-root': {
          color: '#2B3445',
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
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!show) setShow(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!show) return null;

  return (
    <main>
      <Title>Lista de Insumos</Title>
      <InventoryBar />
      <TableContainer
        className="border border-gray-200 shadow-none overflow-x-auto"
        component={Paper}
      >
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow className="font-semibold bg-neutral-100">
              <Cell align="left">Insumo</Cell>
              <Cell align="left">Precio unitario</Cell>
              <Cell align="left">Stock</Cell>
              <Cell align="left"></Cell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!inventory &&
              inventory.map((inventoryItem) => (
                <TableRow key={inventoryItem.id} className="font-medium">
                  <Cell align="left">{inventoryItem.name}</Cell>
                  <Cell align="left">{`${inventoryItem.unitPrice} COP/${inventoryItem.unitOfMeasure}`}</Cell>
                  <Cell align="left">{`${inventoryItem.stock} ${inventoryItem.unitOfMeasure}`}</Cell>
                  <Cell align="left"></Cell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
}
