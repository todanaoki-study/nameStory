import PhotoFrame from "../components/photoFrame";
import Btn from "../components/btn";

interface RecordProps {
    setGameState: (state: "title" | "inputName" | "story" | "ending") => void;
}

const Record: React.FC<RecordProps> = ({ setGameState }) => {
    const handleBackToTitle = () => {
        setGameState("title");
    };

    return (
        <div className="record">
            <div className="record__inner">
                <div className="record__container">
                    <PhotoFrame></PhotoFrame>
                </div>
            </div>
        </div>
    )
}

export default Record;