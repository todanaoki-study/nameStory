import React, { useState } from "react";

//必要コンポーネントをインポート
import Btn from "../components/btn";
import Form from "../components/form";


interface InputNameProps {
    setGameState: (state: 'title' | 'inputName' | "generating" | "CharacterSheet" | 'story' | 'result' | "record" | "targetLog") => void;
}

interface CharacterResult {
    health: number;
    attack: number;
    defense: number;
    personality: string;
    abilities: string;
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
    const [result, setResult] = useState<CharacterResult | null>(null);

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

                <input
                    type="text"
                    placeholder="テスト名前を入力"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <Btn onClick={handleBackToTitle} id="back">戻る(仮置き)</Btn>
                <Btn onClick={handleGenerate} id="generate">キャラを生成</Btn>

                {result && (
                    <div>
                        <h2>{name}</h2>
                        <p>体力: {result.health}</p>
                        <p>攻撃力: {result.attack}</p>
                        <p>防御力: {result.defense}</p>
                        <p>性格: {result.personality}</p>
                        <p>能力: {result.abilities}</p>
                    </div>
                )}

            </div>
        </div >
    )
}

export default NameInputScreen;