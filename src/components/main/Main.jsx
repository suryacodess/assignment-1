import React, { useState } from "react";
import Loader from "../loader/Loader";
import "./sass/style.css";

function User() {
  return (
    <>
      <main className="main">
        <h1>Click Get User Button for Users</h1>
      </main>
    </>
  );
}

export default function Main() {
  const [user, setUser] = useState([]);
  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState(false);

  const handleGetUsers = () => {
    try {
      setLoader(true);
      fetch("https://reqres.in/api/users")
        .then((res) => res.json())
        .then((res) => {
          setUser(res.data[count]);
          setCount(count + 1);
          if (count >= 5) {
            setCount(0);
          }
        });
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header className="header">
        <div className="header__title">
          <h1>GETUsers</h1>
        </div>
        <div className="header__button">
          <button onClick={handleGetUsers}>get users</button>
        </div>
      </header>

      {user.length === 0 ? (
        <User />
      ) : (
        <main className="main">
          {loader ? (
            <Loader />
          ) : (
            <div className="main__inner">
              <div className="user">
                <div className="user__avatar">
                  <img src={user.avatar} alt={user.name} />
                </div>
                <div className="user__data">
                  <p className="name">
                    {user.first_name + " " + user.last_name}
                  </p>
                  <p className="email">{user.email}</p>
                </div>
              </div>
            </div>
          )}
        </main>
      )}
    </>
  );
}
