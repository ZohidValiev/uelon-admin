
import { Icon } from "@/components/icon"
import styles from "@/styles/Tool.module.css"

function ToolButton({ children, icon, ...props }) {
    return (
        <button className={styles.toolButton} {...props}>
            <Icon 
                className={styles.toolButton__icon}
                icon={icon}
            />
            {children}
        </button>
    )
}

export default ToolButton