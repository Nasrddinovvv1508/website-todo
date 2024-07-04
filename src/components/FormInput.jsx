import React from 'react'

function FormInput({ type, name, placeholder, status, inputRef, placeholder2 }) {
    return (
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text capitalize text-lg">{placeholder}</span>
            </div>
            <input name={name} ref={inputRef} type={type} placeholder={placeholder2 ? placeholder2 : `Type here`} className={`input input-bordered ${status} w-full`} />
        </label>
    )
}

export default FormInput