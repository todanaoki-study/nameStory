//api通信中に表示するページ。

import Btn from "../components/btn";

interface GeneratingProps {
    setGameState: (state: 'title' | 'inputName' | "generating" | "CharacterSheet" | 'story' | 'result' | "record" | "targetLog") => void;
}

//通信中の画面
function Generating({ setGameState }: GeneratingProps) {
    const goToTarget = () => {
        setGameState("CharacterSheet");
    };
    return (
        <div className="generating">
            <div className="generating__inner">
                <h2 className="generating__title">生成中</h2>
                <Btn onClick={goToTarget}>生成完了へ（仮）</Btn>
            </div>
        </div>
    )
}

export default Generating;