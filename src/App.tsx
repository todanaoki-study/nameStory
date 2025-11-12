// import React from 'react'
import './scss/style.min.css'

//必要ページのインポート
import Name from './js/index.tsx'

//必要コンポーネントのインポート
import Btn from './components/btn.tsx'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h2>環境チェック</h2>
      <Name></Name>
      <Btn></Btn>
    </div>
  )
}

export default App
