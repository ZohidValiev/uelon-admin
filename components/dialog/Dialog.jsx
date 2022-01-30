
import { Loader } from "@/components/loaders/loader"
import styles from "@/styles/Dialog.module.css"

function Dialog({ title, type="", children, loading=false, buttons = [] }) {

    const dialogClass = getDialogTypeClass(type)
    const dialogTitleClass = getDialogTitleTypeClass(type)
    const dialogButtonsClass = getDialogButtonsTypeClass(type)
    const dialogButtonClass = getDialogButtonTypeClass(type)

    const classesTitle = [
        styles.dialog__title, 
        dialogTitleClass,
    ]

    return (
        <div className={styles.dialogOverlay}>
            <div className={styles.dialog + ` ${dialogClass}`}>
                { title && (
                    <div className={classesTitle.join(" ")}>
                        {title}
                        { loading && <Loader /> }
                    </div>
                )}
                <div className={styles.dialog__body}>
                    <div className={styles.dialog__content}>
                        {children}
                    </div>
                    { buttons.length > 0 && 
                        <div className={styles.dialog__buttons + ` ${dialogButtonsClass}`}>
                            { buttons.map(({ value, className="", ...props }, ix) => {
                                return (
                                    <button key={ix} 
                                            className={`button ${styles.dialog__button} ${dialogButtonClass} ${className}`} 
                                            {...props}>
                                        {value}
                                    </button>
                                )
                            }) }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Dialog

function getDialogTypeClass(type) {
    switch (type) {
        case "error":
            return styles.dialog_error
        default:
            return ""
    }
}

function getDialogTitleTypeClass(type) {
    switch (type) {
        case "error":
            return styles.dialog__title_error
        default:
            return ""
    }
}
function getDialogButtonsTypeClass(type) {
    switch (type) {
        case "error":
            return styles.dialog__buttons_error
        default:
            return ""
    }
}
function getDialogButtonTypeClass(type) {
    switch (type) {
        case "error":
            return styles.dialog__button_error
        default:
            return ""
    }
}

