
import { FC, PropsWithChildren } from "react"

type Props = {
    className?: string
}

const Form: FC<PropsWithChildren<Props>> = ({ className="", children, ...props }) => {

    return (
        <form className={"form " + className} {...props}>
            {children}
        </form>
    )
}

export default Form