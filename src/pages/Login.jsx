import { Form, Link, useLoaderData } from "react-router-dom";

// components
import { FormInput } from "../components";

// hooks
import { useLogin } from '../hooks/useLogin'
import { useEffect } from "react";

export let loader = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get(`email`);
  let password = formData.get(`password`);

  return { email, password }
}

function Login() {
  let userData = useLoaderData();
  let { signInWithEmail, isPending } = useLogin();

  useEffect(() => {
    if (userData) {
      signInWithEmail(userData)
    }
  }, [userData])

  return (
    <div>
      <Form>
        <h1>Login</h1>
        <FormInput type="email" name="email" placeholder="Email" />
        <FormInput type="password" name="password" placeholder="Password" />
      </Form>
    </div>
  )
}

export default Login