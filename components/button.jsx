import React from 'react'

const Button = ({className, event, comment}) => {
    
    return (
        <div>
            <button className={className}
                onClick={event}>
                {comment}
            </button>
        </div>
    )
}

export default Button;


