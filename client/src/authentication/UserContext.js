import React, { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();


  useEffect(() => {
      fetch('/authorized')
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.log("Unexpected response:", response);
            setUser(null)
            throw new Error("Authorization failed");
          }
        })
        .then((data) => {
         
          setUser(data);
        })
        .catch((error) => {
          console.error("Error:", error);
    
        });
  },
  );

  const handleLogin = (username, password) => {
    fetch('/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.status === 401) {
          throw new Error("Invalid login");
        } else if (response.ok) {
          return response.json();
        } else {
            setUser(null)
          throw new Error("Login failed");
        }
      })
      .then((data) => {
        console.log(data);
       
        setUser(data.user);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
    
          setUser(null);
        } else {
          throw new Error("Logout failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  const createUser = (values) => {
    return fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.status === 409) {
          throw new Error('Email already exists. Please choose a different email.');
        } else if (response.ok) {
          return response.json();
        } else {
          throw new Error('Sign up failed');
        }
      })
      .then((data) => {
        setUser(data);
      })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        handleLogin,
        handleLogout,
        createUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, UserProvider };