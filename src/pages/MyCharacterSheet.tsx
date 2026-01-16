// import React, { useState, useEffect } from 'react';
import Btn from "../components/btn";
import Personality from "../components/personality";

import type { CharacterResult } from '../types/character';

import user1 from "../assets/user/buffalo.png";
import user2 from "../assets/user/cow.png";
import user3 from "../assets/user/crocodile.png";
import user4 from "../assets/user/flamingo.png";
import user5 from "../assets/user/fox.png";
import user6 from "../assets/user/hedgehog.png";
import user7 from "../assets/user/horse.png";
import user8 from "../assets/user/pig.png";
import user9 from "../assets/user/rabbit.png";
import user10 from "../assets/user/sheep.png";

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
        user1,
        user2,
        user3,
        user4,
        user5,
        user6,
        user7,
        user8,
        user9,
        user10,
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
                <p className="myCharacterSheet__caption">ボタンを押すと起承転結の4構成でストーリーが作られます</p>
                <Btn className='myCharacterSheet__btn' onClick={() => setStoryStep("introduction")}>ストーリーを開始する</Btn>
            </div>
        </div >
    );
};

export default MyCharacterSheet;