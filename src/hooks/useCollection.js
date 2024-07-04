import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";

import { db } from '../firebase/firebaseConfig'

export let useCollection = (collectionName, whereOptions, orderOptions) => {
    let [data, setData] = useState([]);

    const q = query(collection(db, collectionName), where(...whereOptions), orderBy(...orderOptions));

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