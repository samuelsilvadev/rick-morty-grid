import Link from "next/link";
import CharacterCard from "components/CharacterCard";
import List from "components/List";
import type { Character } from "types/character";
import ChevronLeft from "components/icons/ChevronLeft";
import styles from "./CharacterPageLayout.module.css";

const renderCharacterCard = (character: Character) => {
  return <CharacterCard {...character} className={styles.characterCard} />;
};

type CharacterPageLayoutProps = {
  nextPage: number | null;
  previousPage: number | null;
  characters: Character[];
};

const CharacterPageLayout = ({
  characters,
  nextPage,
  previousPage,
}: CharacterPageLayoutProps) => {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.heading}>Rick and Morty Stamp Album</h1>
      </header>
      <Link href={previousPage ? `/${previousPage}` : "/#"}>
        <a
          aria-disabled={!previousPage}
          className={`${styles.paginationButton} ${
            styles.paginationPreviousButton
          } ${!previousPage ? styles.disablePaginationButton : ""}`}
        >
          <ChevronLeft />
        </a>
      </Link>
      <List
        className={styles.gridOfCharacters}
        items={characters}
        renderItem={renderCharacterCard}
      />
      <Link href={nextPage ? `/${nextPage}` : "/#"}>
        <a
          aria-disabled={!nextPage}
          className={`${styles.paginationButton} ${
            styles.paginationNextButton
          } ${!nextPage ? styles.disablePaginationButton : ""}`}
        >
          <ChevronLeft />
        </a>
      </Link>
    </>
  );
};

export default CharacterPageLayout;
