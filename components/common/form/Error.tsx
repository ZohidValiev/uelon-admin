import { FC } from "react"

type Props = {
    message: string
    horizontal?: boolean
}

const Error: FC<Props> = ({ message, horizontal = false }) => {

    return (
        <div className={`invalid ${horizontal ? "invalid_horizontal" : ""}`}>
            {message}
        </div>
    )
}

export default Error