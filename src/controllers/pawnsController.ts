import { Request, Response } from "express";

import User from "../models/User";
import { ErrorMessage, IPawn } from "../types/pawn";
import PawnMockService from "../services/mock/PawnMockService";

const createNewPawn = async (
  req: Request<IPawn>,
  res: Response<IPawn | ErrorMessage>
) => {
  const { name, description, userId } = req.body;

  if (!name || !description || !userId) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const pawnMockService = new PawnMockService();

  try {
    const newPawn = await pawnMockService.createMockPawn({
      name,
      description,
      userId,
    });

    await User.findByIdAndUpdate(
      userId,
      { $push: { pawns: newPawn._id } },
      { new: false, upsert: true }
    );

    return res.status(201).json(newPawn);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating new pawn." });
  }
};

const getPawnsForUser = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const userWithPawns = await User.findById(userId).populate("pawns");

    if (!userWithPawns) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json(userWithPawns.pawns);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching pawns for user." });
  }
};

export { createNewPawn, getPawnsForUser };
