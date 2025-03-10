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
import { useProducts } from 'app/_hooks/useProducts';
import { unitName } from 'lib/units.util';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const ProductBar = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-between mb-5">
      {/* <div className="h-10 w-full px-4 sm:w-auto border rounded-[4px] border-gray-200">
            <p className="leading-10">{'<SearchBar/>'}</p>
          </div> */}
      <Link href="/app/products/add" className="w-full sm:w-auto">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          className="h-10 w-full normal-case bg-pompadour shadow-none hover:shadow-none active:shadow-none font-[inherit]"
        >
          Añadir Producto
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

export default function Products() {
  const { responses, handleNext } = useProducts();
  const loaderRef = useRef<HTMLDivElement>(null);

  /**
   * Pagination manages through intersection observer.
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && loaderRef.current) handleNext();
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleNext]);

  return (
    <main>
      <Title>Lista de Productos</Title>
      <ProductBar />
      <TableContainer
        className="border border-gray-200 shadow-none overflow-x-auto"
        component={Paper}
      >
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow className="font-semibold bg-neutral-100">
              <Cell align="left">Producto</Cell>
              <Cell align="left">Descripcion</Cell>
              <Cell align="left">Ingredientes</Cell>
              <Cell align="left">Precio</Cell>
              <Cell align="left"></Cell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!responses &&
              responses.map((response) =>
                response.data?.map((product) => (
                  <TableRow key={product.id}>
                    <Cell align="left">{product.name}</Cell>
                    <Cell align="left">{product.description}</Cell>
                    <Cell align="left">
                      {product.recipe
                        .map(
                          (item) =>
                            `${item.name} × ${item.quantity} ${unitName(
                              item.unitOfMeasure
                            )} `
                        )
                        .join(', ')}
                    </Cell>
                    <Cell align="left">{`${product.price} COP`}</Cell>
                  </TableRow>
                ))
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
}
