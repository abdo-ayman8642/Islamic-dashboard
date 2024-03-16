import { useEffect, useState } from "react";
import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
 
interface Props {
  handleChange: (value: string) => void;
}

interface IState {
  term: string;
  debouncedTerm: string;
}

const INITIAL_STATE: IState = { term: "", debouncedTerm: "" };

const ExportSearch: React.FC<Props> = ({ handleChange }) => {
  const [state, setState] = useState(INITIAL_STATE);
  const { term, debouncedTerm } = state;
   useEffect(() => {
    const timer = setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        term: debouncedTerm,
      }));
    }, 500);

    return () => clearTimeout(timer);

    // eslint-disable-next-line
  }, [debouncedTerm]);

  useEffect(() => {
    handleChange(term);

    // eslint-disable-next-line
  }, [term]);

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "grey.300",
        px: 2,
        py: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
        backgroundColor: "common.white",
        overflow: "hidden",
        maxWidth: 300,
        borderRadius: 5,
        maxHeight: 50,
      }}
    >
      <SearchIcon fontSize="small" sx={{ color: "grey.600" }} />
      <InputBase

        sx={{ ml: 1, flex: 1 }}
        inputProps={{ "aria-label": "search resource" }}
        placeholder= "Search"
        value={debouncedTerm}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setState((prevState) => ({
            ...prevState,
            debouncedTerm: event?.target.value,
          }))
        }
      />
      {term.length > 0 && (
        <CloseIcon
          fontSize="small"
          sx={{ cursor: "pointer" }}
          onClick={() =>
            setState((prevState) => ({
              ...prevState,
              debouncedTerm: "",
            }))
          }
        />
      )}
    </Box>
  );
};

export default ExportSearch;
