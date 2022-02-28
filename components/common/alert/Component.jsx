
import styles from "@/styles/Alert.module.css"

function Component({ type, children, onClose }) {

    const typeBgClass = getBgClass(type)
    
    return (
        <div className={`${styles.alert} ${typeBgClass}`}>
            {children}
            <svg className={styles.alert__icon} onClick={onClose}>
                <title>Закрыть</title>
                <use href="/images/icons.svg#xCircle"></use>
            </svg> 
        </div>
    )
}

export default Component

function getBgClass(type) {
    switch (type) {
        case "success":
            return styles["alert_bg-success"]
        case "error":
            return styles["alert_bg-error"]
        case "default":
            return styles["alert_bg-default"]
        default:
            return styles["alert_bg-default"]
    }
}
