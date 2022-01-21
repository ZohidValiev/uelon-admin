
import React from "react"
import IconAction from "./IconAction"
import styles from "@/styles/ViewGrid.module.css"

function UserViewItem({ title, value, onClick }) {

    return (
        <>
            <div className={styles.viewGrid__name}>
                { title }
            </div>
            <div className={styles.viewGrid__value}>
                { value }
                { onClick && <IconAction onClick={onClick} /> }
            </div>
        </>
    )
}

export default React.memo(UserViewItem)