import StoryBox from "../components/storyBox";
import Btn from "../components/btn";

interface StoryProps {
    setGameState: (state: "title" | "inputName" | "generating" | "CharacterSheet" | "story" | "result" | "record" | "targetLog") => void;
}

const Story: React.FC<StoryProps> = ({ setGameState }) => {

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
        setGameState("result");
    };

    return (
        <div className="story">
            <div className="story__inner">
                <img className="story__img" src="https://placehold.jp/200x200.png" alt="" />
                <StoryBox currentText="サンプル物語サンプル物語サンプル物語サンプル物語サンプル物語サンプル物語サンプル物語サンプル物語サンプル物語"></StoryBox>
                <Btn className="story__btn" onClick={handleNextToPage}>次へ</Btn>
            </div>
        </div>
    );
};

export default Story;