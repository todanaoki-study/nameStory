import Btn from "../components/btn";
import Personality from "../components/personality";

interface MyCharacterSheetProps {
    setGameState: (state: 'title' | 'inputName' | "generating" | "CharacterSheet" | 'story' | 'result' | "record" | "targetLog") => void;
}

const MyCharacterSheet: React.FC<MyCharacterSheetProps> = ({ setGameState }) => {
    const wordList = [
        "ようこそ！今すぐ役立つものは何もないぞ！",
        "あなたが、たった今この世界に投げ込まれました。",
        "おやおや、新しい獲物の到着だ。",
        "いらっしゃい！さあ、早く何かしろ！",
        "君はクセェ！ゲロ以下の匂いがプンプンするぜッ！",
    ];

    const wordNum = Math.floor(Math.random() * wordList.length);

    const handleNextToPage = () => {
        // const id = e.currentTarget.id;
        // switch (id) {
        //     case "back":
        //         setGameState("title");
        //         break;
        //     case "generate":
        //         setGameState("generating");
        //         break;
        //     default:
        //         setGameState("title");
        // }
        setGameState("story");
    };

    return (
        <div className="myCharacterSheet">
            <div className="myCharacterSheet__inner">
                <p className="myCharacterSheet__report">田中太郎が誕生しました！</p>
                <p className="myCharacterSheet__uniqueWord">{wordList[wordNum]}</p>

                <div className="myCharacterSheet__container">
                    <div className="myCharacterSheet__basicInfo">
                        <img className="myCharacterSheet__img" src="https://placehold.jp/200x200.png" alt="" />
                        <div className="myCharacterSheet__content">
                            <dl className="myCharacterSheet__list">
                                <dt className="myCharacterSheet__tag">年齢</dt>
                                <dd>40歳</dd>
                            </dl>
                            <dl className="myCharacterSheet__list">
                                <dt className="myCharacterSheet__tag">サンプル</dt>
                                <dd>サンプル</dd>
                            </dl>
                            <dl className="myCharacterSheet__list">
                                <dt className="myCharacterSheet__tag">サンプル</dt>
                                <dd>サンプル</dd>
                            </dl>
                            <dl className="myCharacterSheet__list">
                                <dt className="myCharacterSheet__tag">サンプル</dt>
                                <dd>サンプル</dd>
                            </dl>
                        </div>
                    </div>
                    <Personality currentText="サンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプル"></Personality>
                </div>
                <Btn onClick={handleNextToPage} className="myCharacterSheet__btn">ストーリーを開始</Btn>
            </div>
        </div>
    );
};

export default MyCharacterSheet;