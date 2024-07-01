import { Form, Link, useActionData } from "react-router-dom";

// components
import { FormInput } from "../components";

// hooks
import { useLogin } from '../hooks/useLogin'
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export let action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get(`email`);
  let password = formData.get(`password`);

  return { email, password }
}

function Login() {
  let userData = useActionData();
  let { signInWithEmail, isPending } = useLogin();
  console.log(userData);

  let [errors, setErrors] = useState({
    email: ``,
    password: ``,
  })

  useEffect(() => {
    if (userData) {
      if (userData?.email.trim() && userData?.password.trim()) {
        signInWithEmail(userData);
      } else {
        toast.error(`Please, Enter All of Them`);
      }

      if (!userData?.email.trim()) {
        setErrors((prev) => {
          return { ...prev, email: `input-error` }
        })
      }

      if (!userData?.password.trim()) {
        setErrors((prev) => {
          return { ...prev, password: `input-error` }
        })
      }
    }
  }, [userData])

  console.log(errors);


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
          <FormInput status={errors.password} type="password" name="password" placeholder="Password" />

          {!isPending && <button className="btn btn-primary btn-wide">Login</button>}
          {isPending && <button disabled className="btn btn-primary btn-wide">Loading...</button>}

          <div>
            <span className="text-lg font-medium">Not a member?</span> <Link className="link link-primary" to='/register'>Register</Link>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login