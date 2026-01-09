import React from 'react';

interface PersonalityProps {
    personalityText: string;
    abilitiesText: string;
    isTyping?: boolean;
    className?: string;
    onClick?: () => void;
}

//todo-isTyping=falseが入っていた
const Personality: React.FC<PersonalityProps> = ({ personalityText, abilitiesText, className = '', onClick }) => {

    const baseClass = "personality";
    const combinedClassName = `${baseClass} ${className}`;

    return (
        <div className={combinedClassName} onClick={onClick}>

            <dl className='personality__content'>
                <dt className='personality__title'>性格 :</dt>
                <dd className='personality__text'>{personalityText}</dd>
            </dl>

            <dl className='personality__content'>
                <dt className='personality__title'>特徴 :</dt>
                <dd className='personality__text'>{abilitiesText}</dd>
            </dl>
        </div>
    );
};

export default Personality;