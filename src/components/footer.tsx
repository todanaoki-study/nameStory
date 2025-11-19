interface FooterProps {
    page?: string;
}

function Footer(props: FooterProps) {
    const page = props.page;

    //プレイ画面を邪魔したくないFooterスタイル
    if (page) {
        return (
            <footer className="footer"></footer>
        );
    }

    return (
        <footer className="footer">
            <div className="footer__inner">
                <img src="https://placehold.jp/20x20.png" alt="" />
                <img src="https://placehold.jp/20x20.png" alt="" />
            </div>
        </footer>
    )

}

export default Footer;