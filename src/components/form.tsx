interface FormProps {
    placeholder?: string;
    class?: string;
}

function Form(props: FormProps) {
    const placeholder = props.placeholder;

    const baseClass = "form";
    const combinedClass = `${baseClass} `
    return (
        <label className="form" htmlFor="">
            <input className="form__content" type="text" placeholder={placeholder} />
        </label>
    );
}

export default Form;