import React from 'react';

interface BtnProps {
    class?: string;
    children?: React.ReactNode;
}

function Btn({ className = "", children, ...rest }: BtnProps & React.ComponentPropsWithoutRef<'button'>) {

    const baseClass = "btn";
    const combinedClass = `${baseClass} ${className}`;

    return (
        <button className={combinedClass}{...rest}>{children}</button>
    );
}

export default Btn;