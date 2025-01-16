'use client'
import React, {useState, useContext, createContext} from 'react'

const AddUserClickContext = createContext()

const AddUserClickContextProvider = ({children}) => {
const [clicked, setClicked] = useState(false)

  return (
    <AddUserClickContext.Provider value={{clicked, setClicked}}>
        {children}
    </AddUserClickContext.Provider>
  )
}

export const useClicked = () => useContext(AddUserClickContext)

export default AddUserClickContextProvider