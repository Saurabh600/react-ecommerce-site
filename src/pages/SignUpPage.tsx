import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { auth } from "../services/firebase";
import {
  AuthError,
  createUserWithEmailAndPassword,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";

type Inputs = {
  email: string;
  password: string;
  auto_login: boolean;
};

export default function SignUpPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        alert("account created successfully");
        if (data.auto_login) {
          signInWithEmailAndPassword(auth, data.email, data.password).catch(
            (err: Error) => {
              alert(`auto login failed, error: ${err.message}`);
            }
          );
          navigate("/");
          return;
        }
        navigate("/login");
      })
      .catch((err: AuthError) => {
        alert(`account creation failed, error: ${err.message}`);
      });
  };

  document.title = "Sign Up | React Ecomm Site";

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-white">
      <form
        className="w-[32rem] min-w-max flex flex-col p-6 bg-gray-100 rounded text-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-red-500 text-center text-3xl font-medium mb-6">
          Create New Account
        </h1>
        <input
          className="p-2 rounded-sm text-base"
          type="email"
          placeholder="Enter Your Email"
          {...register("email", { required: "email is required" })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </span>
        )}
        <input
          className="p-2 rounded-sm mt-4"
          type="password"
          placeholder="Enter Your Password"
          {...register("password", {
            required: "password is required",
            min: "lenght must be 8",
            max: "lenght must not exced 15",
            minLength: 8,
            maxLength: 15,
          })}
        />
        {errors.password && (
          <span className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </span>
        )}
        <div className="mt-4 space-x-4">
          <input
            type="checkbox"
            className="w-4 h-4"
            defaultChecked
            {...register("auto_login")}
          />
          <span className="text-neutral-600 text-base">Auto Login</span>
        </div>
        <button
          type="submit"
          className="px-2 py-3 bg-green-500 hover:bg-green-600 text-white rounded mt-4"
        >
          Sign Up
        </button>
        <div className="text-sm text-gray-500 mt-1">
          Already a user,{" "}
          <Link className="text-blue-400 hover:text-blue-600" to={"/login"}>
            login?
          </Link>
        </div>
      </form>
    </div>
  );
}
