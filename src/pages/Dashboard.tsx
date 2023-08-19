import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Dashboard = () => {
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  onAuthStateChanged(auth, () => {
    const user = auth.currentUser;
    if (!user) {
      console.log("current user is null");
      setHasLoggedIn(() => false);
      return;
    }

    setHasLoggedIn(() => true);
    setIsLoading(() => true);
  });

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!hasLoggedIn) {
    return (
      <div>
        <h1>You're not loggedIn,</h1>
        <p>
          login: <Link to="/login" />
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>User Dashboard!</h1>
    </div>
  );
};

export default Dashboard;
