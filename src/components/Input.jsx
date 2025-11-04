import React, { useId } from 'react'

const Input = ({
    type = "text",
    placeholder = "",
    className = "",
    label,
    labelClass="",
    parentClass="",
    ...props
}, ref) => {

    const id = useId()
    return (
        <div className={`${parentClass}`}>
            {
                label && <label
                    className={`inline-block  mb-1 ${labelClass}`}
                    htmlFor={id}>
                    {label}
                </label>
            }
            <input className={`${className}`}
                type={type}
                placeholder={placeholder}
                ref={ref}
                {...props}
                id={id}

            />

        </div>
    )
}

export default Input