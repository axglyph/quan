
import { GoogleGenAI, Type } from "@google/genai";
import { QuantumNews } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const fetchQuantumTrends = async (language: 'zh' | 'en'): Promise<QuantumNews[]> => {
  const prompt = language === 'zh' 
    ? "搜索并列出过去7天内全球最热门、最具影响力的5个量子科技（量子计算、量子通信、量子精密测量等）相关的新闻或突破。请返回标题、简短摘要（50字内）和来源链接。"
    : "Identify and list the 5 most trending and impactful news articles or breakthroughs in Quantum Technology (Quantum Computing, Communication, Sensing, etc.) from the last 7 days globally. Provide a title, a short summary (under 15 words), and the source URL.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              url: { type: Type.STRING },
              source: { type: Type.STRING },
              date: { type: Type.STRING }
            },
            required: ["title", "summary", "url", "source"]
          }
        }
      },
    });

    const data = JSON.parse(response.text || "[]");
    
    // Supplement with grounding metadata if URLs are missing in the text response
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    return data.map((item: any, index: number) => ({
      ...item,
      id: `${language}-${index}`,
      language,
      // If URL is missing, try to grab from grounding chunks if available
      url: item.url || (groundingChunks[index]?.web?.uri || '#'),
      date: item.date || new Date().toISOString().split('T')[0]
    }));
  } catch (error) {
    console.error(`Error fetching ${language} quantum news:`, error);
    throw error;
  }
};
