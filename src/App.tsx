import React, { useState, useEffect } from 'react'; //useEffectの定義
import './scss/style.min.css';

//必要ページのインポート
import StartScreen from './pages/title.tsx'
import InputName from './pages/inputName.tsx'
import Generating from './pages/generating.tsx';
import MyCharacterSheet from './pages/MyCharacterSheet.tsx';
import Story from "./pages/story.tsx";
import Result from "./pages/result.tsx";
import Record from './pages/record.tsx';
// import TargetLog from './pages/targetLog.tsx';

//必要コンポーネントのインポート
// import Btn from './components/btn.tsx'
// import Header from './components/header.tsx';
// import Footer from './components/footer.tsx';

//必要な定義型をインポート
import type { CharacterResult } from "./types/character.ts";
import type { StoryData } from "./types/story.ts";

const App: React.FC = () => {
  //*オブザーバー一覧
  //ゲームページの切り替えスイッチ
  const [gameState, setGameState] = useState<"title" | "inputName" | "generating" | "CharacterSheet" | "story" | "result" | "record" | "targetLog">("title");
  //フォーム値を対象の値へ飛ばすためのスイッチ
  const [sharedValue, setSharedValue] = useState("");
  //キャラクターデータの送受信を感知する
  const [characterData, setCharacterData] = useState<CharacterResult | null>(null);
  //ストーリーのデータの送受信を検知する
  const [storyData, setStoryData] = useState<StoryData | null>(null);
  //ストーリーの進行度のスイッチ(初期値null)
  const [storyStep, setStoryStep] = useState<"introduction" | "development" | "twist" | "conclusion" | "title" | null>(null);

  //特定のページから入力値を送受信する関数
  const handleNameSubmit = (value: string) => {
    setSharedValue(value);
  }

  //ストーリー生成サーバーへデータを送り、結果を受け取る処理。
  const storyGenHandle = async () => {
    if (!characterData) {
      console.log("キャラデータが送られてきていません");
      return;
    }
    console.log(`まず渡ってきたキャラデータの形${characterData}`);

    //サーバへアクセス
    try {
      //データが返ってくるまで、generatingページへ。
      setGameState("generating");
      // !ローカル
      // const API_URL = `http://localhost:3000/${storyStep}`;
      // !本番
      const API_URL = `/introduction${storyStep}`;

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        //nameという値でsharedValueをサーバーに送信する。
        body: JSON.stringify({ character: characterData, story: storyData }),
      })

      //返却されなかったら
      if (!res.ok) {
        const errorBody = await res.json();
        console.error("API ERROR:", res.status, errorBody);
        throw new Error(`APIリクエスト失敗: ${res.status}`);
      }

      //データを整理してそれぞれのデータボックスに保存
      const data = await res.json();
      console.log(data.introduction);

      setStoryData(data);
      console.log(data);
      setGameState("story");
    }
    catch (error) {
      console.error("Error during character generation:", error);
    }
  }

  //ストーリー状態が切り替わるたび呼び出し。
  useEffect(() => {
    storyGenHandle();
  }, [storyStep]);

  const renderScreen = () => {
    switch (gameState) {
      case "title":
        return <StartScreen setGameState={setGameState} />;

      case "inputName":
        return <InputName setGameState={setGameState}
          onSubmit={handleNameSubmit}
          onGenerated={(data) => { setCharacterData(data) }} />;

      case "generating":
        return <Generating sharedValue={sharedValue} />;

      case "CharacterSheet":
        return <MyCharacterSheet
          data={characterData}
          setStoryStep={setStoryStep}
        />

      case "story":
        return <Story story={storyData}
          setStoryStep={setStoryStep}
          nowStory={storyStep}
          setStoryData={setStoryData}
          setGameState={setGameState}
        />

      case "result":
        return <Result setGameState={setGameState} story={storyData} data={characterData} />

      case "record":
        return <Record
          setGameState={setGameState}
        />



      default: return <StartScreen setGameState={setGameState} />;
    }
  }

  return (
    <div className='container' id='container'>
      {/* <Header></Header> */}
      {renderScreen()}
      {/* <Footer></Footer> */}
    </div>
  )
}

export default App;