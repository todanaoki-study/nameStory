interface HelperProps {
    state: true | false;
}

function Helper(state: HelperProps) {
    if (!state.state == true) {
        return null;
    }
    if (state.state == true) {
        return (
            <div className="helper">
                <div className="helper__inner">
                    <h2 className="helper__title">ヘルプ</h2>
                    <p className="helper__text">いろんなじょうほうを入れとく</p>
                </div>
            </div>
        )
    }
}

export default Helper;