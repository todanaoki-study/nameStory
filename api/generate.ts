import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/generate', async (req, res) => {
    const { name } = req.body; // HTMLから送られてきた名前を受け取る
    const prompt = `
  以下の名前の印象から、架空の生物のステータスと性格と一つの特殊能力をJSON形式で生成してください。
  名前: ${name}
  出力形式: {"health": 数値 (1-100), "attack": 数値 (1-100), "defense": 数値 (1-100), "personality": 性格の説明, "abilities" : 特殊能力の説明}
  `;

    try {
        //モデルを設定
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        console.log(responseText);
        const data = JSON.parse(responseText.replace(/```json\n|```/g, '').trim());
        console.log(data);
        // ブラウザにJSONデータを送信
        res.json(data);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    // 本番環境用
    const API_KEY = process.env.GEMINI_API_KEY!;
    const genAI = new GoogleGenerativeAI(API_KEY);

    //ローカル用
    // const API_KEY = process.env.GEMINI_API_KEY!;
    // const genAI = new GoogleGenerativeAI(API_KEY);


    const prompt = `
  以下の名前の印象から、架空の生物のステータスと性格と一つの特殊能力をJSON形式で生成してください。
  名前: ${name}
  出力形式: {"health": 数値 (1-100), "attack": 数値 (1-100), "defense": 数値 (1-100), "personality": 性格の説明, "abilities" : 特殊能力の説明}
  `;

    try {
        console.log("API CALLED:name=", name);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        console.log(responseText);
        const data = JSON.parse(responseText.replace(/```json\n|```/g, "").trim());
        console.log(data);
        return res.status(200).json(data);
    } catch (error) {
        console.error("ERROR:", error);
        return res.status(500).json({ message: "Server error", error: String(error) });
    }
}

// サーバーを起動
app.listen(port, () => {

});