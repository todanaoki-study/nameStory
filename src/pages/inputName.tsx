import React from "react";

//必要コンポーネントをインポート
import Btn from "../components/btn";
import Form from "../components/form";

interface InputNameProps {
    setGameState: (state: "title" | "inputName" | "story" | "ending") => void;
}

const NameInputScreen: React.FC<InputNameProps> = ({ setGameState }) => {
    const handleBackToTitle = () => {
        setGameState("title");
    };

    return (
        <div className="inputName">
            <div className="inputName__inner">
                <h2 className="inputName__title">物語の主人公の名前を教えてください</h2>
                <p className="inputName__advice">
                    例:田中太郎、ごんざれす田中など、思いついた名を自由に記入しよう！
                </p>
                <Form placeholder="名前を入力"></Form>
                <Btn onClick={handleBackToTitle}>戻る(仮置き)</Btn>
            </div>
        </div>
    )
}

export default NameInputScreen;