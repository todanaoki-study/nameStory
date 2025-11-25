import PhotoFrame from "../components/photoFrame";
import Btn from "../components/btn";

interface RecordProps {
    setGameState: (state: 'title' | 'inputName' | "generating" | "CharacterSheet" | 'story' | 'result' | "record" | "targetLog") => void;
}

const Record: React.FC<RecordProps> = ({ setGameState }) => {
    const handleBackToTitle = () => {
        setGameState("title");
    };

    const goToTarget = () => {
        setGameState("targetLog");
    };

    return (
        <div className="record">
            <div className="record__container">

                <div className="record__book">
                    <div className="record__inner">
                        <div className="record__list">
                            {/* firebaseにデータがある分だけ */}
                            <PhotoFrame onClick={goToTarget}></PhotoFrame>
                            <PhotoFrame></PhotoFrame>
                            <PhotoFrame></PhotoFrame>
                            <PhotoFrame></PhotoFrame>
                            <PhotoFrame></PhotoFrame>
                            <PhotoFrame></PhotoFrame>
                            <PhotoFrame></PhotoFrame>
                            <PhotoFrame></PhotoFrame>
                            <PhotoFrame></PhotoFrame>
                        </div>
                    </div>
                </div>
            </div>
            <Btn className="record__btn" onClick={handleBackToTitle}>戻る（仮）</Btn>
        </div>
    )
}

export default Record;