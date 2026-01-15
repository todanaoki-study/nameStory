import { useState, useEffect } from 'react';
//api通信中に表示するページ。
interface GeneratingProps {
    sharedValue: string;
}

const uniqueWord = [
    "考え中...",
    "AI生成だから期待しないでね...",
    "こんなゲームやるとか暇なんかお前",
    "あなたはこういう人だから...続きは...う〜ん...",
    "俺は今仕事してんだよ！黙って待っとけ！",
]

//通信中の画面
function Generating({ sharedValue }: GeneratingProps) {

    const [message, setMessage] = useState(uniqueWord[0]);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            // 一旦フェードアウトさせる（アニメーション用）
            setIsVisible(false);

            setTimeout(() => {
                // ランダムに次のメッセージを選択
                const nextIndex = Math.floor(Math.random() * uniqueWord.length);
                setMessage(uniqueWord[nextIndex]);
                setIsVisible(true);
            }, 300); // 0.3秒後にメッセージを切り替えて再表示

        }, 7000); // 7秒おきに実行

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="generating">
            <div className="generating__inner">
                <h2 className="generating__title">生成中</h2>
                <p className='generating__overview'>{sharedValue}</p>
                <img className='generating__img' src="./src/assets/item/mascotAnimation.gif" alt="" />
                <div className={`startScreen__message ${isVisible ? 'is-visible' : ''}`}>
                    {message}
                </div>

            </div>
        </div>
    )
}

export default Generating;