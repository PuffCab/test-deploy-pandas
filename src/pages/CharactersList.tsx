import {
  ChangeEvent,
  MouseEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import Grid from "../components/Grid";
// import { ApiResponse, Characters, Info } from "../@types/CustomTypes";
import Search from "../components/Search";
import { CharactersContext } from "../context/CharactersContext";

function CharactersList() {
  const { characters, info, setUrl, getCharacters, url } =
    useContext(CharactersContext);

  const [userSearch, setUserSearch] = useState("");

  const filteredCharacters = characters?.filter((character) => {
    return character.name.toLowerCase().includes(userSearch.toLowerCase());
  });

  const handleInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setUserSearch(e.target.value);
  };

  const handlePagination = (e: MouseEvent<HTMLButtonElement>) => {
    console.log("event", e);
    const eventTarget = e.target as HTMLButtonElement;

    if (eventTarget.innerHTML === "Next") {
      if (info && info.next) {
        setUrl(info.next);
      }
    }
    if (eventTarget.innerHTML === "Prev") {
      if (info && info.prev) {
        setUrl(info.prev);
      }
    }
  };

  useEffect(() => {
    console.log("useEffect run");
    getCharacters(url);
  }, [url]);

  return (
    <div>
      <div>
        <Search handleInputSearch={handleInputSearch} />
        <div>
          <button onClick={handlePagination} disabled={!info?.prev}>
            Prev
          </button>
          <button onClick={handlePagination} disabled={!info?.next}>
            Next
          </button>
        </div>
      </div>
      {filteredCharacters && <Grid characters={filteredCharacters} />}
    </div>
  );
}

export default CharactersList;
