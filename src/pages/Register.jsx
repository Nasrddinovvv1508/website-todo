import { Form, Link, useActionData } from "react-router-dom";

// components
import { FormInput } from "../components";

// hooks
import { useRegister } from '../hooks/useRegister';
import { useEffect } from "react";

// functions
export let action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get(`email`);
  let password = formData.get(`password`);
  let displayName = formData.get(`displayName`);
  let photoURL = formData.get(`photoURL`);

  return { email, password, displayName, photoURL }
}


function Register() {
  let userData = useActionData();
  let { registerWithEmail, isPending } = useRegister();

  useEffect(() => {
    if (userData) {
      registerWithEmail(userData.email, userData.password, userData.displayName, userData.photoURL)
    }
  }, [userData])

  return (
    <div className="grid place-items-center min-h-screen">
      <Form method="post" className="flex flex-col items-center gap-5 card bg-base-100 w-[400px] shadow-xl p-5">
        <h1 className="text-4xl font-semibold">Register</h1>
        <FormInput type="text" name="displayName" placeholder="Name" />
        <FormInput type="url" name="photoURL" placeholder="Photo URL" />
        <FormInput type="email" name="email" placeholder="Email" />
        <FormInput type="password" name="password" placeholder="Password" />

        {!isPending && <button className="btn btn-primary btn-wide">Register</button>}
        {isPending && <button disabled className="btn btn-primary btn-wide">Loading...</button>}

        <div>
          Already registered? <Link className="link link-primary" to='/login'>Login</Link>
        </div>
      </Form>
    </div>
  )
}

export default Register