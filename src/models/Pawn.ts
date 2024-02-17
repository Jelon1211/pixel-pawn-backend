import mongoose, { Document, model } from "mongoose";
import { IPawn, PawnType } from "../types/pawn";

const pawnSchema = new mongoose.Schema<IPawn>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  hp: {
    type: Number,
    required: true,
  },
  atk: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: Object.values(PawnType),
  },
  img: {
    type: String,
    required: true,
  },
  isAlive: {
    type: Boolean,
    default: true,
  },
});

const PawnModel = model<IPawn>("Pawn", pawnSchema);

export default PawnModel;
