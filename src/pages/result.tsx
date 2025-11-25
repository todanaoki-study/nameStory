import Btn from "../components/btn";

interface ResultProps {
    setGameState: (state: "title" | "inputName" | "generating" | "CharacterSheet" | "story" | "result" | "record" | "targetLog") => void;
}

const Result: React.FC<ResultProps> = ({ setGameState }) => {
    const wordList = [
        "ユニークテキストA",
        "ユニークテキストB",
        "ユニークテキストC",
        "ユニークテキストD",
        "ユニークテキストE",
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
        setGameState("record");
    };

    return (
        <div className="result">
            <div className="result__inner">
                <h2 className="result__report">田中太郎の物語が完結しました！</h2>
                <img className="result__img" src="https://placehold.jp/200x200.png" alt="" />

                <h3 className="result__title">〇〇と太郎</h3>
                <p className="result__uniqueWord">{wordList[wordNum]}</p>

                <Btn className="result__btn" onClick={handleNextToPage}>図鑑に記録する</Btn>
                <p className="result__prompt">田中太郎を世界に記録しましょう！</p>
            </div>
        </div>
    );
};

export default Result;