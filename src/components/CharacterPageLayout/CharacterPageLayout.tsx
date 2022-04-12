import CharacterCard from "components/CharacterCard";
import List from "components/List";
import type { Character } from "types/character";
import ChevronLeft from "components/icons/ChevronLeft";
import styles from "./CharacterPageLayout.module.css";

const renderCharacterCard = (character: Character) => {
  return <CharacterCard {...character} className={styles.characterCard} />;
};

type CharacterPageLayoutProps = {
  characters: Character[];
};

const CharacterPageLayout = ({ characters }: CharacterPageLayoutProps) => {
  return (
    <>
      <h1>Rick and Morty Grid</h1>
      <button
        className={`${styles.paginationButton} ${styles.paginationPreviousButton}`}
      >
        <ChevronLeft />
      </button>
      <List
        className={styles.gridOfCharacters}
        items={characters}
        renderItem={renderCharacterCard}
      />
      <button
        className={`${styles.paginationButton} ${styles.paginationNextButton}`}
      >
        <ChevronLeft />
      </button>
    </>
  );
};

export default CharacterPageLayout;
