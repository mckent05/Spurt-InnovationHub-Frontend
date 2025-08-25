import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleSignIn } from "../../store/sessions/thunkCreators";
import Input from "./Input";
import Navigation from "./Navigation";
import Submit from "./SubmitBtn";
import Title from "./Title";

const LoginPage = ({ loading, signedIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Fixed: correctly pick role
  const role = useSelector((state) => state.user.user?.role);

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const signIn = async (e) => {
    e.preventDefault();
    const result = await dispatch(handleSignIn(userDetails));
    if (handleSignIn.fulfilled.match(result)) {
      navigate("/");
    } else {
      console.error(result.payload);
    }
  };

  // useEffect(() => {
  //   console.log(signedIn, role)
  //   if (signedIn && role) {
  //     switch (role) {
  //       case "admin":
  //         console.log("I am in the admin")
  //         navigate("/admin-dashboard", { replace: true });
  //         break;
  //       case "hub_manager":
  //         navigate("/manager-dashboard", { replace: true });
  //         break;
  //       case "expert":
  //         navigate("/dashboard", { replace: true });
  //         break;
  //       default:
  //         navigate("/", { replace: true });
  //     }
  //   }
  // }, [signedIn, navigate, role]);

  return (
    <div className="container-fluid min-vh-100 bg-white">
      <div className="d-flex flex-column justify-content-center row-gap-4 mt-5 px-2">
        <div>
          <Navigation
            text="Don't have an account yet?"
            push="register"
            btnText="Create an account"
          />
        </div>

        <form
          onSubmit={signIn}
          className="mx-auto w-100 w-md-50 d-flex flex-column gap-3"
        >
          <Title text="Welcome!" />

          <Input
            ariaLabel="email"
            label="Email"
            name="email"
            type="text"
            handle={handleInput}
          />

          <div className="position-relative">
            <Input
              label="Password"
              ariaLabel="password"
              type="password"
              name="password"
              handle={handleInput}
            />
            <span
              className="position-relative bottom-25 text-warning fw-semibold"
              style={{ fontSize: "12px", cursor: "pointer" }}
            >
              Forgot Password?
            </span>
          </div>

          <Submit title="Login" loading={loading} />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
