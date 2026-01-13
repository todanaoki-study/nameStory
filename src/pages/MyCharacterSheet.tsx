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

    const imgUrl = [
        "./src/assets/user/buffalo.png",
        "./src/assets/user/cow.png",
        "./src/assets/user/crocodile.png",
        "./src/assets/user/flamingo.png",
        "./src/assets/user/fox.png",
        "./src/assets/user/hedgehog.png",
        "./src/assets/user/horse.png",
        "./src/assets/user/pig.png",
        "./src/assets/user/rabbit.png",
        "./src/assets/user/sheep.png",
    ]

    const wordNum = Math.floor(Math.random() * wordList.length);
    const imgNum = Math.floor(Math.random() * imgUrl.length);

    return (
        <div className="myCharacterSheet">

            <p className="myCharacterSheet__report">「{data.name}」が誕生しました！</p>
            <p className="myCharacterSheet__uniqueWord">{wordList[wordNum]}</p>

            <div className="myCharacterSheet__container">
                <div className="myCharacterSheet__basicInfo">
                    <img className="myCharacterSheet__img" src={imgUrl[imgNum]} alt="" />
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
                <Btn className='myCharacterSheet__btn' onClick={() => setStoryStep("introduction")}>ストーリーを開始する</Btn>
            </div>
        </div >
    );
};

export default MyCharacterSheet;