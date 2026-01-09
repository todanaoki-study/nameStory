import React, { useState, useEffect } from 'react';
import Btn from "../components/btn";
import Personality from "../components/personality";

import type { CharacterResult } from '../types/character';

interface MyCharacterSheetProps {
    data: CharacterResult | null;
    setStoryStep: (state: "introduction") => void;
}

const MyCharacterSheet: React.FC<MyCharacterSheetProps> = ({ data, setStoryStep }) => {

    //データがないなら、
    if (!data) {
        console.log("データが渡ってないです");
        return;
    }

    //ユニーク参加ワードの設定
    const wordList = [
        "ようこそ！今すぐ役立つものは何もないぞ！",
        "あなたが、たった今この世界に投げ込まれました。",
        "おやおや、新しい獲物の到着だ。",
        "いらっしゃい！さあ、早く何かしろ！",
        "君はクセェ！ゲロ以下の匂いがプンプンするぜッ！",
    ];

    const wordNum = Math.floor(Math.random() * wordList.length);

    return (
        <div className="myCharacterSheet">
            <div className="myCharacterSheet__inner">
                <p className="myCharacterSheet__report">{data.name}が誕生しました！</p>
                <p className="myCharacterSheet__uniqueWord">{wordList[wordNum]}</p>

                <div className="myCharacterSheet__container">
                    <div className="myCharacterSheet__basicInfo">
                        <img className="myCharacterSheet__img" src="https://placehold.jp/200x200.png" alt="" />
                        <div className="myCharacterSheet__content">
                            <dl className="myCharacterSheet__list">
                                <dt className="myCharacterSheet__tag">年齢:</dt>
                                <dd>{data.age}歳</dd>
                            </dl>
                            <dl className="myCharacterSheet__list">
                                <dt className="myCharacterSheet__tag">性別:</dt>
                                <dd>{data.gender}</dd>
                            </dl>
                            <dl className="myCharacterSheet__list">
                                <dt className="myCharacterSheet__tag">好物:</dt>
                                <dd>{data.favorite}</dd>
                            </dl>
                        </div>
                    </div>
                    <Personality personalityText={data.personality} abilitiesText={data.abilities}></Personality>
                    <Btn onClick={() => setStoryStep("introduction")}>ストーリーを開始する</Btn>
                </div>
            </div>
        </div >
    );
};

export default MyCharacterSheet;