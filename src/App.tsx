import React, { useState, useEffect } from 'react'; //useEffectの定義
import './scss/style.min.css'

//必要ページのインポート
import StartScreen from './pages/title.tsx'
import InputName from './pages/inputName.tsx'
import Generating from './pages/generating.tsx';
import MyCharacterSheet from './pages/MyCharacterSheet.tsx';
import Story from "./pages/story.tsx";
import Result from "./pages/result.tsx";
import Record from './pages/record.tsx';
import TargetLog from './pages/targetLog.tsx';

//必要コンポーネントのインポート
// import Btn from './components/btn.tsx'
import Header from './components/header.tsx'
import Footer from './components/footer.tsx'


const App: React.FC = () => {
  //ゲームページ一覧
  const [gameState, setGameState] = useState<"title" | "inputName" | "generating" | "CharacterSheet" | "story" | "result" | "record" | "targetLog">("title");

  //ゲーム状態を監視する関数
  useEffect(() => {
    console.log("画面が切り替わりました。 ");
  }, [gameState])

  const renderScreen = () => {
    switch (gameState) {
      case "title":
        return <StartScreen setGameState={setGameState} />;
      case "inputName":
        return <InputName setGameState={setGameState} />;
      case "generating":
        return <Generating setGameState={setGameState} />;
      case "CharacterSheet":
        return <MyCharacterSheet setGameState={setGameState} />
      case "story":
        return <Story setGameState={setGameState} />
      case "result":
        return <Result setGameState={setGameState} />
      case "record":
        return <Record setGameState={setGameState}></Record>;
      case "targetLog":
        return <TargetLog setGameState={setGameState}></TargetLog>;
      default: return <StartScreen setGameState={setGameState} />;
    }
  }

  return (
    <div className='container' id='container'>
      <Header></Header>
      {renderScreen()}
      <Footer></Footer>
    </div>
  )
}

export default App;