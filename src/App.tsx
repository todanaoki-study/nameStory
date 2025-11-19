import React, { useState, useEffect } from 'react'; //useEffectの定義
import './scss/style.min.css'

//必要ページのインポート
import StartScreen from './pages/title.tsx'
import InputName from './pages/inputName.tsx'

//必要コンポーネントのインポート
import Btn from './components/btn.tsx'
import Header from './components/header.tsx'
import Footer from './components/footer.tsx'


const App: React.FC = () => {
  const [gameState, setGameState] = useState<"title" | "inputName" | "story" | "ending">("title");

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
      default:
        return <StartScreen setGameState={setGameState} />;
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