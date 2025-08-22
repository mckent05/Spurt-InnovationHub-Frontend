import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleSignUp } from "../../store/sessions/thunkCreators";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Navigation from "./Navigation";
import Submit from "./SubmitBtn";
import Title from "./Title";
import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create();

const RegisterPage = () => {
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const sessionDetails = useSelector((state) => state.sessions);
  const { isLoading } = sessionDetails;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    mobile: "",
    cohort: "",
    password: "",
    confirmPassword: "",
    role: "startup",
    proofOfParticipation: "",
  });

  const uploadPicture = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "sd31ytp8");
    const { data } = await instance.post(
      "https://api.cloudinary.com/v1_1/duj88gras/image/upload",
      formData
    );
    return data;
  };

  const handleFileChange = async (e) => {
    const img = e.target.files[0];
    const response = await uploadPicture(img);
    if (response.url) {
      toast.success("Image uploaded!");
      setUserDetails((prev) => ({
        ...prev,
        proofOfParticipation: response.url,
      }));
    } else {
      toast.error("Error uploading image");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (userDetails.password !== userDetails.confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    const { confirmPassword, ...registerDetails } = userDetails;

    const result = await dispatch(handleSignUp(registerDetails));
    if (handleSignUp.fulfilled.match(result)) {
      navigate("/login");
      toast(result.message);
    } else {
      console.error(result.payload);
    }
  };

  useEffect(() => {
    if (Object.keys(formErrorMessage).length) {
      const timer = setTimeout(() => {
        setFormErrorMessage({});
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formErrorMessage]);

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column">
      <div className="w-100 w-lg-75 mx-auto d-flex flex-column align-items-center justify-content-center px-4 py-5">
        <Navigation
          text="Already have an account?"
          push="login"
          btnText="Login"
        />

        <form
          onSubmit={handleRegister}
          className="w-100"
          style={{ maxWidth: "600px", marginTop: "1.5rem" }}
        >
          <Title text="Create an account." />

          <div className="row g-3 mt-1">
            {/* Full Name */}
            <div className="col-12 col-sm-6">
              <Input
                label="fullName"
                name="fullName"
                type="text"
                handle={handleInput}
                value={userDetails.fullName}
              />
            </div>

            {/* Email */}
            <div className="col-12 col-sm-6">
              <Input
                label="email"
                name="email"
                type="email"
                handle={handleInput}
                value={userDetails.email}
              />
            </div>

            <div className="col-12 col-sm-6">
              <Input
                label="mobile"
                name="mobile"
                type="text"
                handle={handleInput}
                value={userDetails.mobile}
              />
            </div>

            <div className="col-12 col-sm-6">
              <label htmlFor="cohort" className="form-label">
                Cohort
              </label>
              <select
                className="form-select"
                name="cohort"
                id="cohort"
                value={userDetails.cohort}
                onChange={handleInput}
                required
              >
                <option value="">Select a cohort</option>
                <option value="cohort 1">Cohort-1</option>
                <option value="cohort 2">Cohort-2</option>
                <option value="cohort 3">Cohort-3</option>
                <option value="cohort 4">Cohort-4</option>
              </select>
            </div>

            <div className="col-12 col-sm-6">
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control border-warning"
                  id="password"
                  name="password"
                  value={userDetails.password}
                  placeholder="Password"
                  onInput={handleInput}
                  required
                  minLength={6}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>

            <div className="col-12 col-sm-6">
              <div className="form-floating">
                <input
                  type="password"
                  className={`form-control border-warning ${
                    formErrorMessage.confirmPassword ? "is-invalid" : ""
                  }`}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onInput={handleInput}
                  value={userDetails.confirmPassword}
                  required
                  minLength={6}
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
                {formErrorMessage.confirmPassword && (
                  <div className="invalid-feedback">
                    {formErrorMessage.confirmPassword}
                  </div>
                )}
              </div>
            </div>

            <div className="col-12 col-sm-6">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                className="form-select"
                name="role"
                id="role"
                value={userDetails.role}
                onChange={handleInput}
                required
              >
                <option value="startup">Startup</option>
                <option value="hub_manager">Hub Manager</option>
                <option value="expert">Expert</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="col-12">
              <label htmlFor="file" className="form-label">
                Proof of participation
              </label>
              <input
                className="form-control"
                name="proofOfParticipation"
                type="file"
                id="file"
                onChange={(e) => handleFileChange(e)}
              />
            </div>

            <div className="col-12 mt-3">
              <Submit title="Register" loading={isLoading} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
