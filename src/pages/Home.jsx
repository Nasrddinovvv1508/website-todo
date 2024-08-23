// rrd
import { Form, Link, useActionData } from "react-router-dom";

// hooks
import { useCollection } from "../hooks/useCollection"
import { useFirestore } from "../hooks/useFirestore";

// redux
import { useSelector } from "react-redux";

// components
import FormInput from '../components/FormInput'

// react
import { useEffect, useRef, useState } from "react";

// toast
import toast from "react-hot-toast";

// icons
import { FaPlus } from "react-icons/fa";
import TodoList from "../components/TodoList";

export let action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get(`title`);

  return { title }
}

function Home() {
  let { addNewDoc } = useFirestore()

  // data
  let { user } = useSelector((state) => state.user)
  let { data } = useCollection("todos", ['uid', `==`, user.uid], ['createdAt']);
  let userData = useActionData();

  // hooks
  let [error, setError] = useState(true);

  let hidden = useRef()
  let inputRef = useRef();

  useEffect(() => {
    if (userData) {
      if (!userData.title.trim()) {
        setError(false);
        toast.error(`Invalid value`)
      } else {
        let newDoc = ({ ...userData, uid: user.uid, });

        addNewDoc(newDoc);
        setError(true);
        inputRef.current.value = ``;
      }
    }
  }, [userData])

  //  functions

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-[650px] w-full -mt-[100px] bg-white shadow-2xl">
          <ul className="w-10/12 my-[20px] flex flex-col gap-5 mx-auto py-[70px] px-[40px]">
            {data && <TodoList data={data} />}
            <div className="flex justify-center">
              <button onClick={() => {
                hidden.current.classList.remove(`hidden`);
              }} className="btn btn-lg rounded-full px-10 text-2xl font-bold flex items-center gap-2 text-white bg-[#af7eeb] hover:bg-[#984ef2]">
                <FaPlus />
                New task
              </button>
            </div>
          </ul>
        </div>
      </div>

      <div onClick={(e) => {
        e.target.nodeName == `DIV` ? hidden.current.classList.add(`hidden`) : hidden.current.classList.add(` `)
      }} ref={hidden} className="overlay hidden w-screen h-screen absolute top-0 left-0 flex justify-center items-center">
        <Form onSubmit={() => {
          hidden.current.classList.add(`hidden`)
        }} method="post" className="flex justify-center items-center rounded-xl w-[500px] bg-white h-[250px]">
          <div className="flex items-end gap-3">
            <div className="w-[320px]">
              <FormInput inputRef={inputRef} name={`title`} type={`text`} />
            </div>
            <div>
              <button className="btn btn-accent text-white text-lg px-6">Add</button>
            </div>
          </div>
        </Form>
      </div>
    </>
  )

}

export default Home