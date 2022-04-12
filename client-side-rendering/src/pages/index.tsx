import Head from "next/head";
import CharacterPageLayout from "components/CharacterPageLayout";

const Home = () => {
  return (
    <>
      <Head>
        <title>Rick and Morty</title>
      </Head>
      <CharacterPageLayout />
    </>
  );
};

export default Home;
