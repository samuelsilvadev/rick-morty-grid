import type { Character, CharacterParsedResponse } from "types/character";

export const normalizeCharacterResponse = (
  response: CharacterParsedResponse | null | undefined
): Character[] => {
  if (response && "error" in response) {
    return [];
  }

  return (
    response?.results.map((character) => ({
      id: character.id,
      gender: character.gender,
      image: character.image,
      name: character.name,
      species: character.species,
      status: character.status,
      type: character.type || "Not Identified",
    })) ?? []
  );
};
