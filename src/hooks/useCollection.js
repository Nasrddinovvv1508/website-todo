import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";

import { db } from '../firebase/firebaseConfig'

export let useCollection = (collectionName) => {
    let [data, setData] = useState([]);

    useEffect(() => {
        let getData = async () => {
            let querySnapshot = await getDocs(collection(db, collectionName))

            let data = [];
            querySnapshot.docs.forEach((doc) => {
                setData(prevData => [...prevData, { id: doc.id, ...doc.data() }]);
            })

            // setData(data);
        }

        getData();
    }, [collectionName])

    return { data }
}