import { Button, Label, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/UserContext";

const Login = () => {
  const [validation, setValidation] = useState(null);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmitLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
        navigate("/");
      })
      .catch((error) => {
        const authError = error.message;
        setValidation(authError);
        console.error(error);
      });
  };
  return (
    <div className="flex items-center justify-center py-16">
      <div className="container">
        <form
          onSubmit={handleSubmitLogin}
          className="flex flex-col gap-4 w-96 mx-auto border p-8 rounded-xl"
        >
          <div>
            <h1 className="text-2xl capitalize font-semibold mb-5">
              Please Login
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
              name="password"
              type="password"
              required={true}
            />
          </div>
          <p>
            <small>{validation}</small>
          </p>
          <Button type="submit">Submit</Button>
          <p>
            <small>
              New to Amazon?
              <Link
                to="/signup"
                className="text-orange-500 hover:text-orange-700 ml-2"
              >
                Register Now!
              </Link>
            </small>
          </p>
          <Button>SignUp with Google</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
