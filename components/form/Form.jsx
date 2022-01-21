
function Form({ className, children, ...props }) {

    className ??= ""

    return (
        <form className={"form " + className} {...props}>
            {children}
        </form>
    )
}

export default Form