import { useState } from 'react'
import './scss/style.min.css'

//必要ページのインポート
import Name from './js/index.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h2>環境チェック</h2>

      <Name></Name>
    </div>
  )
}

export default App
