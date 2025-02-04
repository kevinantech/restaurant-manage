"use client";
import SearchIcon from "@mui/icons-material/Search";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import {
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React, {
  InputHTMLAttributes,
  useEffect,
  MouseEvent,
  useRef,
  useState,
} from "react";

export type SearchInputData = {
  text: string;
  value: string;
};

/**
 * Features:
 * 1. Case insensitive searching
 * 2. Supports ThemeProvider (React-MUI)
 *
 * NOTE: If you remove or add props, you must omit this props
 * in the type of the `const textFieldProps` (Check the first line in the function body).
 */
export type SearchInputProps = {
  data: SearchInputData[];
  InputForValueProps?: InputHTMLAttributes<HTMLInputElement>;
  onSelectResult?: (
    event: MouseEvent<HTMLLIElement, globalThis.MouseEvent>,
    value: string
  ) => void;
  onDeselectResult?: (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
} & Omit<TextFieldProps, "value" | "id" | "disabled"> & { id: string };

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>((props, ref) => {
  /**
   * PAY ATTENTION
   * * Prevent [textFieldProps] from taking the explicit properties in the SearchInputProps type.
   */
  const {
    data,
    InputForValueProps,
    onSelectResult,
    onDeselectResult,
    InputProps, // Avoids that InputProps.endAdorment in TextField will be overridden
    ...textFieldProps
  } = props;

  const textFieldRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [menuListWidth, setMenuListWidth] = useState<number | "auto">("auto");
  const [results, setResults] = useState<SearchInputData[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);

  /**
   * Resize the witdh of the search results with the TextField of dynamic way.
   * ResizeObserver: https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
   */
  useEffect(() => {
    if (textFieldRef.current) {
      new ResizeObserver((entries) =>
        setMenuListWidth(entries[0].contentRect.width)
      ).observe(textFieldRef.current);
    }
  }, []);

  /* If the click was on the input, the results will not be closed. */
  const handleCloseResults = (event: Event | React.SyntheticEvent) => {
    if (
      textFieldRef.current &&
      textFieldRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <TextField
        ref={textFieldRef}
        disabled={disabled}
        value={searchText}
        InputProps={{
          endAdornment: disabled ? (
            <IconButton
              size="small"
              disableRipple
              onClick={(event) => {
                if (onDeselectResult) onDeselectResult(event);
                setSearchText("");
                setDisabled(false);
              }}
              sx={{ p: 0 }}
            >
              <CancelRoundedIcon color="error" />
            </IconButton>
          ) : (
            <SearchIcon sx={{ color: "rgb(115, 115, 115)" }} />
          ),
        }}
        {...textFieldProps}
        onFocus={(event) => {
          if (textFieldProps.onFocus) textFieldProps.onFocus(event);
          const value = event.target.value;
          if (value.trim()) setOpen(true);
        }}
        onChange={(event) => {
          if (textFieldProps.onChange) textFieldProps.onChange(event);
          const textFieldValue = event.target.value;
          setSearchText(textFieldValue);

          if (textFieldValue.trim()) {
            const formattedSearchText = textFieldValue.trim().toLowerCase();
            setResults(
              data.filter(({ text }) => {
                return text.trim().toLowerCase().includes(formattedSearchText);
              })
            );
          }
          if (textFieldValue.trim() && !open) return setOpen(true);
          if (!textFieldValue.trim() && open) return setOpen(false);
        }}
      />
      <Popper
        open={open}
        /* Prevents the popper from being below the helper text if there is an error. */
        anchorEl={textFieldRef.current?.children[1]}
        transition
        disablePortal
        sx={{ zIndex: 1000 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleCloseResults}>
                <MenuList
                  onKeyDown={(event: React.KeyboardEvent) => {
                    if (event.key === "Tab") {
                      event.preventDefault();
                      setOpen(true);
                    } else if (event.key === "Escape") {
                      setOpen(false);
                    }
                  }}
                  sx={{ width: menuListWidth }}
                >
                  {!results.length ? (
                    <MenuItem
                      disableRipple
                      sx={{
                        fontSize: 14,
                        whiteSpace: "normal",
                        cursor: "unset",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      No se encontraron resultados.
                    </MenuItem>
                  ) : (
                    results.map(({ text, value }) => (
                      <MenuItem
                        key={value}
                        id={value}
                        onClick={(event) => {
                          setSearchText(text);
                          setOpen(false);
                          setDisabled(true);
                          if (onSelectResult) onSelectResult(event, value);
                        }}
                      >
                        {text}
                      </MenuItem>
                    ))
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <input type="hidden" {...InputForValueProps} ref={ref} />
    </>
  );
});

export default SearchInput;
SearchInput.displayName = "SearchInput";
