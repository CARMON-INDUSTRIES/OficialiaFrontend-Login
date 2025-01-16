'use client'
import React, { useState, createContext, useContext } from 'react';

const AddUserContext = createContext();

const AddUserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    intaLink: '',
    youtubeLink: '',
  });
  return (
    <AddUserContext.Provider value={{ user, setUser }}>
      {children}
    </AddUserContext.Provider>
  );
};

export const useAddUser = () => useContext(AddUserContext);

export default AddUserContextProvider;
