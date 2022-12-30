import React from 'react'

function Button({ text, className, icon, onClick }) {
    return (
        <button data-animate="true" className={className} onClick={onClick} >
            <span>{text}</span>
            <span className={className + "-icon"}>{icon}</span>
        </button>
    )
}

export default Button