import React from "react";

function Name() {

    async function generateCharacter() {
        const name = document.getElementById('nameInput').value;
        if (!name) return; // 名前が空の場合は処理を停止

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = "生成中...";

        try {
            const response = await fetch('http://localhost:3000/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name })
            });

            const data = await response.json();

            // 結果をHTMLに出力
            resultDiv.innerHTML = `
                    <h2>${name}</h2>
                    <p>体力: ${data.health}</p>
                    <p>攻撃力: ${data.attack}</p>
                    <p>防御力: ${data.defense}</p>
                    <p>性格: ${data.personality}</p>
                    <p>能力: ${data.abilities}</p>

                    <a class="btn" href="./play.html">ストーリーを始める</a>
                `;

        } catch (error) {
            resultDiv.innerHTML = "エラーが発生しました。";
        }
    }

    return (

        <div>
            <h1>生物生成</h1>
            <input type="text" id="nameInput" placeholder="名前を入力"></input>
            <button onClick={generateCharacter}>生成！</button>

            <div id="result"></div>

        </div >
    );

}

export default Name;