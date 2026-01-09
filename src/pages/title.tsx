// export default Name;
import React from "react";
import Btn from "../components/btn";


interface StartScreenProps {
    setGameState: (state: 'title' | 'inputName' | "generating" | "CharacterSheet" | 'story' | 'result' | "record" | "targetLog") => void;
}


const StartScreen: React.FC<StartScreenProps> = ({ setGameState }) => {

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
                <h2 className="startScreen__title">
                    <img src="./src/assets/logo/logo.png" alt="ロゴ画像。ネムストというゲーム名の背景に魔導書や歯車、巻物が置いてある。" />
                </h2>

                <Btn onClick={handleStart} className="startScreen__startBtn" id="startBtn">スタート</Btn>

                {/* <div className="startScreen__btnContainer">
                    <Btn onClick={handleStart} id="recordBtn">図鑑</Btn>
                    <Btn>設定</Btn>
                </div> */}
            </div>
        </section >
    );
};

export default StartScreen;