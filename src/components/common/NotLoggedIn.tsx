import { Link } from "react-router-dom";

export const NotLogegedIn = () => {
  return (
    <div>
      <h1>You're not loggedIn,</h1>
      <p>
        login: <Link to="/login" />
      </p>
    </div>
  );
};
