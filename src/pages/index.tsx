import type { NextPage, GetServerSideProps } from "next";
import CharacterCard from "components/CharacterCard";
import List from "components/List";
import type { Character, CharacterParsedResponse } from "types/character";
import styles from "styles/index.module.css";

type Props = {
  characters: Character[];
};

const renderCharacterCard = (character: Character) => {
  return <CharacterCard {...character} className={styles.characterCard} />;
};

const Home: NextPage<Props> = ({ characters }) => {
  return (
    <>
      <h1>Rick and Morty Grid</h1>
      <List
        className={styles.gridOfCharacters}
        items={characters}
        renderItem={renderCharacterCard}
      />
    </>
  );
};

const normalizeResponse = (response: CharacterParsedResponse): Character[] => {
  return response.results.map((character) => ({
    id: character.id,
    gender: character.gender,
    image: character.image,
    name: character.name,
    species: character.species,
    status: character.status,
    type: character.type || "Not Identified",
  }));
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const response = await fetch(process.env.API_BASE_URL + "/character");
  const parsedResponse: CharacterParsedResponse = await response.json();

  return {
    props: {
      characters: normalizeResponse(parsedResponse),
    },
  };
};

export default Home;
