"use client";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { LeagueFormModal, PrimaryButton, SearchBar } from "..";

export interface LeagueNavigationBarProps {}

const LeagueNavigationBar: React.FC<LeagueNavigationBarProps> = ({}) => {
  const [openLeagueForm, setOpenLeagueForm] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-between mb-5">
        <SearchBar
          className="min-w-full semi-sm:min-w-[20rem]"
          placeholder="Buscar una Liga..."
        />
        <PrimaryButton
          className="min-w-full semi-sm:min-w-[auto]"
          label="Añadir liga"
          onClick={() => setOpenLeagueForm(true)}
        >
          <AddIcon />
        </PrimaryButton>
      </div>
      <LeagueFormModal open={openLeagueForm} onClose={() => setOpenLeagueForm(false)} />
    </>
  );
};

export default LeagueNavigationBar;
