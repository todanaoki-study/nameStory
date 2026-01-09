//api通信中に表示するページ。

interface GeneratingProps {
    sharedValue: string;
}


//通信中の画面
function Generating({ sharedValue }: GeneratingProps) {

    return (
        <div className="generating">
            <div className="generating__inner">
                <h2 className="generating__title">生成中</h2>
                <p className='generating__overview'>{sharedValue}</p>
                <img className='generating__img' src="./src/assets/item/openAnimation.gif" alt="" />
            </div>
        </div>
    )
}

export default Generating;