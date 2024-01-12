import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import notify from "../../utils/notify";
import { setToken, setUser } from "../../utils/localStorage";
import { validation } from "./validation/validate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState([]);

  const handleFormHandler = async (e) => {
    e.preventDefault();
    // validation
    const { validate, error } = validation(formData);
    if (!validate) {
      setError(error);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/register",
          formData
        );
        // store user data in localStorage
        setUser(response.data.data.user); 
        setToken(response.data.data.token); 
        notify({ type: "success", message: response.data.message });
        navigate("/profile-picker", { replace: true }); // goto profile picker
      } catch (err) {
        console.log(err.response.data.message);
        notify({ type: "error", message: err.response.data.message });
      }
    }
  };

  return (
    <main className="w-screen h-screen flex bg-bgSidemenu">
      <ToastContainer />
      {/* Image */}
      <div className="hidden md:block md:flex-1 ps-0 lg:ps-10">
        <img
          src="/images/Team-spirit.png"
          alt="avatar"
          className="w-full h-full object-cover object-center"
        />
      </div>
      {/* Form */}
      <form
        onSubmit={handleFormHandler}
        className="flex-1 flex items-center justify-center md:justify-start px-6"
      >
        <div className="flex flex-col items-start min-w-[100%] sm:min-w-[80%] md:min-w-[70%] px-7 py-7  bg-bgChat rounded-lg">
          <h1 className="text-xl md:text-2xl font-medium text-white text-center w-full mb-3">
            Register Account
          </h1>
          <div className="form__control mb-2">
            <label
              htmlFor="name"
              className="text-white text-base md:text-lg font-semibold"
            >
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="py-2 px-4 text-base w-full rounded-full bg-transparent border-2 border-slate-300 text-white outline-none"
              id="name"
              placeholder="Enter name.."
            />
            {error.name && <span className="form__error">{error.name}</span>}
          </div>
          <div className="form__control mb-2">
            <label
              htmlFor="email"
              className="text-white text-base md:text-lg font-semibold"
            >
              Email
            </label>
            <input
              type="text"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="py-2 px-4 text-base w-full rounded-full bg-transparent border-2 border-slate-300 text-white outline-none"
              id="email"
              placeholder="Enter email.."
            />
            {error.email && <span className="form__error">{error.email}</span>}
          </div>
          <div className="form__control mb-3">
            <label
              htmlFor="password"
              className="text-white text-base md:text-lg font-semibold"
            >
              Password
            </label>
            <input
              type="text"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="py-2 px-4 text-base w-full rounded-full bg-transparent border-2 border-slate-300 text-white outline-none"
              id="password"
              placeholder="Enter password.."
            />
            {error.password && (
              <span className="form__error">{error.password}</span>
            )}
          </div>
          <button
            type="submit"
            className="mt-1 py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-full block w-full"
          >
            Register
          </button>
          <div className=" w-full text-end">
            <span>
              <Link to={"/login"} className="text-xs underline text-slate-200">
                Already have an account?
              </Link>
            </span>
          </div>
        </div>
      </form>
    </main>
  );
};
