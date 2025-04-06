import React from "react";
import Form from "../../components/form";
import Input from "../../components/input";
import Error from "../../components/error";
import { data, Link, useNavigate } from "react-router-dom";
import Button from "../../components/button";
import { login } from "../../api/auth";

const SignIn = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({
    email: "",
    password: "",
    invalid: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  // validate form function
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
    login(formData)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.name);
        setFormData({
          email: "",
          password: "",
        });
        navigate("/");
      })
      .catch((err) => {
        setErrors((prev) => ({
          ...prev,
          invalid: err.response.data.message || "Invalid email or password",
        }));
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div className="w-full md:w-1/2  p-2 md:p-8">
        <Form onSubmit={handleSubmit}>
          <div className="w-full max-w-md   rounded-lg flex flex-col gap-4">
            <h2 className="text-lg md:text-2xl font-semibold text-center uppercase">
              Sign In
            </h2>
            <div className="w-full flex text-center">
              {errors?.invalid && <Error error={errors?.invalid} />}
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
              <Button type="submit" title="Singin" loading={isLoading} />
            </div>
          </div>
        </Form>
        <p className="text-center text-md text-gray-500">
          Did not have an account{" "}
          <Link className="text-blue-400" to={"/signup"}>
            Signup
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignIn;
