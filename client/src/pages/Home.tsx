import { useEffect, useState, useLayoutEffect } from "react"
import auth from "../utils/auth";

import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";

import ErrorPage from "./ErrorPage";
import UserList from "../components/Users";

  const Home = () => {

    const [users, setUsers] = useState<UserData[]>([]);
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);
 
    useEffect(() => {
      if (loginCheck) {
          fetchUsers();
      }
  }, [loginCheck]);

  useLayoutEffect(() => {
      checkLogin();
  }, []);


  useLayoutEffect(() => {
    checkLogin();
  }, []);

const checkLogin = () => {
  if (auth.loggedIn()) {
    setLoginCheck(true);
  }
};

const fetchUsers = async () => {
  try {
      const data = await
      retrieveUsers();
      setUsers(data)
  } catch (err) {
    console.error('Failed to retrieve User:',err);
    setError(true);
  }
}

if (error) {
  return <ErrorPage/>
}

  return (

    <div>
      {
        !loginCheck ? (
          <div className="login-notice">
            <h1>
              Login to view Birthday Events!
            </h1>

          </div>
        ) : (
          <UserList users={users}/>
        )
      }
    </div>
  );
};

export default Home;