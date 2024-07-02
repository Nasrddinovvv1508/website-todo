import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";

import { db } from '../firebase/firebaseConfig'

export let useCollection = (collectionName, whereOptions) => {
    let [data, setData] = useState([]);

    const q = query(collection(db, collectionName), where(...whereOptions));

    useEffect(() => {
        onSnapshot(q, (querySnapshot) => {
            const todos = [];
            querySnapshot.forEach((doc) => {
                todos.push({ id: doc.id, ...doc.data() });
            });
            setData(todos)
        });

    }, [collectionName])

    return { data }
}