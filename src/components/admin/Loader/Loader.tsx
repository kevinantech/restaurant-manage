"use client";
import { Backdrop, CircularProgress } from "@mui/material";
import React, { Fragment } from "react";

export interface LoaderProps {
  open?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ open }) => {
  return (
    <Backdrop open={open ?? true} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Fragment>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress sx={{ "svg circle": { stroke: "url(#my_gradient)" } }} />
      </Fragment>
    </Backdrop>
  );
};

export default Loader;
