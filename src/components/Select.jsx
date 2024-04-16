import React, { useId } from 'react'

function Select({
    options,
    label,
    classname,
    ...props

}, ref) {
    const id = useId()

    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className=''></label>}
            <Select
                {...props}
                id={id}
                ref={ref}
                classname={`px-3 py-2 rounded-lg bg-white outline-none text-black
               focus:bg-gray-50 duration-200 border border-gray-200 w-full ${classname}  `}
            > {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}


            </Select>
        </div>
    )
}

export default React.forwardRef(Select)