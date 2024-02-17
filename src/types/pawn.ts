export enum PawnType {
  Air = "air",
  Ground = "ground",
}

export interface IPawn {
  name: string;
  description: string;
  hp: number;
  atk: number;
  type: PawnType;
}

export type ErrorMessage = { message: string };
