import Head from "next/head";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { Character, CharacterParsedResponse } from "types/character";
import CharacterPageLayout from "components/CharacterPageLayout";
import { normalizeCharacterResponse } from "utils/normalizeCharacterResponse";
import { pluckPageNumber } from "utils/pluckPageNumber";

type Props = {
  previousPage: number | null;
  nextPage: number | null;
  characters: Character[];
};

const buildCurrentPageNumber = (
  previousPage: number | null,
  nextPage: number | null
) => {
  if (nextPage) {
    return nextPage - 1;
  }

  if (previousPage) {
    return previousPage + 1;
  }

  return null;
};

const Page: NextPage<Props> = ({ characters, previousPage, nextPage }) => {
  return (
    <>
      <Head>
        <title>
          Rick and Morty - Page{" "}
          {buildCurrentPageNumber(previousPage, nextPage) ?? "Not Identified"}
        </title>
      </Head>
      <CharacterPageLayout
        previousPage={previousPage}
        nextPage={nextPage}
        characters={characters}
      />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(process.env.API_BASE_URL + "/character");
  const parsedResponse: CharacterParsedResponse | null | undefined =
    await response.json();

  if (parsedResponse && !("error" in parsedResponse)) {
    const paths = Array.from(Array(parsedResponse.info.pages).keys()).map(
      (index) => {
        return { params: { page: (index + 1).toString() } };
      }
    );

    return {
      paths,
      fallback: false,
    };
  }

  return {
    paths: [],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, { page: string }> = async (
  context
) => {
  const { page } = context.params ?? {};

  const response = await fetch(
    process.env.API_BASE_URL + "/character?page=" + page
  );
  const parsedResponse: CharacterParsedResponse | null | undefined =
    await response.json();

  if (parsedResponse && "error" in parsedResponse) {
    return {
      notFound: true,
    };
  }

  const { prev, next } = parsedResponse?.info ?? { prev: null, next: null };

  return {
    props: {
      characters: normalizeCharacterResponse(parsedResponse),
      previousPage: pluckPageNumber(prev),
      nextPage: pluckPageNumber(next),
    },
  };
};

export default Page;
