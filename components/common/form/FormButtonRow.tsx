
import { FC } from "react"


const FormButtonRow: FC = ({ children }) => {
    return (
        <div className="form__buttons">
            {children}
        </div>
    )
}

export default FormButtonRow