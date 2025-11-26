interface FormProps {
    class?: string;
    placeholder?: string;
    children?: React.ReactNode;
}

function Form({ className = "", children, placeholder, ...rest }: FormProps & React.ComponentPropsWithoutRef<'label'>) {

    const baseClass = "form";
    let combinedClass = `${baseClass}`
    if (className != "") {
        combinedClass = `${baseClass} ${className} `
    }
    return (
        <label className={combinedClass} {...rest}>
            <input type="text" id="formText" placeholder={placeholder} />
        </label>
    );
}

export default Form;