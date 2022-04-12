import type { GetServerSideProps, NextPage } from "next";
import type { Character, CharacterParsedResponse } from "types/character";
import CharacterPageLayout from "components/CharacterPageLayout";
import { normalizeCharacterResponse } from "utils/normalizeCharacterResponse";

type Props = {
  characters: Character[];
};

const Page: NextPage<Props> = ({ characters }) => {
  return <CharacterPageLayout characters={characters} />;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { page } = context.query;

  const response = await fetch(
    process.env.API_BASE_URL + "/character?page=" + page
  );
  const parsedResponse: CharacterParsedResponse = await response.json();

  return {
    props: {
      characters: normalizeCharacterResponse(parsedResponse),
    },
  };
};

export default Page;
