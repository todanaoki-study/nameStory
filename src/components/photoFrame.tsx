import React from "react";

interface PhotoFrameProps {
    class?: string;
    children?: React.ReactNode;
}

function PhotoFrame({ className = "", children, ...rest }: PhotoFrameProps & React.ComponentPropsWithoutRef<'article'>) {
    return (
        <article className="photoFrame" {...rest}>
            <img src="https://placehold.jp/150x150.png" alt="" />
            <p>田中太郎</p>
        </article>
    );
}

export default PhotoFrame;