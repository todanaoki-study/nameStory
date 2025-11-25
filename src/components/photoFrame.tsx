import React from "react";

interface PhotoFrameProps {
    class?: string;
    children?: React.ReactNode;
}

function PhotoFrame({ className = "", children, ...rest }: PhotoFrameProps & React.ComponentPropsWithoutRef<'article'>) {

    const baseClass = "photoFrame";
    const combinedClass = `${baseClass} ${className}`;

    return (
        <article className={combinedClass} {...rest}>
            <img className="photoFrame__img" src="https://placehold.jp/150x150.png" alt="" />
            <p className="photoFrame__title">田中太郎</p>
        </article>
    );
}

export default PhotoFrame;