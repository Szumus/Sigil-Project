export interface Character {
  main: any;
  functionalStats: any;
  stats: any;
  skills: any;
}

export interface CharactersStore {
  character: Character;
  updateCharacter: (path: string[], value: any) => void;
  getCharacter: () => Character;
}
