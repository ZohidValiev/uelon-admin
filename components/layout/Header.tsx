
import { FC } from "react"
import { NavbarContainer } from "@/components/common/navbar"
import styles from "@/styles/Layout.module.css"


const Header: FC = () => {

    return (
        <header className={styles.header}>
            <div className={styles.logo}>UELON</div>
            <NavbarContainer />
        </header>
    )
}

export default Header