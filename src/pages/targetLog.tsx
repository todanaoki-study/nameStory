import React from 'react';
import PhotoFrame from '../components/photoFrame';
import Btn from "../components/btn";
import StoryBox from '../components/storyBox';
import Personality from '../components/personality';

interface InputNameProps {
    setGameState: (state: "title" | "inputName" | "story" | "ending") => void;
}

const TargetLog: React.FC<InputNameProps> = ({ setGameState }) => {

    const handleBackToTitle = () => {
        setGameState("title");
    };

    return (
        <div className="targetLog">
            <div className="targetLog__container">

                <div className="targetLog__book">
                    <div className="targetLog__inner">
                        <div className="targetLog__list">
                            <PhotoFrame className='targetLog__photoFrame'></PhotoFrame>

                            <h3 className='targetLog__title'>物語タイトル:「サンプル」</h3>
                            <StoryBox className='targetLog__storyBox' currentText='ストーリー文言'></StoryBox>
                            <p className='targetLog__prompt'>クリックでこの人物のストーリーを見る</p>

                            <Personality className='targetLog__personality' currentText='サンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプル'></Personality>
                        </div>
                    </div>
                </div>
            </div>
            <Btn className="targetLog__btn" onClick={handleBackToTitle}>戻る（仮）</Btn>
        </div>
    );
};

export default TargetLog;