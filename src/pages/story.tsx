import Btn from "../components/btn";

import type { StoryData } from '../types/story';

// import playerImg1 from "../assets/user/buffalo.png";
// import playerImg2 from "../assets/user/cow.png";
// import playerImg3 from "../assets/user/crocodile.png";
// import playerImg4 from "../assets/user/flamingo.png";
// import playerImg5 from "../assets/user/fox.png";
// import playerImg6 from "../assets/user/hedgehog.png";
// import playerImg7 from "../assets/user/horse.png";
// import playerImg8 from "../assets/user/rabbit.png";
// import playerImg9 from "../assets/user/sheep.png";

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

    //画像の相対パス
    const imgUrls = [
        "../assets/user/buffalo.png",
        "../assets/user/cow.png",
        "../assets/user/crocodile.png",
        "../assets/user/flamingo.png",
        "../assets/user/fox.png",
        "../assets/user/hedgehog.png",
        "../assets/user/horse.png",
        "../assets/user/rabbit.png",
        "../assets/user/sheep.png",
    ]

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
                <img className="story__img" src="./src/assets/logo/mascot.png" alt="" />

                <div className="story__content">
                    <p>{renderStoryText()}</p>

                </div>

                <Btn className="story__btn" onClick={() => handleStoryStep()}>次へ</Btn>
            </div>
        </div>
    );
};

export default Story;