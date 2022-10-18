import { Button, Label, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/UserContext";
const SignUp = () => {
  const [validation, setValidation] = useState(null);
  const { signUp } = useContext(AuthContext);
  const handleSubmitSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.repeatpass.value;
    if (password !== confirm) {
      setValidation(`Password didn't match`);
      return;
    }
    setValidation(null);
    signUp(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="container">
        <form
          onSubmit={handleSubmitSignUp}
          className="flex flex-col gap-4 w-96 mx-auto border p-8 rounded-xl"
        >
          <div>
            <h1 className="text-2xl capitalize font-semibold mb-5">
              Sign up here
            </h1>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              name="email"
              placeholder="Enter your Email"
              required={true}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              name="password"
              required={true}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="repeat-password" value="Repeat password" />
            </div>
            <TextInput
              id="repeat-password"
              type="password"
              name="repeatpass"
              required={true}
              shadow={true}
            />
          </div>
          <p className="text-red-600">
            <small>{validation}</small>
          </p>
          <Button type="submit">Submit</Button>
          <p>
            <small>
              Already Registered?
              <Link
                to="/login"
                className="text-orange-500 hover:text-orange-700 ml-2"
              >
                Login here
              </Link>
            </small>
          </p>
          <Button>SignUp with Google</Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
