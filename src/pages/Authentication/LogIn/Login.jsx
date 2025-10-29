import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import SocialLogin from "../socialLogin/SocialLogin"; // Optional — you can remove if not using
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const { user, signIn } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // This will be triggered when the form is submitted
  const onSubmit = async (data) => {
    signIn(data.email, data.password)
      .then(result => {
        const loggedUser = result.user;
        navigate(from)
        console.log(loggedUser);
        toast.success("User Logged In Successfully");
      })
      .catch(error => {
        console.log(error.message);
        toast.error(error.message);
      })

    try {
      // Example placeholder for actual login logic
      // e.g. await loginUser(data.email, data.password);
      // If successful:
      toast.success("Logged in successfully!");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      {/* Toast notification container */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="label font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Email is required.</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="label font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input input-bordered w-full"
              placeholder="Enter your password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm mt-1">Password is required.</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm mt-1">
                Password must be at least 6 characters.
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a href="#" className="link link-hover text-sm">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn text-black btn-primary w-full">
            Login
          </button>

          {/* Register Link */}
          <p className="text-center text-sm mt-3">
            Don't have an account?{" "}
            <Link to="/register" className="link link-primary">
              Register
            </Link>
          </p>
        </form>

        {/* Social Login Section */}
        <div className="mt-5">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
