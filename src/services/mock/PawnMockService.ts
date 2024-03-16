import PawnModel from "../../models/Pawn";
import { IPawn, PawnType } from "../../types/pawn";

class PawnMockService {
  async createMockPawn(userData: {
    name: string;
    description: string;
    userId: string;
    image: string;
  }): Promise<IPawn> {
    const newPawn = new PawnModel({
      name: userData.name,
      description: userData.description,
      hp: this.generateRandomHp(),
      atk: this.generateRandomAtk(),
      type: this.randomType(),
      userId: userData.userId,
      img: userData.image,
    });

    await newPawn.save();
    return newPawn;
  }

  private generateRandomHp(): number {
    return Math.floor(Math.random() * 5) + 1;
  }

  private generateRandomAtk(): number {
    return Math.floor(Math.random() * 15) + 1;
  }

  private randomType(): "air" | "ground" {
    const types = [PawnType.Air, PawnType.Ground];
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex];
  }
}

export default PawnMockService;
