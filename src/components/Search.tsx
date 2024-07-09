import { ChangeEvent } from "react";

type SearchProps = {
  handleInputSearch: (e: ChangeEvent<HTMLInputElement>) => void;
};

function Search({ handleInputSearch }: SearchProps) {
  return (
    <input type="text" name="search" id="search" onChange={handleInputSearch} />
  );
}

export default Search;
