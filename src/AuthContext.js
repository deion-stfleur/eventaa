// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for an existing valid token
    const storedToken = localStorage.getItem('token');
    console.log('User state updated:', user);

    if (storedToken) {
      axios.get('http://localhost:8000/api/checkTokenValidity', {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then(response => {
          setUser(response.data.user);
        })
        .catch(error => {
          console.error('Token validation failed:', error);
          setUser(null);
        });
    } else {
      setUser(null);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token); // Store the token in localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // Remove the token from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context || { user: null }; // Return an object with a default value for user
};
