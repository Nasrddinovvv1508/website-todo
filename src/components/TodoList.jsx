// icons
import { FaTrashAlt } from 'react-icons/fa'
import { MdOutlineEdit } from "react-icons/md";

// hooks
import { useFirestore } from '../hooks/useFirestore'
import Modal from './Modal';
import { useState } from 'react';

function TodoList({ data }) {
  let { deleteDocument, changeStatus } = useFirestore()
  let [selectedTodo, setSelectedTodo] = useState(null)

  let showModal = (todo) => {
    setSelectedTodo(todo)
    console.log(todo);
    document.getElementById('my_modal_1').showModal()
  }

  return (
    <>
      <Modal selectedTodo={selectedTodo} />
      {!data.length > 0 ? `Loading...` : data.reverse().map((obj) => {
        return (
          <li key={obj.id} className={`todo-list text-[#9ca3c3] py-3 flex items-center justify-between px-3`}>
            <div>
              <p className="flex items-center gap-6">
                <div className="form-control">
                  <label className="label cursor-pointer flex items-center gap-5">
                    {obj.complated ?
                      <input defaultChecked onClick={() => changeStatus(obj.id, obj.complated)} type="checkbox" className="appearance-none checkbox checkbox-sm bg-[#af7eeb]" /> :
                      <input onClick={() => changeStatus(obj.id, obj.complated)} type="checkbox" className="appearance-none checkbox checkbox-sm bg-[#af7eeb]" />
                    }
                    <p style={{ letterSpacing: `1px` }} htmlFor="01" className={`${obj.complated ? `complated` : ``} no-select text-3xl font-semibold -mt-1 block`}>{obj.title} </p>
                  </label>
                </div>
              </p>
            </div>
            <div className="todo-trash gap-4">
              {!obj.complated && <MdOutlineEdit onClick={() => showModal(obj)} className='cursor-pointer text-red-400' size={30} />}
              <FaTrashAlt onClick={() => deleteDocument(obj.id)} className="cursor-pointer" size={30} />
            </div>
          </li>
        )
      })}
    </>
  )
}

export default TodoList