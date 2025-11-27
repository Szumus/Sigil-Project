export interface Skill {
  _id?: string;
  skillName: string;
  desc: string;
  dmg: string;
  mana: number;
  sta: number;
}

export interface CharachterBaseSet {
  id: string;
  name: string;
  class: string;
  rang: string;
  level: number;
  race: string;
}

export interface UserId {
  _id?: number;
  username: string;
  email: string;
  password: string;
}

export interface Skills {
  skillName: string;
  skillModifyer: string;
}

export interface Status {
  name: string;
  description: string;
  levels?: Array<{
    level: number;
    description: string;
  }>;
}

export interface SelectedStatus {
  name: string;
  level?: number;
}

export interface StatProperty {
  [key: string]: number | string;
}

export interface Stat {
  value: number;
  modifier: number;
  propert?: StatProperty;
}

export interface Stats {
  [statName: string]: Stat;
}
