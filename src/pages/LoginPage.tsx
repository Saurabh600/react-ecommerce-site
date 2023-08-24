import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth } from "../services/firebase";
import { Link, useNavigate } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  document.title = "Sign In | React Ecomm Site";

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("login form invoked submit request");
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCred) => {
        const user = userCred.user;
        console.log("loggin successful: ", user.uid);
        navigate("/");
      })
      .catch((err: AuthError) => {
        console.log({ code: err.code, message: err.message });
        alert(`Login failed: ${err.message}`);
      });
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-white">
      <form
        className="w-[32rem] min-w-max flex flex-col p-6 bg-gray-100 rounded text-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-red-500 text-center text-3xl font-medium mb-6">
          Login
        </h1>
        <input
          className="p-2 rounded-sm mb-4"
          type="email"
          placeholder="Enter Your Email"
          {...register("email", { required: true })}
        />
        {errors.email && <span className="form-text">invalid email</span>}
        <input
          className="p-2 rounded-sm mb-4"
          type="password"
          placeholder="Enter Your Password"
          {...register("password", {
            required: true,
          })}
        />
        {errors.password && <span className="form-text">invalid password</span>}
        <button
          type="submit"
          className="px-2 py-3 bg-green-500 hover:bg-green-600 text-white rounded mb-1"
        >
          Login
        </button>
        <div className="text-sm text-gray-500 mt-1">
          Not registered yet,{" "}
          <Link className="text-blue-400 hover:text-blue-600" to={"/signup"}>
            Sign Up?
          </Link>
        </div>
      </form>
    </div>
  );
}
