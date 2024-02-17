export enum PawnType {
  Air = "air",
  Ground = "ground",
}

export interface IPawn {
  _id?: any;
  name: string;
  description: string;
  hp: number;
  atk: number;
  type: PawnType;
  img: string;
  userId?: string;
}

export type ErrorMessage = { message: string };
