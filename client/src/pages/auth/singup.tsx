import React from "react";
import Form from "../../components/form";
import Input from "../../components/input";
import Error from "../../components/error";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/auth";
import Button from "../../components/button";

const SignUp = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  // validate form function
  const handleName = (name: string) => {
    setFormData((prev) => ({ ...prev, name }));
    if (name.length < 3) {
      setErrors((prev) => ({
        ...prev,
        name: "Name must be at least 3 characters.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };
  const handleEmail = (email: string) => {
    setFormData((prev) => ({ ...prev, email }));
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email address." }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };
  const handlePassword = (password: string) => {
    setFormData((prev) => ({ ...prev, password }));
    if (password.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters.",
      }));
    } else {
      setErrors({ ...errors, password: "" });
    }
  };
  // sumbit form function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    register(formData)
      .then(() => {
        navigate("/signin");
        setFormData({
          name: "",
          email: "",
          password: "",
        });
      })
      .catch((err) => {
        console.error(err.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div className="w-full md:w-1/2 p-2 md:p-8">
        <Form onSubmit={handleSubmit}>
          <div className="w-full max-w-md p-6 bg-white rounded-lg flex flex-col gap-4 ">
            <h2 className="text-lg md:text-2xl font-semibold text-center uppercase">
              Sign Up
            </h2>
            <div className="flex flex-col gap-1">
              <Input
                placeholder="Enter fullname."
                type="text"
                label="Fullname"
                value={formData?.name}
                onChange={(e) => handleName(e.target.value)}
              />
              {errors?.name && <Error error={errors?.name} />}
            </div>
            <div className="flex flex-col gap-1">
              <Input
                placeholder="Enter email."
                type="email"
                label="Email"
                value={formData?.email}
                onChange={(e) => handleEmail(e.target.value)}
              />
              {errors?.email && <Error error={errors?.email} />}
            </div>
            <div className="flex flex-col gap-1">
              <Input
                placeholder="Enter password."
                type="password"
                label="Password"
                value={formData?.password}
                onChange={(e) => handlePassword(e.target.value)}
              />
              {errors?.password && <Error error={errors?.password} />}
            </div>
            <div className="wfull">
              <Button type="submit" title="Singup" loading={isLoading} />
            </div>
          </div>
        </Form>
        <p className="text-center text-md text-gray-500">
          Already have an account{" "}
          <Link className="text-blue-400" to={"/signin"}>
            Signin
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
