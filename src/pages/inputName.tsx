import React, { useState } from "react";

//必要コンポーネントをインポート
import Btn from "../components/btn";
import Form from "../components/form";

import type { CharacterResult } from "../types/character";

interface InputNameProps {
    setGameState: (state: 'title' | 'inputName' | "generating" | "CharacterSheet" | 'story' | 'result' | "record" | "targetLog") => void;
    onSubmit: (value: string) => void;
    onGenerated: (data: CharacterResult) => void;
}

const NameInputScreen: React.FC<InputNameProps> = ({ setGameState, onSubmit, onGenerated }) => {
    const [input, SetInput] = useState("");


    //キャラクターの生成を依頼
    const handleGenerating = async (inputValue: string) => {

        if (!inputValue) {
            console.log("inputValueが渡ってきていないです");
            return;
        }

        try {
            onSubmit(input);
            setGameState("generating");
            // !ローカル
            const API_URL = "http://localhost:3000/generate";
            // !本番
            // const API_URL = "/generate";

            // fetchリクエスト
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                //nameという値でsharedValueをサーバーに送信する。
                body: JSON.stringify({ name: inputValue }),
            });

            if (!res.ok) {
                const errorBody = await res.json();
                console.error("API ERROR:", res.status, errorBody);
                throw new Error(`APIリクエスト失敗: ${res.status}`);
            }

            /** @type {CharacterResult} */
            const data = await res.json();
            console.log("生成されたデータ", data);
            console.log(data.id);

            onGenerated(data);
            //全てが終わったらページを切り替え
            setGameState("CharacterSheet");

        } catch (error) {
            console.error("Error during character generation:", error);
        }
    }

    return (
        <div className="inputName">
            <div className="inputName__inner">
                <h2 className="inputName__title">物語の主人公の名前を教えてください</h2>
                <p className="inputName__advice">
                    例:田中太郎、ごんざれす田中など、思いついた名を自由に記入しよう！
                </p>

                <Form placeholder="名前を入力" type="text" value={input} onChange={SetInput}></Form>

                <Btn id="generate" onClick={() => { handleGenerating(input) }}>キャラを生成</Btn>
            </div>
        </div >
    )
}

export default NameInputScreen;