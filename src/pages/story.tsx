import React, { useState } from 'react';
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
    setStoryStep: (state: "development" | "twist" | "conclusion" | "title") => void;
    nowStory: "introduction" | "development" | "twist" | "conclusion" | "title" | null;
    setStoryData: React.Dispatch<React.SetStateAction<StoryData | null>>;
    setGameState: (state: 'title' | 'inputName' | "generating" | "CharacterSheet" | 'story' | 'result' | "record" | "targetLog") => void;
}

const Story: React.FC<StoryProps> = ({ story, setStoryStep, nowStory, setStoryData, setGameState }) => {
    if (!story) {
        console.log("ストーリー情報が渡っていません");
        return;
    }

    const [userInput, setUserInput] = useState("");

    //今どのステップかを親に知らせる
    const handleStoryStep = () => {
        if (nowStory == "introduction") {
            setStoryStep("development");
        }
        else if (nowStory == "development") {
            setStoryData((prev) => ({
                ...prev,
                answer: userInput
            }));
            setStoryStep("twist");
        }
        else if (nowStory == "twist") {
            setStoryStep("conclusion");
        }
        else if (nowStory == "conclusion") {
            setGameState("title");
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
                return "生成中です…";
        }
    };

    return (
        <div className="story">
            <div className="story__inner">
                <img className="story__img" src="./src/assets/logo/mascot.png" alt="" />

                <div className="story__content">
                    <p>{renderStoryText()}</p>
                </div>

                {/* 分岐が発生したら、フォームを生成 */}
                {nowStory === 'development' && (
                    <form className="story__form">
                        {/* <label className="story__label">ここに入力！</label> */}
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            className="story__input"
                            placeholder="ここにあなたの考えや選択を書こう！"
                        />
                    </form>
                )}

                <Btn className="story__btn" onClick={() => handleStoryStep()}>次へ</Btn>
            </div>
        </div>
    );
};

export default Story;