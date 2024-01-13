import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import notify from "../../utils/notify";
import { setToken, setUser } from "../../utils/localStorage";
import { validation } from "./validation/validate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const location = useLocation();
  const message = location.state?.message;
  const navigate = useNavigate();
  const [error, setError] = useState([]);

  useEffect(() => {
    if (message) {
      notify({ type: "warn", message: message }); // notify plesse login first
    }
  }, [message]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormHandler = async (e) => {
    e.preventDefault();
    // validation
    const { validate, error } = validation(formData);
    if (!validate) {
      setError(error);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/login",
          formData
        );
        if (response.status === 200) {
          setUser(response.data.data.user); // set user data to localStorage
          setToken(response.data.data.token); // set refresh-token to localStorage
          notify({ type: "success", message: response.data.message });
          navigate("/", { replace: true });
        }
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
          src="/images/Conversation.png"
          alt="avatar"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <form
        onSubmit={handleFormHandler}
        className="flex-1 flex items-center justify-center md:justify-start px-6"
      >
        <div className="flex flex-col items-start min-w-[100%] sm:min-w-[80%] md:min-w-[70%] px-7 py-7  bg-bgChat rounded-lg">
          <h1 className="text-xl md:text-2xl font-medium text-white text-center w-full mb-3">
            Login to your account
          </h1>
          <div className="form__control mb-3">
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
              type="password"
              autoComplete=""
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
            Login
          </button>
          <div className=" w-full text-end">
            <span>
              <Link
                to={"/register"}
                className="text-xs underline text-slate-200"
              >
                Don't have an account?
              </Link>
            </span>
          </div>
        </div>
      </form>
    </main>
  );
};
