
import { FC } from "react"

interface Props {
    size: 24 | 32 | 48 | 64
    className?: string
}

const Loader: FC<Props> = ({ size, className="" }) => {

    const classes = [
        `dash-spinner-${size}x${size}`,
        className,
    ]

    return (
        <i className={classes.join(" ")}/>
    )
}

export default Loader