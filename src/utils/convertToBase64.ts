import axios from "axios";

/**
 * @param imageUrl
 */
export async function convertImageToBase64(imageUrl: string): Promise<string> {
  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });
    const base64 = Buffer.from(response.data, "binary").toString("base64");
    return `data:image/png;base64,${base64}`;
  } catch (error) {
    console.error("Błąd podczas konwersji obrazu na Base64:", error);
    throw new Error("Failed to convert image to Base64.");
  }
}
