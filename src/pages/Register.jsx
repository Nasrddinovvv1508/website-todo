import { Form, Link } from "react-router-dom";

// components
import { FormInput } from "../components";

// hooks
import { useRegister } from '../hooks/useRegister';

export let loader = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get(`email`);
  let password = formData.get(`password`);
  let displayName = formData.get(`displayName`);
  let photoURL = formData.get(`photoURL`);

  return { email, password, displayName, photoURL }
}


function Register() {
  return (
    <div>
      <Form>
        <h1>Register</h1>
        <FormInput type="text" name="displayName" placeholder="Name" />
        <FormInput type="url" name="photoURL" placeholder="Photo URL" />
        <FormInput type="email" name="email" placeholder="Email" />
        <FormInput type="password" name="password" placeholder="Password" />
      </Form>
    </div>
  )
}

export default Register