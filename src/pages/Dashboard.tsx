import { useState } from "react";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

import { NotLoggedIn } from "../components/common/NotLoggedIn";
import { Loading } from "../components/common/Loading";

import { TSetState } from "../types";

const UserUpdateForm = ({
  setShowUpdateDialogue,
}: {
  setShowUpdateDialogue: TSetState<boolean>;
}) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowUpdateDialogue(() => false);
  };

  return (
    <div className="form-wrapper">
      <form className="form form-user-update" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="" className="form-label"></label>
          <input type="text" className="form-field" />
        </div>
        <div className="form-group">
          <label htmlFor="" className="form-label"></label>
          <input type="text" className="form-field" />
        </div>
        <div className="form-group">
          <label htmlFor="" className="form-label"></label>
          <input type="text" className="form-field" />
        </div>
        <div className="form-group">
          <label htmlFor="" className="form-label"></label>
          <input type="text" className="form-field" />
        </div>
        <div>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const [showUpdateDialogue, setShowUpdateDialogue] = useState(false);

  onAuthStateChanged(auth, () => {
    const user = auth.currentUser;
    if (!user) {
      console.log("current user is null");
      setHasLoggedIn(() => false);
      return;
    }

    setHasLoggedIn(() => true);
    setIsLoading(() => false);
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!hasLoggedIn) {
    return <NotLoggedIn />;
  }

  if (showUpdateDialogue) {
    return <UserUpdateForm setShowUpdateDialogue={setShowUpdateDialogue} />;
  }

  return (
    <div>
      <h1>User Dashboard!</h1>
    </div>
  );
};

export default Dashboard;
