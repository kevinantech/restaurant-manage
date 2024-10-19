import { useState, useMemo } from "react";
import { SearchInputData } from "./SearchInput";

const useResults = (data: SearchInputData[], searchText: string) => {
  const [open, setOpen] = useState<boolean>(false);
  const [width, setWidth] = useState<number>();

  const results = useMemo<SearchInputData[]>(
    () => {
      const formattedSearchText = searchText.toLowerCase();
      const results = data.filter(({ text }) => {
        const formattedText = text.toLowerCase();
        return (
          formattedSearchText.trim() !== "" && formattedText.includes(formattedSearchText)
        );
      });
      return results;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, searchText]
  );

  return {
    open,
    mountResults: () => setOpen(true),
    dismountResults: () => setOpen(false),
    width,
    updateWidth: (w: number) => setWidth(w),
    results,
  };
};

const useError = () => {
  const [error, setError] = useState<boolean>(false);
  return {
    error,
    mountError: () => setError(true),
    dismountError: () => setError(false),
  };
};

export { useError, useResults };
