"use client";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { LoginModal } from "..";

const useLoginModal = () => {
  const [visibility, setVisibility] = useState(false);
  return {
    visibility,
    close: () => setVisibility(false),
    open: () => setVisibility(true),
  };
};

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const login = useLoginModal();
  return (
    <>
      <header className="h-16 bg-white shadow-md">
        <div className="flex h-full px-5">
          <div className="flex-1">Logo</div>
          <div className="lg:flex-[3]">League Menu</div>
          <div className="flex justify-end items-center flex-1">
            <IconButton onClick={() => login.open()}>
              <PermIdentityIcon />
            </IconButton>
          </div>
        </div>
      </header>
      <LoginModal open={login.visibility} onClose={() => login.close()} />
    </>
  );
};

export default Header;
