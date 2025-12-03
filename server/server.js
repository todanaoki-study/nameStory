import { GoogleGenAI, Type } from "@google/genai";
import express from 'express';
import "dotenv/config";

// 環境変数からAPIキーを取得するように修正
// ターミナルで export GEMINI_API_KEY="AIzaSy..." として設定してください
const API_KEY = process.env.GEMINI_API_KEY;

// APIキーが設定されていない場合はエラーを出す
if (!API_KEY) {
    console.error("エラー: 環境変数 GEMINI_API_KEY が設定されていません。");
    process.exit(1);
}

// 修正点1: クライアントの初期化は設定オブジェクトで行う
const genAI = new GoogleGenAI({ apiKey: API_KEY });

const app = express();
//!本番時はコメントアウト
// const port = 3000;

// JSON形式のリクエストボディを解析するミドルウェア
app.use(express.json());

// クロスオリジンリソース共有 (CORS) を許可
// 本番環境では特定のドメインのみ許可するように設定予定
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // 全てのオリジンを許可（テスト用）
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS"); // 許可するメソッド
    res.header("Access-Control-Allow-Headers", "Content-Type, Accept"); // 許可するヘッダー
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // プリフライトリクエストへの応答
    }
    next();
});

// キャラ生成のエンドポイントの作成
app.post('/generate', async (req, res) => {
    // ログはサーバーを起動しているターミナルに表示されます（ここが確認ポイント）
    console.log(`[LOG] リクエストを受信しました。名前: ${req.body.name}`);

    const { name } = req.body; // フロントエンドから送られてきた名前を受け取る

    if (!name) {
        return res.status(400).json({ error: "名前が提供されていません。" });
    }

    const prompt = `
        以下の名前の印象から、架空の生物のステータスと性格と一つの特殊能力を生成してください。
        名前: ${name}
        （出力形式はJSONスキーマで定義します。性格と能力の説明を生成してください。）
    `;

    // 修正点2: レスポンススキーマを定義し、JSON出力を強制する
    const schema = {
        type: Type.OBJECT,
        properties: {
            health: { type: Type.NUMBER, description: "架空の生物の体力。1から100の数値。" },
            attack: { type: Type.NUMBER, description: "架空の生物の攻撃力。1から100の数値。" },
            defense: { type: Type.NUMBER, description: "架空の生物の防御力。1から100の数値。" },
            personality: { type: Type.STRING, description: "生物の性格や行動様式の説明。" },
            abilities: { type: Type.STRING, description: "生物が持つ特殊能力の説明。" },
        },
        required: ["health", "attack", "defense", "personality", "abilities"],
    };

    try {
        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json", // JSON形式を強制
                responseSchema: schema, // 定義したスキーマを適用
            },
        });

        // JSONが強制されているため、そのままパースできる（余分なパース処理が不要になる）
        const jsonText = response.text.trim();
        const data = JSON.parse(jsonText);

        console.log("[LOG] Geminiから生成されたJSONデータ:", data);

        // ブラウザにJSONデータを送信
        res.json(data);

    } catch (error) {
        console.error("[ERROR] Gemini API呼び出し中にエラーが発生しました:", error);
        res.status(500).json({ error: "Internal Server Error during AI generation." });
    }
});

// サーバーを起動
//!本番時はコメントアウト
// app.listen(port, () => {
//     console.log(`[INFO] サーバーが http://localhost:${port} で起動しました。`);
// });

//!本番時はコメント解除
export default app;