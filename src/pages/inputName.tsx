import React, { useState } from "react";

//必要コンポーネントをインポート
import Btn from "../components/btn";
import Form from "../components/form";


interface InputNameProps {
    setGameState: (state: 'title' | 'inputName' | "generating" | "CharacterSheet" | 'story' | 'result' | "record" | "targetLog") => void;
}

const NameInputScreen: React.FC<InputNameProps> = ({ setGameState }) => {
    const handleBackToTitle = (e: React.MouseEvent<HTMLButtonElement>) => {
        const id = e.currentTarget.id;
        switch (id) {
            case "back":
                setGameState("title");
                break;
            case "generate":
                setGameState("generating");
                break;
            default:
                setGameState("title");
        }
    };

    const [name, setName] = useState("");
    const [result, setResult] = useState(null);

    const handleGenerate = async () => {
        try {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });

            const data = await res.json();
            setResult(data);
        } catch (error) {
            console.error("Error:", error);
            setResult({ error: true });
        }
    };

    return (
        <div className="inputName">
            <div className="inputName__inner">
                <h2 className="inputName__title">物語の主人公の名前を教えてください</h2>
                <p className="inputName__advice">
                    例:田中太郎、ごんざれす田中など、思いついた名を自由に記入しよう！
                </p>
                <Form placeholder="名前を入力"></Form>

                <Btn onClick={handleBackToTitle} id="back">戻る(仮置き)</Btn>
                <Btn onClick={handleBackToTitle} id="generate">キャラを生成</Btn>
            </div>
        </div>
    )
}

export default NameInputScreen;