import { Form, Link, useActionData } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

// components
import { FormInput } from "../components";

// icons
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

// hooks
import { useLogin } from '../hooks/useLogin'
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// functions
export let action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get(`email`);
  let password = formData.get(`password`);

  return { email, password }
}


function Login() {
  let [forgotPassword, setForgotPassword] = useState(true)
  let [type, setType] = useState(false)


  let handleChangeType = () => {
    setType(!type)
  }

  let userData = useActionData();
  let { signInWithEmail, isPending } = useLogin();
  console.log(userData);

  let [errors, setErrors] = useState({
    email: ``,
    password: ``,
  })

  useEffect(() => {
    if (userData) {
      if (userData.email.trim() && userData.password?.trim()) {
        signInWithEmail(userData);
      } else {
        toast.error(`Please, Enter All of Them`);
      }

      if (!userData.email.trim()) {
        setErrors((prev) => {
          return { ...prev, email: `input-error` }
        })
      }

      if (!userData.password?.trim()) {
        setErrors((prev) => {
          return { ...prev, password: `input-error` }
        })
      }
    }

    if (!forgotPassword && userData) {
      sendPasswordResetEmail(auth, userData.email.trim())
        .then(() => {
          toast.success(`Link Sended`);
          setForgotPassword(!forgotPassword)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage)
          console.log(errorCode);
        });
    }
  }, [userData])

  return (
    <div className="w-screen h-screen bg-[#6763e7]">
      <div className="grid place-items-center min-h-screen">
        <Form method="post" className="flex flex-col items-center gap-5 card bg-base-100 w-[400px] shadow-xl p-5">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-4xl font-bold">Welcome back!</h1>
            <p className="text-xl opacity-70">
              Log in to access your account.
            </p>
          </div>
          <FormInput status={errors.email} type="email" name="email" placeholder="Email" />
          {forgotPassword && <div className="w-full flex items-end gap-2">
            <FormInput status={errors.password} type={type ? `text` : `password`} name="password" placeholder="Password" />
            <button type="button" onClick={handleChangeType} className="btn btn-secondary">
              {type ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </button>
          </div>}

          {!isPending && <button className="btn btn-primary btn-wide">{
            forgotPassword ? `Login` : `Send Link`
          }</button>}
          {isPending && <button disabled className="btn btn-primary btn-wide">Loading...</button>}

          <div className="text-center">
            <button onClick={() => {
              setForgotPassword(!forgotPassword)
            }} className="btn-link decoration-0">Forgot password ?</button>
          </div>

          <div>
            <span className="text-lg font-medium">Not a member?</span> <Link className="link link-primary" to='/register'>Register</Link>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login