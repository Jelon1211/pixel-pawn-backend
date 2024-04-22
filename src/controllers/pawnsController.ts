import { Request, Response } from "express";

import User from "../models/User";
import Pawn from "../models/Pawn";
import { ErrorMessage, IPawn } from "../types/pawn";
import PawnMockService from "../services/mock/PawnMockService";
import { convertImageToBase64 } from "../utils/convertToBase64";
import GenerateImageService from "../services/openai/GenerateImageService";

// POST
const createNewPawn = async (req: any, res: Response<any | ErrorMessage>) => {
  const { name, description } = req.body;

  const foundUser = await User.findOne({ email: req.user }).exec();
  if (!foundUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const userId = foundUser.id;

  if (!name || !description || !userId) {
    return res.status(400).json({ message: "All fields are required!" });
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
    // const pawnToBase = await convertImageToBase64(
    //   "https://www.pixelart.name/wp-content/uploads/2017/10/Pixel-art-64x64-tutorial.png"
    // );

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

    setTimeout(() => {
      return res.json(randomPawn);
    }, 6000);
  } catch (err) {
    return res.status(500).json({ message: `Error creating new pawn. ${err}` });
  }
};

// GET
const getPawnsForUser = async (req: any, res: Response) => {
  const foundUser = await User.findOne({ email: req.user }).exec();
  if (!foundUser) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const userWithPawns = await User.findById(foundUser.id).populate("pawns");

    if (!userWithPawns) {
      return res.status(404).json({ message: "No pawns found for this user." });
    }

    return res.status(200).json(userWithPawns.pawns);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `Error fetching pawns for user. ${error}` });
  }
};

// GET /pawns/:id
const getSinglePawn = async (req: any, res: Response) => {
  const { id } = req.params;
  const foundPawn = await Pawn.findById(id).exec();

  if (!foundPawn) {
    return res.status(404).json({ message: "Pawn not found" });
  }

  return res.status(200).json(foundPawn);
};

export { createNewPawn, getPawnsForUser, getSinglePawn };
