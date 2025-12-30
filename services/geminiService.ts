
import { GoogleGenAI } from "@google/genai";

export const generateDescription = async (details: {
  type: string;
  rooms?: string;
  surface: string;
  location: string;
  features: string[];
}) => {
  // Correctly initialize GoogleGenAI following @google/genai guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Génère une description accrocheuse et professionnelle en français pour une annonce immobilière en Algérie avec les détails suivants :
    Type: ${details.type}
    Pièces: ${details.rooms || 'N/A'}
    Surface: ${details.surface} m²
    Localisation: ${details.location}
    Caractéristiques: ${details.features.join(', ')}
    
    La description doit être engageante et mettre en avant les points forts.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Désolé, impossible de générer la description pour le moment.";
  }
};
