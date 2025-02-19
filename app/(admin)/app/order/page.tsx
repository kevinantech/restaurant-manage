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
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useProducts } from 'app/_hooks/useProducts';
import { useOrders } from 'app/_hooks/useOrders';

const OrderBar = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-between mb-5">
      {/* <div className="h-10 w-full px-4 sm:w-auto border rounded-[4px] border-gray-200">
        <p className="leading-10">{'<SearchBar/>'}</p>
      </div> */}
      <Link href="/app/order/add" className="w-full sm:w-auto">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          className="h-10 w-full normal-case bg-pompadour shadow-none hover:shadow-none active:shadow-none font-[inherit]"
        >
          Añadir Orden
        </Button>
      </Link>
    </div>
  );
};

const Cell: React.FC<TableCellProps> = (props) => {
  const { children, sx, ...otherProps } = props;
  return (
    <TableCell
      {...otherProps}
      sx={{
        fontFamily: 'inherit',
        fontWeight: 600,
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

export default function Orders() {
  const { orders } = useOrders();
  const { productsById } = useProducts();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!show) setShow(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!show) return null;

  return (
    <main>
      <Title>Lista de Ordenes</Title>
      <OrderBar />
      <TableContainer className="rounded-lg shadow-none" component={Paper}>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow className="bg-slate-100">
              <Cell align="left">Fecha</Cell>
              <Cell align="left">Conceptos</Cell>
              <Cell align="left">Valor total</Cell>
              <Cell align="left"></Cell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((o) => {
              const formattedDate = new Intl.DateTimeFormat('en-GB').format(
                new Date(o.createdAt)
              );
              return (
                <TableRow key={o.id}>
                  <Cell align="left">{formattedDate}</Cell>
                  <Cell align="left">
                    {o.products
                      .map(({ id }) => {
                        const p = productsById[id];
                        return p
                          ? [p.name, ' - ', p.price.toString(), 'COP'].join(' ')
                          : '';
                      })
                      .join(', ')}
                  </Cell>
                  <Cell align="left">{o.totalAmount}</Cell>
                  <Cell align="left"></Cell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
}
