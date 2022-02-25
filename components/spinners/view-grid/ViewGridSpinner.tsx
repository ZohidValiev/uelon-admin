
import { FC } from "react"
import { arrayRepeat } from "@/utils/functions"
import styles from "@/styles/ViewGridSpinner.module.css"


interface Props {
    rows: number
}

const ViewGridSpinner: FC<Props> = ({ rows }) => {

    const _rows = arrayRepeat<undefined>(rows, undefined);

    return (
        <div className={styles.viewGridSpinner}>
            { _rows.map((value, ix) => (
                <ViewGridSpinnerItem key={ix} />
            )) }
        </div>
    )
}

export default ViewGridSpinner

const ViewGridSpinnerItem: FC = () => {

    return (
        <>
            <div className={styles.viewGridSpinner__name}></div>
            <div className={styles.viewGridSpinner__value}></div>
        </>
    )
}