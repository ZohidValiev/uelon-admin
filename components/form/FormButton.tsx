
import { FC } from "react"

type Props = {
    value: string
}

const Button: FC<Props> = ({ value }) => {

    return (
        <button className="button form__button">
            {value}
        </button>
    )
}

export default Button