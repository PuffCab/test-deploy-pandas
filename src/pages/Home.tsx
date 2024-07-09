import React, { useContext } from "react";
import { CharactersContext } from "../context/CharactersContext";
import { AuthContext } from "../context/AuthContext";
import useFetchData from "../hooks/useFetchData";
import useToggle from "../hooks/useToggle";
import useCountDown from "../hooks/useCountDown";
import { app, auth } from "../config/firebaseConfig";

//Disclaimer: below types are only in this component for the exercise. In your project put them where they belong
type BlogType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type UserType = {
  name: string;
  username: string;
  email: string;
  phone: string;
};

function Home() {
  // console.log("app :>> ", app);
  // console.log("Auth :>> ", auth);
  const { characters } = useContext(CharactersContext);
  const { user } = useContext(AuthContext);
  // console.log("characters :>> ", characters);

  return (
    <div>
      {user ? (
        <h1>Welcome {user.email} to my website</h1>
      ) : (
        <h1>No user logged in</h1>
      )}
      <h2>Welcome to our fan website about Rick & Morty</h2>
      {characters && (
        <h3>We can show you {characters.length} Ricks and Mortys</h3>
      )}
    </div>
  );
}

export default Home;
