import React from 'react';

interface StoryBoxProps {
    currentText: string;
    isTyping?: boolean;
    className?: string;
    onClick?: () => void;
}

//todo-isTyping=falseが入っていた
const StoryBox: React.FC<StoryBoxProps> = ({ currentText, className = '', onClick }) => {

    const baseClass = "storyBox";
    const combinedClassName = `${baseClass} ${className}`;

    return (
        <div className={combinedClassName} onClick={onClick}>
            <p className="storyBox__text">
                {currentText}
            </p>

            {/* テキストが流れている最中に表示するカーソル表現 */}
            {/* {isTyping && (
                <span className="typing-cursor absolute bottom-6 right-6 animate-pulse text-2xl text-amber-800">
                    ▼
                </span>
            )} */}
        </div>
    );
};

export default StoryBox;