// import React from 'react';

interface FormProps {
    type?: "password" | "email" | "number" | "text";
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
}

function Form({ type = "text", placeholder = "", value = "", onChange }: FormProps) {
    return (
        <label className='form' htmlFor="">
            <input type={type} id="formText" placeholder={placeholder}
                value={value} onChange={(e) => onChange && onChange(e.target.value)} />
        </label>
    )
}

export default Form;