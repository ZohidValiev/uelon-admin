
import { FC, FormEvent } from "react"

type Props = {
    className?: string
    onSubmit: (e: FormEvent) => void
    [key: string]: any
}

const Form: FC<Props> = ({ className="", children, ...props }) => {

    return (
        <form className={"form " + className} {...props}>
            {children}
        </form>
    )
}

export default Form