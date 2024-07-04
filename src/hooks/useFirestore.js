import { collection, addDoc, serverTimestamp, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/firebaseConfig"
import { useState } from "react"
import toast from "react-hot-toast";

export let useFirestore = () => {
    let [isPending, setIsPending] = useState(false);

    // add
    let addNewDoc = async (doc) => {
        await addDoc(collection(db, "todos"), { ...doc, createdAt: serverTimestamp(), complated: false });
    }

    // delete 
    let deleteDocument = (id) => {
        deleteDoc(doc(db, "todos", id));
    }

    // change status
    let changeStatus = async (id, status) => {
        const selectedDoc = doc(db, "todos", id);

        await updateDoc(selectedDoc, {
            complated: !status
        })
    }

    let changeTitle = async (id, newTitle) => {
        setIsPending(true);

        const selectedDoc = doc(db, "todos", id);

        await updateDoc(selectedDoc, {
            title: newTitle
        })

        setIsPending(false);
        toast.success(`Title changed !`)
    }

    return { addNewDoc, deleteDocument, changeStatus, changeTitle, isPending }
}