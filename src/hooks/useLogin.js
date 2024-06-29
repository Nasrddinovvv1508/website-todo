import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

import { login } from "../app/userSlice";
import toast from "react-hot-toast";
import { useState } from "react";

import { useDispatch } from "react-redux";

let useLogin = () => {
    let [isPending, setIsPending] = useState(false);

    let dispatch = useDispatch();

    let signInWithEmail = async (email, password) => {
        setIsPending(true);
        try {
            let userCredential = await signInWithEmailAndPassword(auth, email, password)

            const user = userCredential.user;
            dispatch(login(user))
            toast.success(`Wellcome back`);
            setIsPending(false);
        } catch (error) {
            const errorMessage = error.message;
            toast.error(errorMessage)
            console.log(errorMessage);
            setIsPending(false);
        }
    }

    return { signInWithEmail, isPending }
}

export { useLogin }