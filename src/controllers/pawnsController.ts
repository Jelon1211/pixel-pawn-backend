import { Request, Response } from "express";

import User from "../models/User";
import { ErrorMessage, IPawn } from "../types/pawn";
import PawnMockService from "../services/mock/PawnMockService";
import OpenAI from "openai";
import { convertImageToBase64 } from "../utils/convertToBase64";
import GenerateImageService from "../services/openai/GenerateImageService";

// POST
const createNewPawn = async (req: any, res: Response<any | ErrorMessage>) => {
  const { name, description, userId } = req.body;

  if (!name || !description || !userId) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const foundUser = await User.findOne({ email: req.user }).exec();
  if (!foundUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const generateImageService = new GenerateImageService();

  try {
    const pawnParams = `${description}, pixel art`;

    const newPawn = await generateImageService.createPawn(pawnParams);

    console.log(newPawn);

    if (!newPawn[0].url) {
      return res.status(500).json({ message: "Image URL is missing" });
    }
    const pawnToBase = await convertImageToBase64(newPawn[0].url);
    const image = pawnToBase;

    const pawnMockService = new PawnMockService();

    const randomPawn = await pawnMockService.createMockPawn({
      name,
      description,
      userId,
      image,
    });

    await User.findByIdAndUpdate(
      userId,
      { $push: { pawns: randomPawn._id } },
      { new: false, upsert: true }
    );

    return res.json(randomPawn);
  } catch (err) {
    return res.status(500).json({ message: `Error creating new pawn. ${err}` });
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
    return res
      .status(500)
      .json({ message: `Error fetching pawns for user. ${error}` });
  }
};

export { createNewPawn, getPawnsForUser };
