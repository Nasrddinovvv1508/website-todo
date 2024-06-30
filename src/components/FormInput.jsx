import React from 'react'

function FormInput({ type, name, placeholder, status }) {
    return (
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text capitalize">{placeholder}</span>
            </div>
            <input name={name} type={type} placeholder="Type here" className={`input input-bordered input-${status} w-full`} />
        </label>
    )
}

export default FormInput