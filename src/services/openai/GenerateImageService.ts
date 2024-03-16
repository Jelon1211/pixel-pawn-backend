import OpenAI from "openai";

class GenerateImageService {
  private openai;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async createPawn(prompt: string) {
    try {
      const response = await this.openai.images.generate({
        prompt: prompt,
        model: "dall-e-2",
        n: 1,
        size: "256x256",
      });

      const image = response.data;

      return image;
    } catch (error) {
      console.error("Error generating image:", error);
      throw new Error("Failed to create pawn image");
    }
  }
}

export default GenerateImageService;
