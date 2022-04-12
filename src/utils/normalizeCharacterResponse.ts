import type { Character, CharacterParsedResponse } from "types/character";

export const normalizeCharacterResponse = (
  response: CharacterParsedResponse
): Character[] => {
  return response.results.map((character) => ({
    id: character.id,
    gender: character.gender,
    image: character.image,
    name: character.name,
    species: character.species,
    status: character.status,
    type: character.type || "Not Identified",
  }));
};
