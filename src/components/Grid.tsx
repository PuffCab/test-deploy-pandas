import { Col, Container, Row } from "react-bootstrap";
import { Characters } from "../@types/CustomTypes";
import CharacterCard from "./CharacterCard";

type GridProps = {
  characters: Characters[];
};

function Grid({ characters }: GridProps) {
  return (
    <Container>
      <Row>
        {characters &&
          characters.map((character) => {
            return (
              <Col key={character.id}>
                <CharacterCard
                  image={character.image}
                  name={character.name}
                  gender={character.gender}
                  species={character.species}
                  id={character.id}
                />
              </Col>
            );
          })}
      </Row>
    </Container>
  );
}

export default Grid;
