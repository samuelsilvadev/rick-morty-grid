import Head from "next/head";
import type { NextPage, GetStaticProps } from "next";
import type { Character, CharacterParsedResponse } from "types/character";
import CharacterPageLayout from "components/CharacterPageLayout";
import { normalizeCharacterResponse } from "utils/normalizeCharacterResponse";

type Props = {
  characters: Character[];
};

const Home: NextPage<Props> = ({ characters }) => {
  return (
    <>
      <Head>
        <title>Rick and Morty</title>
      </Head>
      <CharacterPageLayout
        characters={characters}
        previousPage={null}
        nextPage={2}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const response = await fetch(process.env.API_BASE_URL + "/character");
  const parsedResponse: CharacterParsedResponse | null | undefined =
    await response.json();

  return {
    props: {
      characters: normalizeCharacterResponse(parsedResponse),
    },
  };
};

export default Home;
