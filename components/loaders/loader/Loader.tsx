
import { FC } from "react"

interface Props {
    size: 24 | 32 | 48 | 64
}

const Loader: FC<Props> = ({ size }) => {

    return (
        <i className={`dash-spinner-${size}x${size}`}/>
    )
}

export default Loader