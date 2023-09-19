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
      if (response.status === 400) {
        // Check for a specific error message in the response body
        return response.json().then((data) => {
          throw new Error(data.message);
        });
      } else if (response.ok) {
        return response.json();
      } else {
        throw new Error('Sign up failed');
      }
    })
    .then((data) => {
      // Handle successful user creation
      setUser(data);
    })
    .catch((error) => {
      // Handle errors, including the specific error message for email conflict
      console.error(error.message);
    });
};


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