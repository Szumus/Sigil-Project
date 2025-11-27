export interface Character {
  main: any;
  functionalStats: any;
  stats: any;
  skills: any;
  languages: string[];
      proficiencies: string[];
}

export interface CharactersState {
  character: Character;
  updateCharacter: (path: string[], value: any) => void;
  getCharacter: () => Character;
}
