import type { Character, CharacterModel } from "types/character";

export const normalizeCharacters = (
  characters: CharacterModel[]
): Character[] => {
  return (
    characters.map((character) => ({
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
