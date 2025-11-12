import { GoogleGenerativeAI } from "@google/generative-ai";
import express from 'express';

//firebaseのインポート
import { db } from "./firebaseConfig.js";
import { getFirestore, collection, doc, getDoc, getDocs, query, where, orderBy, limit, deleteDoc, setDoc } from "firebase/firestore";

const myDoc = doc(db, "character", "overview");
const myDataTest = {
    pushData: "成功！",
}

const app = express();
const port = 3000;

// YOUR_API_KEYを貼り付け
const API_KEY = "AIzaSyARFZmWVxk-lYYy3LCpx8QubhZZXmCrPco";
const genAI = new GoogleGenerativeAI(API_KEY);

// JSON形式のリクエストボディを解析するミドルウェア
app.use(express.json());

// クロスオリジンリソース共有を許可
// 本番環境では特定のドメインのみ許可するように設定予定
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// キャラ生成のエンドポイントの作成
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

//---storyエンドポイントの作成
const worldTone =
    ["受け手が「なぜそうなる？」と言う疑問が笑いになるような理由も脈絡もないストーリー",
        "本筋に関係のない情報を真面目なトーンで挿入したシュールなストーリー",
    ];

app.post('/story', async (req, res) => {
    const { name, personality, genre1, genre2 } = req.body; // HTMLから送られてきた名前を受け取る
    const prompt = `
  今から${genre1}と${genre2}を組み合わせた面白ストーリーを生成しもらいます。
  ストーリーでは以下の名前と特徴を持つキャラクターが主人公のため、
  この特徴を活かせるようなストーリー展開にしてください。
  名前: ${name} 特徴: ${personality}

  また、今回は起承転結の「起」の部分のみ出力してください。
  「起」のストーリーは200文字程度でお願いします。

  出力形式: {"introduction":起}
  `;

    try {
        //モデルを設定
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        console.log("整頓前のデータ");
        console.log(responseText);
        const data = JSON.parse(responseText.replace(/```json\n|```/g, '').trim());
        console.log("整頓後のデータ");
        console.log(data);
        // ブラウザにJSONデータを送信
        res.json(data);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }

    setDoc(myDoc, myDataTest)
        .then(() => {
            console.log('Document written successfully');
        })
        .catch((error) => {
            console.error(error);
        });
});

//---story(承)エンドポイントの作成
app.post('/development', async (req, res) => {
    const { name, personality, introduction } = req.body; // HTMLから送られてきた名前を受け取る
    const prompt = `
    今から以下のストーリーを元に起承転結の「承」の部分を考えてもらいます。
    「${introduction}」

  また、今回出力する「承」のストーリー全体の笑いのテイストは以下の通りです。
    ${worldTone[1]}

「承」の最後の文では、聞き手に選択肢を提示したり、追加の入力を促したりして、
 次の展開を分岐させるような形で終わらせてください。
 例1:「あなたはAかBどちらを選ぶ？」
 例2:「持たせるアイテムを以下のキャンバスに描いてください。」

 今回出力する「承」のストーリーは200文字程度で出力してください。

  出力形式: {"development":承}
  `;

    try {
        //モデルを設定
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        console.log("整頓前のデータ");
        console.log(responseText);
        const data = JSON.parse(responseText.replace(/```json\n|```/g, '').trim());
        console.log("整頓後のデータ");
        console.log(data);
        // ブラウザにJSONデータを送信
        res.json(data);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

//---story(転)エンドポイントの作成
app.post('/turn', async (req, res) => {
    const { name, personality, introduction, development, choice } = req.body; // HTMLから送られてきた名前を受け取る
    const prompt = `
   今から以下のストーリーを元に起承転結の「転」の部分を考えてもらいます。
    「${development}」
    また「承」の選択肢で、プレイヤーは以下を選択または入力しました。
    「${choice}」

  また、今回出力する「転」のストーリー全体の笑いのテイストは以下の通りです。
    ${worldTone[1]}

 今回出力する「転」のストーリーは200文字程度で出力してください。

  出力形式: {"turn":転}
  `;

    try {
        //モデルを設定
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        console.log("整頓前のデータ");
        console.log(responseText);
        const data = JSON.parse(responseText.replace(/```json\n|```/g, '').trim());
        console.log("整頓後のデータ");
        console.log(data);
        // ブラウザにJSONデータを送信
        res.json(data);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

//---story(結)エンドポイントの作成
app.post('/conclusion', async (req, res) => {
    const { name, personality, introduction, development, turn } = req.body; // HTMLから送られてきた名前を受け取る
    const prompt = `
  今から「起承転結」の四構成でストーリーを生成しもらいます。
  各構成は130文字程度でお願いします。

  また物語では以下の名前と性格を持つキャラクターが主人公です。
  名前: ${name} 性格: ${personality}

  また、ストーリー全体のテイストは以下の通りです。
    ${worldTone[0]}

これまでのストーリーは以下の通りです。
起「${introduction}」
承「${development}」
転「${turn}」
 この前のストーリーを元に、最後の「結」の部分を生成してください。

  出力形式: {"conclusion":結}
  `;

    try {
        //モデルを設定
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        console.log("整頓前のデータ");
        console.log(responseText);
        const data = JSON.parse(responseText.replace(/```json\n|```/g, '').trim());
        console.log("整頓後のデータ");
        console.log(data);
        // ブラウザにJSONデータを送信
        res.json(data);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// サーバーを起動
app.listen(port, () => {

});