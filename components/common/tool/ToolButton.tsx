
import { memo, FC, HTMLAttributes } from "react"
import { Icon } from "@/components/common/icon"
import styles from "@/styles/Tool.module.css"


interface Props extends HTMLAttributes<HTMLButtonElement> {
    icon: string
}

const ToolButton: FC<Props> = ({ children, icon, ...props }) => {
    return (
        <button className={styles.toolButton} {...props}>
            <Icon 
                title="Добавить нового пользователя"
                className={styles.toolButton__icon}
                icon={icon}
            />
            {children}
        </button>
    )
}

export default memo(ToolButton)