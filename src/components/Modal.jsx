import { useRef } from "react";
import { useFirestore } from "../hooks/useFirestore";

function Modal({ selectedTodo }) {
    let { changeTitle, isPending } = useFirestore()

    let inputRef = useRef();

    let handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputRef.current.value);
        changeTitle(selectedTodo.id, inputRef.current.value)
        document.getElementById('my_modal_1').close()
    }

    return (
        <>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4 capitalize">Do you want to change the title?</p>
                    <div className="modal-action">
                        <form onSubmit={handleSubmit} className="w-11/12 mx-auto flex flex-col gap-5 items-end" method="dialog">
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text capitalize text-lg"></span>
                                </div>
                                <input type='text' ref={inputRef} defaultValue={selectedTodo?.title} placeholder='Type here' className={`input input-bordered w-full`} />
                            </label>
                            <div className="flex gap-4">
                                {!isPending && <button type="submit" className="btn btn-secondary">Submit</button>}
                                {isPending && <button disabled className="btn btn-secondary">Loading...</button>}
                                <button type="button" onClick={() => document.getElementById('my_modal_1').close()} className="btn">Close</button>
                            </div>
                        </form>
                    </div>
                </div >
            </dialog >
        </>
    )
}

export default Modal