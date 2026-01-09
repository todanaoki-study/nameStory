import Btn from "../components/btn";

import type { StoryData } from '../types/story';

interface StoryProps {
    story: StoryData | null;
    setStoryStep: (state: "development" | "twist" | "conclusion") => void;
    nowStory: "introduction" | "development" | "twist" | "conclusion" | "title" | null;
}

const Story: React.FC<StoryProps> = ({ story, setStoryStep, nowStory }) => {
    if (!story) {
        console.log("ストーリー情報が渡っていません");
        return;
    }

    //今どのステップかを親に知らせる
    const handleStoryStep = () => {
        if (nowStory == "introduction") {
            setStoryStep("development");
        }
        else if (nowStory == "development") {
            setStoryStep("twist");
        }
        else if (nowStory == "twist") {
            setStoryStep("conclusion");
        }
        else if (nowStory == "conclusion") {
            // setStoryStep("title");
        }
    }

    //表示するテキスト
    const renderStoryText = () => {
        switch (nowStory) {
            case "introduction":
                return story.introduction;
            case "development":
                return story.development;
            case "twist":
                return story.twist;
            case "conclusion":
                return story.conclusion;
            default:
                return "ストーリーを生成中です…";
        }
    };

    return (
        <div className="story">
            <div className="story__inner">
                <img className="story__img" src="https://placehold.jp/200x200.png" alt="" />

                <p>{renderStoryText()}</p>
                <Btn className="story__btn" onClick={() => handleStoryStep()}>次へ</Btn>
            </div>
        </div>
    );
};

export default Story;