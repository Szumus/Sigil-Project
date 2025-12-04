import { SelectedStatus } from "./types"; // ← import Twojego typu

export interface Character {
  main: any;
  functionalStats: any;
  stats: any;
  skills: any;
  languages: string[];
  proficiencies: string[];

  // ✅ DODAJEMY STATUSY
  statuses: SelectedStatus[];
}

export interface CharactersState {
  character: Character;
  updateCharacter: (path: string[], value: any) => void;
  getCharacter: () => Character;
}
