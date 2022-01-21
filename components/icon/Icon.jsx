
function Icon({ title, icon, className = "icon", ...props }) {
    return (
        <svg className={className} {...props}>
            <title>{title}</title>
            <use href={`/images/icons.svg#${icon}`}></use>
        </svg>
    )
}

export default Icon