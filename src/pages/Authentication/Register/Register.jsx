import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import SocialLogin from "../socialLogin/SocialLogin";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";

const Register = () => {
  const axiosInstance = useAxios();
  const [profilePic, setProfilePic] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useAuth();

  const onSubmit = (data) => {
    console.log(data, createUser);
    createUser(data.email, data.password)
      .then(async (result) => {
        console.log(result.user)
        //update user info in database

        const userInfo = {
          email: data?.email,
          role: 'user',//default
          created_ar: new Date().toISOString(),
          last_log_in: new Date().toISOString(),

        }

        const userRes = await axiosInstance.post('/users', userInfo)
        console.log('in db', userRes.data)
        //update profile pic in firebase and database
        const userProfile = {
          displayName: data.name,
          photoURL: profilePic
        }
        updateUserProfile(userProfile)
          .then(() => {
            console.log('pp update')
          })
          .catch(err => {
            console.error(err.message)
          })
      })
      .then(err => {
        console.error(err.message)
      })
  };
  const handleImageUpload = async (event) => {
    const image = (event.target.files[0]);
    console.log(image)
    const formdata = new FormData();
    formdata.append('image', image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`
    const res = await axios.post(imageUploadUrl, formdata)
    setProfilePic(res.data.data.url)

  }

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold">Register now!</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required.</p>
            )}


            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input"
              placeholder="Your Name"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Name is required.</p>
            )}


            <label className="label">Profile Picture</label>
            <input
              onChange={handleImageUpload}
              type="file"
              className="input"
              placeholder="Your profile picture"
            />

            <label className="label">Password</label>
            <input
              {...register("password", { required: true, minLength: 6 })}
              type="password"
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password must be 6 charectera atleast.
              </p>
            )}
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required.</p>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-primary text-black mt-4">Register</button>
          </fieldset>
          <p><small>Already have an account? </small><Link to="/login">Login</Link> </p>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
