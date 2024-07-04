// rrd
import { Form, Link, useActionData } from "react-router-dom";

// hooks
import { useCollection } from "../hooks/useCollection"

// redux
import { useSelector } from "react-redux";

// components
import FormInput from '../components/FormInput'

// react
import { useEffect, useRef, useState } from "react";

// firebase
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// toast
import toast from "react-hot-toast";

// icons
import { FaPlus } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

export let action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get(`title`);

  // hidden.current.classList.add(`hidden`);

  return { title }
}

function Home() {
  // data
  let { user } = useSelector((state) => state.user)
  let { data } = useCollection("todos", ['uid', `==`, user.uid])
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
        let newDoc = ({ ...userData, uid: user.uid });
        addDoc(collection(db, "todos"), newDoc);
        setError(true);
        inputRef.current.value = ``;
      }
    }
  }, [userData])

  //  functions
  let deleteDocument = (id) => {
    deleteDoc(doc(db, "todos", id));
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-[650px] w-full -mt-[100px] bg-white shadow-2xl">
          <ul className="w-10/12 my-[20px] flex flex-col gap-5 mx-auto py-[70px] px-[50px]">
            {data && !data.length > 0 ? `Loading...` : data.map((obj) => {
              return (
                <li key={obj.id} className="todo-list text-[#9ca3c3] py-3 flex items-center justify-between px-3">
                  <div>
                    <p className="flex items-center gap-6">
                      <input type="checkbox" className="checkbox mr-2" id="01" />
                      <label style={{ letterSpacing: `1px` }} htmlFor="01" className="no-select text-3xl font-semibold -mt-1 block">{obj.title} </label>
                    </p>
                  </div>
                  <div className="todo-trash mr-2">
                    <FaTrashAlt onClick={() => deleteDocument(obj.id)} className="cursor-pointer" size={30} />
                  </div>
                </li>
              )
            })}

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






// import { Form, Link, useActionData } from "react-router-dom";
// import { useCollection } from "../hooks/useCollection";
// import { useSelector } from "react-redux";
// import FormInput from '../components/FormInput';
// import { useEffect, useRef, useState } from "react";
// import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
// import { db } from "../firebase/firebaseConfig";
// import toast from "react-hot-toast";
// import { FaPlus, FaTrashAlt } from "react-icons/fa";

// export let action = async ({ request }) => {
//   let formData = await request.formData();
//   let title = formData.get('title');

//   return { title };
// }

// function Home() {
//   let { user } = useSelector((state) => state.user);
//   let { data } = useCollection("todos", ['uid', '==', user.uid]);
//   let userData = useActionData();

//   let [error, setError] = useState(true);
//   let hidden = useRef();
//   let formData = useRef();
//   let inputRef = useRef();
//   console.log(inputRef);

//   useEffect(() => {
//     if (userData) {
//       if (!userData.title.trim()) {
//         setError(false);
//         toast.error('Invalid value');
//       } else {
//         let newDoc = { ...userData, uid: user.uid };
//         addDoc(collection(db, "todos"), newDoc);
//         setError(true);
//         inputRef.current.value = ''; // Inputni tozalash
//       }
//     }
//   }, [userData]);

//   let deleteDocument = (id) => {
//     deleteDoc(doc(db, "todos", id));
//   }

//   return (
//     <>
//       <div className="flex justify-center items-center h-screen">
//         <div className="max-w-[650px] w-full -mt-[100px] bg-white shadow-2xl">
//           <ul className="w-10/12 my-[20px] flex flex-col gap-5 mx-auto py-[70px] px-[50px]">
//             {data && !data.length > 0 ? 'Loading...' : data.map((obj) => (
//               <li key={obj.id} className="todo-list text-[#9ca3c3] py-3 flex items-center justify-between px-3">
//                 <div>
//                   <p className="flex items-center gap-6">
//                     <input type="checkbox" className="checkbox mr-2" id="01" />
//                     <label style={{ letterSpacing: '1px' }} htmlFor="01" className="no-select text-3xl font-semibold -mt-1 block">{obj.title}</label>
//                   </p>
//                 </div>
//                 <div className="todo-trash mr-2">
//                   <FaTrashAlt onClick={() => deleteDocument(obj.id)} className="cursor-pointer" size={30} />
//                 </div>
//               </li>
//             ))}

//             <div className="flex justify-center">
//               <button onClick={() => {
//                 hidden.current.classList.remove('hidden');
//               }} className="btn btn-lg rounded-full px-10 text-2xl font-bold flex items-center gap-2 text-white bg-[#af7eeb] hover:bg-[#984ef2]">
//                 <FaPlus />
//                 New task
//               </button>
//             </div>
//           </ul>
//         </div>
//       </div>

//       <div onClick={(e) => {
//         e.target.nodeName === 'DIV' ? hidden.current.classList.add('hidden') : hidden.current.classList.add(' ');
//       }} ref={hidden} className="overlay hidden w-screen h-screen absolute top-0 left-0 flex justify-center items-center">
//         <Form ref={formData} onSubmit={() => {
//           hidden.current.classList.add('hidden');
//         }} method="post" className="flex justify-center items-center rounded-xl w-[500px] bg-white h-[250px]">
//           <div className="flex items-end gap-3">
//             <div className="w-[320px]">
//               <FormInput name='title' type='text' refInput={inputRef} />
//             </div>
//             <div>
//               <button className="btn btn-accent text-white text-lg px-6">Add</button>
//             </div>
//           </div>
//         </Form>
//       </div>
//     </>
//   );
// }

// export default Home;
