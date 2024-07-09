import { ReactNode, createContext, useState } from "react";
import { ApiResponse, Characters, Info } from "../@types/CustomTypes";

//! - create a type for all the variables and functions we share
type CharactersContextType = {
  characters: Characters[] | null;
  url: string;
  info: Info | null;
  //   setCharacters: () => void; // I commented setCharacters because we are not sharing it in our provider, it is not needed, for now, in other components.
  setUrl: (url: string) => void;

  getCharacters: (address: string) => Promise<void>;
};

//! create a type for the react routes/components we are gonna give acces to.
type CharactersContextProviderProps = {
  children: ReactNode;
};

//! create an object with the initial value of all the variables (state variables and setters) and functions we share
const initContext = {
  characters: [] as Characters[],
  url: "",
  info: {} as Info,
  //   setCharacters: () => {
  //     throw new Error("context not initialised");
  //   },
  setUrl: () => {
    throw new Error("context not initialised");
  },
  //   setInfo: () => {
  //     throw new Error("context not initialised");
  //   },
  getCharacters: () => Promise.resolve(),
};

//REVIEW 1- create the context
export const CharactersContext =
  createContext<CharactersContextType>(initContext);

//REVIEW 2-create the provider: the store containing the values you want to share
export const CharactersContextProvider = ({
  children,
}: CharactersContextProviderProps) => {
  // console.log("children :>> ", children);
  //! 3- Move here the states and functions you want to share
  const [characters, setCharacters] = useState<Characters[] | null>(null);
  const [url, setUrl] = useState("https://rickandmortyapi.com/api/character");
  const [info, setInfo] = useState<Info | null>(null);

  const getCharacters = async (apiUrl: string) => {
    // const apiKey = import.meta.env.VITE_API_KEY;

    // console.log("apiKey :>> ", apiKey);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("...something went wrong..");
      }
      const data = (await response.json()) as ApiResponse;
      const charactersArray = data.results;
      console.log("data :>> ", data);
      setCharacters(charactersArray);
      setInfo(data.info);

      console.log("data :>> ", data);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  //! 4-in the return we inster the context's provider, and inside property value, the variables and funcitons we want to share
  return (
    <CharactersContext.Provider
      value={{ characters, url, info, setUrl, getCharacters }}
    >
      {children}
    </CharactersContext.Provider>
  );
};
