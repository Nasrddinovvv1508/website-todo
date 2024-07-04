import { useDispatch, useSelector } from "react-redux";
import { Form, useActionData } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useState, useEffect } from "react";
import { FormInput } from "../components";
import toast from "react-hot-toast";
import { updateEmail, sendEmailVerification } from "firebase/auth"; // Firebase'dan sendEmailVerification qo'shamiz
import { UpdateProfile } from "../app/userSlice";

export let action = async ({ request }) => {
  let formData = await request.formData();
  let displayName = formData.get("displayName");
  let email = formData.get("email");

  return { displayName, email };
}

function Profile() {
  const { user } = useSelector((state) => state.user);
  const userData = useActionData();
  const [info, setInfo] = useState(false);
  const [emailInfo, setEmailInfo] = useState(false);

  let dispatch = useDispatch();

  useEffect(() => {
    if (userData && userData.displayName && auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: userData.displayName,
        uid: user.uid,
      }).then(() => {
        toast.success("Name successfully changed");
        dispatch(UpdateProfile(userData)); // Bu yerda userData dispatch qilinmoqda
        setInfo(!info);
      }).catch((error) => {
        toast.error(`Failed to update profile: ${error.message}`);
      });
    }

    if (userData?.email && auth?.currentUser) {
      updateEmail(auth.currentUser, userData.email).then(() => {
        sendEmailVerification(auth.currentUser)
          .then(() => {
            toast.success(`Email successfully changed. Please verify your new email.`);
            setEmailInfo(!emailInfo);
          })
          .catch((error) => {
            toast.error(`Error sending email verification: ${error.message}`);
            console.error(error);
          });
      }).catch((error) => {
        toast.error(`Error updating email: ${error.message}`);
        console.error(error);
      });
    }

  }, [userData]);

  if (!user) {
    console.error("User is not defined");
    return null;
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className="w-[600px] h-[400px] bg-white py-[100px] px-[80px]">
        <Form method="post" className="flex flex-col gap-16">
          <div className="flex justify-between items-end gap-3">
            {info ? (
              <FormInput className='' name='displayName' placeholder2='Set new Name' type="text" required />
            ) : (
              <h1 className="text-4xl mb-5"> {user.displayName} </h1>
            )}
            {info ? (
              <button type="submit" className="btn btn-secondary">Set name</button>
            ) : (
              <button onClick={() => setInfo(!info)} type="button" className="btn btn-accent">Change name</button>
            )}
          </div>
          <div className="flex flex-col gap-3">
            {emailInfo ? (
              <FormInput name='email' placeholder2='Set new Email' type="email" required />
            ) : (
              <p className="text-2xl mb-6">{user.email}</p>
            )}
            <div>
              {emailInfo ? (
                <button type="submit" className="btn btn-secondary">Set email</button>
              ) : (
                <button onClick={() => setEmailInfo(!emailInfo)} type="button" className="btn btn-accent">Change email</button>
              )}
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Profile;
