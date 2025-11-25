import React from 'react';

interface PersonalityProps {
    currentText: string;
    isTyping?: boolean;
    className?: string;
    onClick?: () => void;
}

//todo-isTyping=falseが入っていた
const Personality: React.FC<PersonalityProps> = ({ currentText, className = '', onClick }) => {

    const baseClass = "personality";
    const combinedClassName = `${baseClass} ${className}`;

    return (
        <div className={combinedClassName} onClick={onClick}>

            <dl className='personality__content'>
                <dt className='personality__title'>性格 :</dt>
                <dd className='personality__text'>{currentText}</dd>
            </dl>

            <dl className='personality__content'>
                <dt className='personality__title'>特徴 :</dt>
                <dd className='personality__text'>{currentText}</dd>
            </dl>

            {/* テキストが流れている最中に表示するカーソル表現 */}
            {/* {isTyping && (
                <span className="typing-cursor absolute bottom-6 right-6 animate-pulse text-2xl text-amber-800">
                    ▼
                </span>
            )} */}
        </div>
    );
};

export default Personality;