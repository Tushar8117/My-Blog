import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-500',
    textColor = 'text-white',
    classname = '',
    ...props
}) {
    
  return (
    <button className={`px-4 py-4 rounded-lg ${classname} ${textColor} ${bgColor} `} {...props}> {children} </button>
  )
}

export default Button