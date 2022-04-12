export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  type: string;
};

export type CharacterModel = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  type: string;
  origin: { name: string; url: string };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type CharacterParsedResponse =
  | {
      info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
      };
      results: CharacterModel[];
    }
  | { error: string };
