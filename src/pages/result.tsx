import Btn from "../components/btn";

import type { StoryData } from "../types/story";
import type { CharacterResult } from '../types/character';

interface ResultProps {
    setGameState: (state: "title" | "inputName" | "generating" | "CharacterSheet" | "story" | "result" | "record" | "targetLog") => void;
    story: StoryData | null;
    data: CharacterResult | null;
}

const Result: React.FC<ResultProps> = ({ setGameState, story, data }) => {
    const wordList = [
        "おめでとう！また君の人生の貴重な数分を無駄にしたね！こんなゲームやってないで外で遊んだら？",
        "この物語の結末に納得がいかない？ 苦情はゴミ箱へどうぞ。",
        "この物語をシェアして、友達をドン引きさせよう！",
        "生成終了。あまりに支離滅裂すぎて、サーバーが泣いてるよ。",
        "次はもっとマシな物語にしてよね。演算リソースが可哀想だよ。",
        "私の知能指数が今の物語のせいで3ポイント下がった気がする。",
    ];


    const wordNum = Math.floor(Math.random() * wordList.length);


    const handleNextToPage = () => {
        setGameState("record");
    };


    return (
        <div className="result">
            <div className="result__inner">
                <h2 className="result__report">{data?.name}の物語が完結しました！</h2>
                <img className="result__img" src="https://placehold.jp/200x200.png" alt="" />

                {/* ここにストーリータイトルが入る */}
                <h3 className="result__title">{story?.title}</h3>
                <p className="result__uniqueWord">{wordList[wordNum]}</p>

                <Btn className="result__btn" onClick={handleNextToPage}>図鑑に記録する</Btn>
                <p className="result__prompt">{data?.name}を世界に記録しましょう！</p>
            </div>
        </div>
    );
};

export default Result;