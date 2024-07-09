import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Characters } from "../@types/CustomTypes";

function CharacterDetails() {
  const { id } = useParams();
  const [singleCharacter, setSingleCharacter] = useState<Characters | null>(
    null
  );

  const fetchSingleCharacter = async () => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      const result = (await response.json()) as Characters;
      setSingleCharacter(result);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    fetchSingleCharacter();
  }, []);

  //NOTE use the information obtained from the URL with useParams to do another fetch with the ID (or name, or whatever) of the element clicked
  return (
    <div>
      <h2>More information about {singleCharacter?.name}</h2>
      <div>
        <img src={singleCharacter?.image} alt="" />
        <p>{singleCharacter?.id}</p>
        <p>{singleCharacter?.species}</p>
        <p>{singleCharacter?.status}</p>
        <p>{singleCharacter?.gender}</p>
      </div>
    </div>
  );
}

export default CharacterDetails;
