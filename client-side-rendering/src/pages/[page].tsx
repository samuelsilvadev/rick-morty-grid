import Head from "next/head";
import { useRouter } from "next/router";
import CharacterPageLayout from "components/CharacterPageLayout";

const Page = () => {
  const { query } = useRouter();
  const currentPage = query.page;

  return (
    <>
      <Head>
        <title>Rick and Morty - Page {currentPage || "Not Identified"}</title>
      </Head>
      <CharacterPageLayout />
    </>
  );
};

export default Page;
