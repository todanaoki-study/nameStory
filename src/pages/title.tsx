// export default Name;
import React, { useState, useEffect } from 'react';
import Btn from "../components/btn";

//画像ルート
import mascot from "../assets/item/mascotAnimation.gif";

interface StartScreenProps {
    setGameState: (state: 'title' | 'inputName' | "generating" | "CharacterSheet" | 'story' | 'result' | "record" | "targetLog") => void;
}

const uniqueWord = [
    "魔王と鍋を囲み...",
    "あなたの人生は...",
    "こんなゲームやるとか暇なんかお前",
    "あなたは〇〇な人生を送った...",
    "キャベツ農家と殴り合いをし...",
    "自転車でサーフィン！",
    "ルールは破るためにある！",
    "社用PCにウイルス突っ込んでみた！",
    "増税メガネをバットでめったうち！"
]

const StartScreen: React.FC<StartScreenProps> = ({ setGameState }) => {

    const [message, setMessage] = useState(uniqueWord[0]);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            // 一旦フェードアウトさせる（アニメーション用）
            setIsVisible(false);

            setTimeout(() => {
                // ランダムに次のメッセージを選択
                const nextIndex = Math.floor(Math.random() * uniqueWord.length);
                setMessage(uniqueWord[nextIndex]);
                setIsVisible(true);
            }, 300); // 0.3秒後にメッセージを切り替えて再表示

        }, 7000); // 7秒おきに実行

        return () => clearInterval(interval);
    }, []);

    const handleStart = (e: React.MouseEvent<HTMLButtonElement>) => {
        const id = e.currentTarget.id;
        switch (id) {
            case "startBtn":
                setGameState("inputName");
                break;
            case "recordBtn":
                setGameState("record");
                break;
            default:
                setGameState("title");
        }
    }

    return (
        <section className="startScreen">
            <div className="startScreen__inner">
                <p className="startScreen__title">変な人生を始めましょう...</p>
                <h2 className="startScreen__logo">
                    <img src={mascot} alt="ロゴ画像。ネムストというゲーム名の背景に魔導書や歯車、巻物が置いてある。" />
                </h2>

                {/* 吹き出し部分 */}
                <div className={`startScreen__message ${isVisible ? 'is-visible' : ''}`}>
                    {message}
                </div>


                <Btn onClick={handleStart} className="startScreen__startBtn" id="startBtn">スタート</Btn>
            </div>
        </section >
    );
};

export default StartScreen;