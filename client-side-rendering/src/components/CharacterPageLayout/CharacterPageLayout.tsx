import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "react-query";
import CharacterCard from "components/CharacterCard";
import List from "components/List";
import ChevronLeft from "components/icons/ChevronLeft";
import { normalizeCharacterResponse } from "utils/normalizeCharacterResponse";
import type { Character, CharacterParsedResponse } from "types/character";
import styles from "./CharacterPageLayout.module.css";

const renderCharacterCard = (character: Character) => {
  return <CharacterCard {...character} className={styles.characterCard} />;
};

const fetchCharacters = async (page: string): Promise<Character[]> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/character?page=" + page
  );
  const parsedResponse: CharacterParsedResponse | null | undefined =
    await response.json();

  return normalizeCharacterResponse(parsedResponse);
};

const CharacterPageLayout = () => {
  const { query, isReady } = useRouter();
  const [currentPage, setCurrentPage] = useState<string | undefined>();
  const { data: characters = [], isLoading } = useQuery(
    ["characters", currentPage],
    () => {
      return currentPage ? fetchCharacters(currentPage) : undefined;
    }
  );

  useEffect(() => {
    if (isReady) {
      setCurrentPage(
        typeof query.page === "undefined" ? "1" : (query.page as string)
      );
    }
  }, [isReady, query.page]);

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.heading}>Rick and Morty Stamp Album</h1>
      </header>
      <Link
        href={
          typeof currentPage === "string" ? `/${Number(currentPage) - 1}` : "/#"
        }
      >
        <a
          className={`${styles.paginationButton} ${
            styles.paginationPreviousButton
          } ${
            !currentPage ||
            (typeof currentPage === "string" && Number(currentPage) - 1 <= 0)
              ? styles.disablePaginationButton
              : ""
          }`}
        >
          <ChevronLeft />
        </a>
      </Link>
      {!isLoading ? (
        <List
          className={styles.gridOfCharacters}
          items={characters}
          renderItem={renderCharacterCard}
        />
      ) : (
        "Loading..."
      )}
      <Link
        href={
          typeof currentPage === "string" ? `/${Number(currentPage) + 1}` : "/#"
        }
      >
        {/* TODO: Disable next button at the last page */}
        <a
          className={`${styles.paginationButton} ${styles.paginationNextButton}`}
        >
          <ChevronLeft />
        </a>
      </Link>
    </>
  );
};

export default CharacterPageLayout;
