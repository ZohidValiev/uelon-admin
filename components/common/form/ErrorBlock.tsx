
import { FC } from "react"

type Props = {
    message: string
}

const ErrorBlock: FC<Props> = ({ message }) => {
    return (
        <div className="form__error-block">
            {message}
        </div>
    )
}

export default ErrorBlock