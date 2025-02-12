import React from 'react'

function Card({ children }) {
    return (
        <div className=' p-3 m-3 shadow-xl rounded-lg h-full'>
            {children}
        </div>
    )
}

export default Card