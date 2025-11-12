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
