import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { auth } from "../services/firebase";
import { AuthError, createUserWithEmailAndPassword } from "firebase/auth";

type Inputs = {
  email: string;
  password: string;
};

export default function SignUpPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("form invoked submit request");
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCred) => {
        const user = userCred.user;
        alert(`user created with id: ${user.uid}`);
        navigate("/login");
      })
      .catch((err: AuthError) => {
        alert(`account creation failed, error: ${err.message}`);
      });
  };

  document.title = "Sign Up | React Ecomm Site";

  return (
    <div className="form-wrapper login-form-wrapper">
      <h1 className="login-form-title">Create New Account</h1>
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
              minLength: 8,
              maxLength: 15,
            })}
          />
          {errors.password && (
            <span className="form-text">invalid password</span>
          )}
        </div>
        <div className="form-group form-group-btn">
          <button type="submit" className="btn btn-submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
