import { Form, Link, useActionData } from "react-router-dom";

// components
import { FormInput } from "../components";

// hooks
import { useLogin } from '../hooks/useLogin'
import { useEffect } from "react";

export let action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get(`email`);
  let password = formData.get(`password`);

  return { email, password }
}

function Login() {
  let userData = useActionData();
  let { signInWithEmail, isPending } = useLogin();

  useEffect(() => {
    if (userData) {
      signInWithEmail(userData)
    }
  }, [userData])


  return (
    <div className="grid place-items-center min-h-screen">
      <Form method="post" className="flex flex-col items-center gap-5 card bg-base-100 w-[400px] shadow-xl p-5">
        <h1 className="text-4xl font-semibold">Login</h1>
        <FormInput type="email" name="email" placeholder="Email" />
        <FormInput type="password" name="password" placeholder="Password" />

        {!isPending && <button className="btn btn-primary btn-wide">Login</button>}
        {isPending && <button disabled className="btn btn-primary btn-wide">Loading...</button>}

        <div>
          Didn't registered yet? <Link className="link link-primary" to='/register'>Register</Link>
        </div>
      </Form>
    </div>
  )
}

export default Login