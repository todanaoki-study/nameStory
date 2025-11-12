// import { useState } from "react";

// const apiKey = process.env.GEMINI_API_KEY;

// // キャラクターデータの型定義 (TypeScript環境のため)
// interface CharacterStats {
//     health: number;
//     attack: number;
//     defense: number;
//     personality: string;
//     abilities: string;
// }

// function Name() {
//     // --- 1. 状態の定義 ---
//     // 入力フォームの値
//     const [name, setName] = useState('');
//     // APIから取得した結果データ
//     const [result, setResult] = useState<CharacterStats | null>(null);
//     // ローディング中かどうかのフラグ
//     const [isLoading, setIsLoading] = useState(false);
//     // エラーメッセージ
//     const [error, setError] = useState<string | null>(null);

//     async function generateCharacter() {
//         if (!name.trim()) { // nameの状態をチェック
//             setError("名前を入力してください。");
//             return;
//         }

//         setIsLoading(true); // ローディング開始
//         setResult(null);    // 以前の結果をクリア
//         setError(null);

//         try {
//             // API呼び出し (Vercelデプロイを見越して相対パスを使用)
//             const response = await fetch('/api/generate', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ name: name })
//             });

//             if (!response.ok) {
//                 throw new Error("APIからの応答が失敗しました。");
//             }

//             const data: CharacterStats = await response.json();

//             // --- 2. 結果の表示 (状態の更新) ---
//             setResult(data);

//         } catch (err) {
//             console.error("生成エラー:", err);
//             setError("エラーが発生しました。");
//         } finally {
//             setIsLoading(false); // ローディング終了
//         }
//     }

//     // --- 3. 描画 (JSX) ---
//     return (
//         <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-4">
//             <h1 className="text-2xl font-bold text-center">生物生成</h1>

//             {/* 入力フィールド: valueとonChangeを紐づける */}
//             <input
//                 type="text"
//                 id="nameInput" // IDは残しても良いが、Reactでは主にvalueとonChangeを使う
//                 placeholder="名前を入力"
//                 value={name} // 状態(name)の値を表示
//                 onChange={(e) => setName(e.target.value)} // 入力変更時に状態(name)を更新
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 disabled={isLoading}
//             />
//             {error && <p className="text-red-500 text-sm">{error}</p>}

//             {/* ボタン */}
//             <button
//                 onClick={generateCharacter}
//                 className={`w-full py-2 rounded-md font-semibold transition duration-150 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
//                     }`}
//                 disabled={isLoading}
//             >
//                 {isLoading ? '生成中...' : '生成！'}
//             </button>

//             {/* 結果表示エリア: resultの状態に応じて表示を切り替える */}
//             {result && (
//                 <div id="result" className="mt-4 p-4 border-t border-gray-200">
//                     <h2 className="text-xl font-bold text-indigo-700">{name}</h2>
//                     <p>体力: {result.health}</p>
//                     <p>攻撃力: {result.attack}</p>
//                     <p>防御力: {result.defense}</p>
//                     <p>性格: {result.personality}</p>
//                     <p>能力: {result.abilities}</p>

//                     <a className="mt-4 inline-block bg-emerald-500 text-white py-1 px-3 rounded-md hover:bg-emerald-600" href="./play.html">ストーリーを始める</a>
//                 </div>
//             )}

//             {/* エラーメッセージがisLoading中に発生した場合の代替表示 */}
//             {!result && error && !isLoading && (
//                 <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
//                     {error}
//                 </div>
//             )}
//         </div >
//     );
// }

// export default Name;

function Name() {
    return <div>環境チェックOK</div>;
}

export default Name;