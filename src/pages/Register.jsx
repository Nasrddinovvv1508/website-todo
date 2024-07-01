import { Form, Link, useActionData } from "react-router-dom";

// components
import { FormInput } from "../components";

// hooks
import { useRegister } from '../hooks/useRegister';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// functions
export let action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get(`email`);
  let password = formData.get(`password`);
  let displayName = formData.get(`displayName`);

  return { email, password, displayName }
}


function Register() {
  let userData = useActionData();
  let { registerWithEmail, isPending } = useRegister();

  let [errors, setErrors] = useState({
    displayName: ``,
    email: ``,
    password: ``,
  })

  useEffect(() => {
    if (userData) {
      if (userData?.email.trim() && userData?.password.trim() && userData?.displayName.trim()) {
        registerWithEmail(userData);
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

      if (!userData?.displayName.trim()) {
        setErrors((prev) => {
          return { ...prev, displayName: `input-error` }
        })
      }
    }
  }, [userData])

  console.log(errors);

  return (
    <div className="w-screen h-screen bg-[#6763e7]">
      <div className="grid place-items-center min-h-screen">
        <Form method="post" className="flex flex-col items-center gap-5 card bg-base-100 w-[400px] shadow-xl p-5">
          <div className="flex flex-col items-center gap-2 mb-2">
            <h1 className="text-4xl font-bold">Join us Today!</h1>
            <p className="text-xl opacity-70">
              Sign up now to become a member
            </p>
          </div>
          <FormInput type="text" name="displayName" placeholder="Name" status={errors.displayName} />
          <FormInput type="email" name="email" placeholder="Email" status={errors.email} />
          <FormInput type="password" name="password" placeholder="Password" status={errors.password} />

          {!isPending && <button className="btn btn-primary btn-wide">Register</button>}
          {isPending && <button disabled className="btn btn-primary btn-wide">Loading...</button>}

          <div>
            <span className="text-lg font-medium">Already a member?</span> <Link className="link link-primary" to='/login'>Login here</Link>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Register