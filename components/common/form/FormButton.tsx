
import { FC, ButtonHTMLAttributes } from "react"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
}

const Button: FC<Props> = ({ value, children, ...props }) => {

    return (
        <button className="button form__button" {...props} >{value}</button>
    )
}

export default Button