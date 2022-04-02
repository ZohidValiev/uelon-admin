
import { FC, HTMLProps, forwardRef } from "react"
import styles from "@/styles/HomeLink.module.css"

interface Props extends HTMLProps<HTMLAnchorElement> {}


const HomeLink: FC<Props> = forwardRef(({ children, className="", ...props }, ref) => {
    
    const _className = [
        styles.link,
        className,
    ]

    return (
        <a className={_className.join(" ")} ref={ref} {...props}>{children}</a>
    )
})

export default HomeLink