import { GoogleGenAI, Type } from "@google/genai";
import express from 'express';
import "dotenv/config";

import { db } from "./firebaseConfig.js";

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
const port = 3000;

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
        以下の名前の印象から、架空の生物の基本属性と性格と一つの特殊能力を生成してください。
        名前: ${name}
        （出力形式はJSONスキーマで定義します。性格と能力の説明を生成してください。）
    `;

    // 修正点2: レスポンススキーマを定義し、JSON出力を強制する
    const schema = {
        type: Type.OBJECT,
        properties: {
            name: { type: Type.STRING, description: "架空生物の名前。送られてきた名前をそのまま入れてください。" },
            age: { type: Type.NUMBER, description: "架空の生物の年齢。" },
            gender: { type: Type.STRING, description: "架空の生物の性別。男や女やオカマ、秘密などユニークに設定してください。" },
            favorite: { type: Type.STRING, description: "架空の生物の好物。食べ物から概念、その生物の一番好きとするものを設定してください。" },
            personality: { type: Type.STRING, description: "生物の性格や行動様式の説明。" },
            abilities: { type: Type.STRING, description: "生物が持つ特殊能力の説明。しょうもない特殊能力を設定してください。" },
        },
        required: ["name", "age", "gender", "favorite", "personality", "abilities"],
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


        //*firebaseの保存処理
        const docData = {
            name, ...data, createdAt: new Date(),
        };

        const docRef = await db.collection("character").add(docData);
        console.log("firebaseの保存完了");
        // ブラウザにJSONデータを送信

        //フロント側にデータを返す。
        res.json({
            //作ったデータのアクセスIDとデータ本体
            id: docRef.id,
            ...data
        });
    } catch (error) {
        console.error("[ERROR] Gemini APIかFirebaseの呼び出し中にエラーが発生しました:", error);
        res.status(500).json({ error: "Internal Server Error during AI generation." });
    }
});

// ストーリー生成のエンドポイントの作成 -起
app.post("/introduction", async (req, res) => {
    console.log("処理には入った");
    console.log(`サーバー側のデータの値req.body${req.body}`);
    console.log(`サーバー側のデータの値req.body.character${req.body}`);
    // ログはサーバーを起動しているターミナルに表示されます（ここが確認ポイント）
    console.log(`[LOG] リクエストを受信しました。データ: ${req.body.character}`);

    const { character } = req.body; // フロントエンドから送られてきた名前を受け取る

    if (!character) {
        return res.status(400).json({ error: "データが提供されていません。" });
    }

    const prompt = `
       今から面白ストーリーを生成しもらいます。
  ストーリーでは以下の名前と特徴を持つキャラクターが主人公のため、
  この特徴を活かせるようなストーリー展開にしてください。
  名前: ${character.name} 性格: ${character.personality} 特徴${character.abilities}

  また、今回は起承転結の「起」の部分のみ出力してください。
  「起」のストーリーは200文字程度でお願いします。

  出力形式: {"introduction":起}
    `;

    // 修正点2: レスポンススキーマを定義し、JSON出力を強制する
    const schema = {
        type: Type.OBJECT,
        properties: {
            introduction: { type: Type.STRING, description: "ストーリーの起承転結の起を200文字程度で出力" },
        },
        required: ["introduction"],
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

        //フロント側にデータを返す。
        res.json({
            ...data
        });
    } catch (error) {
        console.error("[ERROR] Gemini APIかFirebaseの呼び出し中にエラーが発生しました:", error);
        res.status(500).json({ error: "Internal Server Error during AI generation." });
    }
});

// ストーリー生成のエンドポイントの作成 -承
app.post("/development", async (req, res) => {
    console.log("処理には入った");
    console.log(`サーバー側のデータの値req.body${req.body}`);
    console.log(`サーバー側のデータの値req.body.character${req.body}`);
    // ログはサーバーを起動しているターミナルに表示されます（ここが確認ポイント）
    console.log(`[LOG] リクエストを受信しました。データ: ${req.body.character}`);

    const { character } = req.body; // フロントエンドから送られてきた名前を受け取る
    const { story } = req.body;

    if (!character) {
        return res.status(400).json({ error: "データが提供されていません。" });
    }

    const prompt = `
       今から面白ストーリーを生成しもらいます。
  ストーリーでは以下の名前と特徴を持つキャラクターが主人公のため、
  この特徴を活かせるようなストーリー展開にしてください。
  名前: ${character.name} 性格: ${character.personality} 特徴${character.abilities}

  また、今回は起承転結の「承」の部分のみ出力してください。
  「起」のストーリーは以下の通りです。
  ${story.introduction}

  この「起」の情報を基
  「承」のストーリーを200文字程度でお願いします。


  出力形式: {"development":承}
    `;

    // 修正点2: レスポンススキーマを定義し、JSON出力を強制する
    const schema = {
        type: Type.OBJECT,
        properties: {
            development: { type: Type.STRING, description: "ストーリーの起承転結の承を200文字程度で出力" },
        },
        required: ["development"],
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

        //フロント側にデータを返す。
        res.json({
            ...data
        });
    } catch (error) {
        console.error("[ERROR] Gemini APIかFirebaseの呼び出し中にエラーが発生しました:", error);
        res.status(500).json({ error: "Internal Server Error during AI generation." });
    }
});

//ストーリー生成のエンドポイントの作成 -転
app.post("/twist", async (req, res) => {
    console.log("処理には入った");
    console.log(`サーバー側のデータの値req.body${req.body}`);
    console.log(`サーバー側のデータの値req.body.character${req.body}`);
    // ログはサーバーを起動しているターミナルに表示されます（ここが確認ポイント）
    console.log(`[LOG] リクエストを受信しました。データ: ${req.body.character}`);

    const { character } = req.body; // フロントエンドから送られてきた名前を受け取る
    const { story } = req.body;

    if (!character) {
        return res.status(400).json({ error: "データが提供されていません。" });
    }

    const prompt = `
       今から面白ストーリーを生成しもらいます。
  ストーリーでは以下の名前と特徴を持つキャラクターが主人公のため、
  この特徴を活かせるようなストーリー展開にしてください。
  名前: ${character.name} 性格: ${character.personality} 特徴${character.abilities}

  また、今回は起承転結の「転」の部分のみ出力してください。
  「起」と「承」のストーリーは以下の通りです。
  「${story.introduction}」
  「${story.development}」

  この「起」と「承」の情報を基に
  「転」のストーリーを200文字程度でお願いします。


  出力形式: {"twist":転}
    `;

    // 修正点2: レスポンススキーマを定義し、JSON出力を強制する
    const schema = {
        type: Type.OBJECT,
        properties: {
            twist: { type: Type.STRING, description: "ストーリーの起承転結の転を200文字程度で出力" },
        },
        required: ["twist"],
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

        //フロント側にデータを返す。
        res.json({
            ...data
        });
    } catch (error) {
        console.error("[ERROR] Gemini APIかFirebaseの呼び出し中にエラーが発生しました:", error);
        res.status(500).json({ error: "Internal Server Error during AI generation." });
    }
});

//ストーリー生成のエンドポイントの作成 -結
app.post("/conclusion", async (req, res) => {
    console.log("処理には入った");
    console.log(`サーバー側のデータの値req.body${req.body}`);

    // ログはサーバーを起動しているターミナルに表示されます（ここが確認ポイント）
    console.log(`[LOG] リクエストを受信しました。データ: ${req.body.character}`);

    const { character } = req.body; // フロントエンドから送られてきた名前を受け取る
    const { story } = req.body;

    if (!character) {
        return res.status(400).json({ error: "データが提供されていません。" });
    }

    const prompt = `
       今から面白ストーリーを生成しもらいます。
  ストーリーでは以下の名前と特徴を持つキャラクターが主人公のため、
  この特徴を活かせるようなストーリー展開にしてください。
  名前: ${character.name} 性格: ${character.personality} 特徴${character.abilities}

  また、今回は起承転結の「結」の部分のみ出力してください。
  「起」と「承」と「転」のストーリーは以下の通りです。
  「${story.introduction}」
  「${story.development}」
  「${story.twist}」

  この「起」と「承」と「転」の情報を基に
  「結」のストーリーを200文字程度でお願いします。


  出力形式: {"conclusion":結}
    `;

    // 修正点2: レスポンススキーマを定義し、JSON出力を強制する
    const schema = {
        type: Type.OBJECT,
        properties: {
            conclusion: { type: Type.STRING, description: "ストーリーの起承転結の結を200文字程度で出力" },
        },
        required: ["conclusion"],
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

        //フロント側にデータを返す。
        res.json({
            ...data
        });
    } catch (error) {
        console.error("[ERROR] Gemini APIかFirebaseの呼び出し中にエラーが発生しました:", error);
        res.status(500).json({ error: "Internal Server Error during AI generation." });
    }
});

//タイトル生成のエンドポイントの作成
app.post("/title", async (req, res) => {
    console.log("処理には入った");
    console.log(`サーバー側のデータの値req.body${req.body}`);

    // ログはサーバーを起動しているターミナルに表示されます（ここが確認ポイント）
    console.log(`[LOG] リクエストを受信しました。データ: ${req.body.story}`);

    const { story } = req.body;

    if (!story) {
        return res.status(400).json({ error: "データが提供されていません。" });
    }

    const prompt = `
       今からストーリーのタイトルを生成しもらいます。
       以下のストーリーからタイトルを考えてください。
  「${story.introduction}」
  「${story.development}」
  「${story.twist}」
  「${story.conclusion}」


  出力形式: {"title":タイトル}
    `;

    // 修正点2: レスポンススキーマを定義し、JSON出力を強制する
    const schema = {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING, description: "ストーリーのタイトルを出力" },
        },
        required: ["title"],
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

        //フロント側にデータを返す。
        res.json({
            ...data
        });
    } catch (error) {
        console.error("[ERROR] Gemini APIかFirebaseの呼び出し中にエラーが発生しました:", error);
        res.status(500).json({ error: "Internal Server Error during AI generation." });
    }
});

// サーバーを起動
//!本番時はコメントアウト
app.listen(port, () => {
    console.log(`[INFO] サーバーが http://localhost:${port} で起動しました。`);
});

//!本番時はコメント解除
// export default app;