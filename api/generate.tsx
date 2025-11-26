import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    const API_KEY = process.env.googleApi;
    const genAI = new GoogleGenerativeAI(API_KEY);

    const prompt = `
  以下の名前の印象から、架空の生物のステータスと性格と一つの特殊能力をJSON形式で生成してください。
  名前: ${name}
  出力形式: {"health": 数値 (1-100), "attack": 数値 (1-100), "defense": 数値 (1-100), "personality": 性格の説明, "abilities" : 特殊能力の説明}
  `;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const data = JSON.parse(responseText.replace(/```json\n|```/g, "").trim());
        return res.status(200).json(data);
    } catch (error) {
        console.error("ERROR:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}