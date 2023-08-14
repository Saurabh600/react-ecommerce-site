import { signInWithEmailAndPassword } from "firebase/auth";
import { useRef } from "react";
import { auth } from "../services/firebase";

export default function LoginPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          ref={emailRef}
          required
          placeholder="email@example.com"
        />
        <input
          type="password"
          name="password"
          ref={passwordRef}
          required
          placeholder="enter password"
        />
        <button type="submit">Create Account</button>
      </form>
    </>
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email) {
      alert("email field is required");
      return;
    }

    if (!password) {
      alert("password field is required");
      return;
    }

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;
      console.log(user);
      alert(`logged in as ${user}`);
    } catch (err) {
      console.log(err);
      alert(`loggin failed: ${err}`);
    }
  }
}
