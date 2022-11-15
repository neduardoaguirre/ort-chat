import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { createContext, useState } from "react";
import { User } from "../ models/user.model";
import { database } from "../config/firebase";

let userModel = new User();

export const AuthenticatedUserContext = createContext({});

export const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

/**
 * loadUser
 * This method load user model when user authenticated
 *
 * @param authUser Firebase User model
 */
export const loadUser = async (authUser) => {
  if (authUser) {
    userModel = (await getDoc(doc(database, "users", authUser.uid))).data();
  } else {
    userModel = null;
  }
};

export const getUser = () => {
  return userModel;
};

/**
 * updateUser
 * This method update user model for Firebase
 * @param user User model
 */
export const updateUser = async (user) => {
  await setDoc(doc(database, "users", user.uid), {
    ...user,
  });

  // Update local userModel
  userModel = user;

  console.log("Updated user: ", userModel);
};
