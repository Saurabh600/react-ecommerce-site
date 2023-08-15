import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

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
    <div className="form-wrapper login-form-wrapper">
      <h1 className="login-form-title">Login</h1>
      <form className="form login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            placeholder="example@gmail.com"
            {...register("email", { required: true })}
          />
          {errors.email && <span className="form-text">invalid email</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            className="form-control"
            type="password"
            placeholder="enter password"
            {...register("password", {
              required: true,
            })}
          />
          {errors.password && (
            <span className="form-text">invalid password</span>
          )}
        </div>
        <div className="form-group form-group-btn">
          <button type="submit" className="btn btn-submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
