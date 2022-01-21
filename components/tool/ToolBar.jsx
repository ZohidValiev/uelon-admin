
import styles from "@/styles/Tool.module.css"

function ToolBar({ children, ...props }) {
    return (
        <div className={styles.toolbar} {...props}>
            {children}
        </div>
    )
}

export default ToolBar