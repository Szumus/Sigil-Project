import { SelectedStatus } from "./types"; // ← import Twojego typu

export interface Character {
  main: any;
  functionalStats: any;
  stats: any;
  skills: any;
  languages: string[];
  proficiencies: string[];
  uniqSkills: any;
  quick: any;
  effects: any;
  eq: any;
  art: string | null;

  // ✅ DODAJEMY STATUSY
  statuses: SelectedStatus[];
}
export interface CharacterArt {
  image: string | null; // base64 z inputa
}

export interface CharactersState {
  character: Character;
  updateCharacter: (path: string[], value: any) => void;
  getCharacter: () => Character;
}
