interface HeaderProps {
    page?: string;
}

function Header(props: HeaderProps) {
    const page = props.page;
    //プレイ画面を邪魔したく無いHeaderスタイル
    if (page) {
        return (
            <header className="header subHeader">
                <div className="header__inner">
                    <h1 className="header__help">
                        <img src="src/assets/item/help.png" alt="" />
                    </h1>
                </div>
            </header>
        )
    }

    // 通常Headerスタイル
    return (
        <header className="header mainHeader">
            <div className="header__inner">
                <h1 className="header__help">
                    <img src="src/assets/item/help.png" alt="" />
                </h1>
            </div>
        </header>
    )
}

export default Header;