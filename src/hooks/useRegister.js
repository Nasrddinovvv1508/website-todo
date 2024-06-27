import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

import { login } from "../app/userSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useState } from "react";

let useRegister = () => {
    let dispatch = useDispatch();
    let [isPending, setIsPending] = useState(false);


    let registerWithEmail = async (email, password, displayName, photoURL) => {
        setIsPending(true);
        try {
            let userCredential = await createUserWithEmailAndPassword(auth, email, password)

            await updateProfile(auth.currentUser, {
                displayName,
                photoURL,
            })

            const user = userCredential.user;
            dispatch(login(user))
            toast.success(`Wellcome`);
            setIsPending(false);
        } catch (error) {
            const errorMessage = error.message;
            toast.error(errorMessage)
            setIsPending(false);
        }
    }

    return { registerWithEmail, isPending }
}

export { useRegister }