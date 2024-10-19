"use client";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import React, { ChangeEvent } from "react";

export interface SearchBarProps {
  className?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ className, placeholder, onChange }) => {
  return (
    <TextField
      className={`bg-white ${className}`}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      variant="outlined"
      placeholder={placeholder}
      sx={{
        height: "2.75rem",
        borderRadius: 2,
        "& .MuiInputBase-root.MuiOutlinedInput-root": {
          height: "100%",
          fontFamily: "inherit",
          fontSize: 14,
          "& fieldset": {
            border: "none",
          },
          "& input": {
            paddingTop: 0,
            paddingBottom: 0,
            "&::placeholder": {
              fontWeight: 600,
            },
          },
        },
      }}
    />
  );
};

export default SearchBar;

{
  /* <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-500 bg-white sm:w-80">
      <SearchIcon sx={{ fontSize: 20, color: "inherit" }} />
      <input
        className="flex-1 text-sm text-neutral-600 bg-transparent focus:outline-none placeholder:text-neutral-300 placeholder:font-semibold"
        type="text"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div> */
}
