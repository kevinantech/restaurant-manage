"use client";
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
import React from "react";

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

export type LeagueData = {
  id: string;
  name: string;
};

export interface LeagueTableProps {
  data: LeagueData[];
}

const LeagueTable: React.FC<LeagueTableProps> = ({ data }) => {
  return (
    <TableContainer className="rounded-lg shadow-none" component={Paper}>
      <Table sx={{ minWidth: 600 }}>
        <TableHead>
          <TableRow className="bg-slate-100">
            <Cell align="left">
              <TableSortLabel
                active
                IconComponent={() => (
                  <UnfoldMoreRoundedIcon className="ml-2" fontSize="small" />
                )}
              >
                Nombre
              </TableSortLabel>
            </Cell>
            <Cell align="center">Acción</Cell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ id, name }) => (
            <TableRow key={id}>
              <Cell align="left">{name}</Cell>
              <Cell align="center">Action Buttons</Cell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeagueTable;

{
  /* <DataGrid
      disableColumnResize
      disableColumnMenu
      disableRowSelectionOnClick
      columns={[
        { field: "name", headerName: "Nombre", flex: 1 },
        { field: "action", headerName: "Acción" },
      ]}
      rows={[{ id: "" }]}
      sx={{
        "&": {
          fontFamily: "inherit",
        },
      }}
    /> */
}
