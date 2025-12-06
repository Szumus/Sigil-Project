import { create } from "zustand";
import { CharactersState } from "../types/storeTypes";

export const useCharacterStore = create<CharactersState>((set, get) => ({
  character: {
    main: {},
    functionalStats: {},
    stats: {},
    skills: {
      basic: {
        athletics: { value: 0, prof: false, skillModifier: "STR" },
        acrobatics: { value: 0, prof: false, skillModifier: "DEX" },
        hiding: { value: 0, prof: false, skillModifier: "DEX" },
        magicSense: { value: 0, prof: false, skillModifier: "MAG" },
        mind: { value: 0, prof: false, skillModifier: "INT" },
        search: { value: 0, prof: false, skillModifier: "PER" },
        sight: { value: 0, prof: false, skillModifier: "PER" },
        hearing: { value: 0, prof: false, skillModifier: "PER" },
        smell: { value: 0, prof: false, skillModifier: "PER" },
        appearance: { value: 0, prof: false, skillModifier: "CHA" },
      },
    },
    languages: [],
    proficiencies: [],

    statuses: [],
    quick: [],
    effects: {},
    uniqSkills: [],
    eq: [],
  },

  updateCharacter: (path: string[], value: any) =>
    set((state) => {
      if (!path || path.some((p) => p === undefined || p === null))
        return state;

      let updated = { ...state.character };
      let obj: any = updated;

      for (let i = 0; i < path.length - 1; i++) {
        if (!obj[path[i]]) obj[path[i]] = {};
        obj[path[i]] = { ...obj[path[i]] };
        obj = obj[path[i]];
      }

      obj[path[path.length - 1]] = value;

      return { ...state, character: updated };
    }),

  getCharacter: () => get().character,
}));
