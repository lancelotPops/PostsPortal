import React, { useState } from "react";
import './searchBar.css';

import {
  IconButton,
  TextField
} from "@mui/material";
import {
  Search as SearchIcon,
  Clear as ClearIcon
} from '@mui/icons-material';

export type SearchBarProps =
{
  onChange: (value: string) => void;
  onClear: () => void;
}

export const SearchBar = (props: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleOnChange = (value: string) => {
    setSearchValue(value);
  }

  const handleOnSearch = () => {
    props.onChange(searchValue);
  }

  const handleOnClear = () => {
    setSearchValue("");
    props.onClear();
  }

  return (
    <div className='searchBar'>
      <TextField
        className='inputField'
        label="Search by title"
        variant="outlined"
        value={searchValue}
        onChange={(e) => handleOnChange(e.target.value)}
      />
      <IconButton
        onClick={handleOnSearch}
      >
        <SearchIcon />
      </IconButton>
      <IconButton
        onClick={handleOnClear}
      >
        <ClearIcon />
      </IconButton>
    </div>
  );
}

export default SearchBar