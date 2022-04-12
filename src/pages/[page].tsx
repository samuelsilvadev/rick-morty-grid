import type { GetServerSideProps, NextPage } from "next";
import type { Character, CharacterParsedResponse } from "types/character";
import CharacterPageLayout from "components/CharacterPageLayout";
import { normalizeCharacterResponse } from "utils/normalizeCharacterResponse";
import { pluckPageNumber } from "utils/pluckPageNumber";

type Props = {
  previousPage: number | null;
  nextPage: number | null;
  characters: Character[];
};

const Page: NextPage<Props> = ({ characters, previousPage, nextPage }) => {
  return (
    <CharacterPageLayout
      previousPage={previousPage}
      nextPage={nextPage}
      characters={characters}
    />
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { page } = context.query;

  const response = await fetch(
    process.env.API_BASE_URL + "/character?page=" + page
  );
  const parsedResponse: CharacterParsedResponse = await response.json();
  const { prev, next } = parsedResponse.info;

  return {
    props: {
      characters: normalizeCharacterResponse(parsedResponse),
      previousPage: pluckPageNumber(prev),
      nextPage: pluckPageNumber(next),
    },
  };
};

export default Page;
