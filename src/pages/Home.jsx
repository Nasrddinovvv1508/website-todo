import { Link } from "react-router-dom";
import { useCollection } from "../hooks/useCollection"
import { FaTrashAlt } from "react-icons/fa";

function Home() {
  let { data } = useCollection("todos")
  console.log(data);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-[650px] w-full -mt-[100px] bg-white shadow-2xl">
        <ul className="w-10/12 my-[20px] flex flex-col gap-5 mx-auto py-[70px] px-[50px]">
          {data && !data.length > 0 ? `Loading...` : data.map((obj) => {
            return (
              <li key={obj.id} className="todo-list text-[#9ca3c3] py-3 flex items-center justify-between px-3">
                <div>
                  <label className="flex gap-3 items-center">
                    <input type="radio" name="radio-2" className="radio w-4 h-4 checked:bg-[#af7eeb]" />
                    <p style={{letterSpacing: `1px`}} className="text-3xl font-semibold -mt-1 block"> {obj.title} </p>
                  </label>
                </div>
                <div className="todo-trash mr-2">
                  <FaTrashAlt className="cursor-pointer" size={30}/>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Home