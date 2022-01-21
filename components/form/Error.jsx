

function Error({ message, horizontal = false }) {

    return (
        <div className={`invalid ${horizontal ? "invalid_horizontal" : ""}`}>
            {message}
        </div>
    )
}

export default Error