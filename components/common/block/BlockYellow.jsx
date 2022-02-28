
export default function ({ children, ...props })
{
    let style = props?.style ?? {}

    return (
        <div className="block block_yellow" style={style}>
            {children}
        </div>
    )
}