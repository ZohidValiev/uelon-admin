
import { FC, ButtonHTMLAttributes } from "react"
import { Loader } from "@/components/common/loaders/loader"
import styles from "@/styles/Dialog.module.css"

interface Props {
    title: string
    type?: string
    loading?: boolean
    className?: string
    contentClassName?: string
    buttons: ButtonProps[]
}

interface ButtonProps /*extends ButtonHTMLAttributes<HTMLButtonElement>*/ {
    [key: string]: any
}

const Dialog: FC<Props> = ({ 
    title, type = "", children, loading=false, className="", contentClassName="", buttons = [] 
}) => {

    const dialogClass = getDialogTypeClass(type)
    const dialogTitleClass = getDialogTitleTypeClass(type)
    const dialogButtonsClass = getDialogButtonsTypeClass(type)
    const dialogButtonClass = getDialogButtonTypeClass(type)

    const classes = [
        styles.dialog,
        dialogClass,
        className,
    ]

    const classesTitle = [
        styles.dialog__title, 
        dialogTitleClass,
    ]

    const classesContent = [
        styles.dialog__content,
        contentClassName,
    ]

    return (
        <div className={styles.dialogOverlay}>
            <div className={classes.join(" ")}>
                { title && (
                    <div className={classesTitle.join(" ")}>
                        <span className={styles.dialog__titleText}>
                            {title}
                        </span>
                        { loading && <Loader size={24}/> }
                    </div>
                )}
                <div className={styles.dialog__body}>
                    <div className={classesContent.join(" ")}>
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

function getDialogTypeClass(type: string): string {
    switch (type) {
        case "error":
            return styles.dialog_error
        default:
            return ""
    }
}

function getDialogTitleTypeClass(type: string): string {
    switch (type) {
        case "error":
            return styles.dialog__title_error
        default:
            return ""
    }
}
function getDialogButtonsTypeClass(type: string): string {
    switch (type) {
        case "error":
            return styles.dialog__buttons_error
        default:
            return ""
    }
}
function getDialogButtonTypeClass(type: string): string {
    switch (type) {
        case "error":
            return styles.dialog__button_error
        default:
            return ""
    }
}

