import { ReactNode, useReducer } from "react";
import userDetailsContext from "./userDetails-context";
import { userDetailsFromStorage } from "../getFromStorage";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LoginCredentialsResponse {
  userDetails: {
    email: string;
    isAdmin: boolean;
    username: string;
    _id: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegistrationCredentials {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface SetUserDetails {
  type: "SET_USER_DETAILS";
  payload: LoginCredentialsResponse;
}

interface SetCredentialsForRegistration {
  type: "SET_CREDENTIALS_REGISTRATION";
  payload: RegistrationCredentials;
}

interface Logout {
  type: "LOGOUT";
}

export type LoginAction =
  | SetUserDetails
  | Logout
  | SetCredentialsForRegistration;

const userDetailsReducer = (state: any, action: LoginAction) => {
  if (action.type === "SET_USER_DETAILS")
    return { ...state, userDetails: action.payload };
  if (action.type === "SET_CREDENTIALS_REGISTRATION")
    return { ...state, userDetails: action.payload };
  if (action.type === "LOGOUT") {
    localStorage.removeItem("userDetails");
    return initialState;
  }
  return state;
};

const currentUser = userDetailsFromStorage();
console.log(currentUser);
const initialState = {
  userDetails: currentUser
    ? JSON.parse(currentUser)
    : {
        email: null,
        isAdmin: null,
        username: null,
        _id: null,
      },
};

interface Prop {
  children: ReactNode;
}

export const UserDetailsProvider = ({ children }: Prop) => {
  const [state, dispatch] = useReducer(userDetailsReducer, initialState);

  return (
    <userDetailsContext.Provider value={{ state, dispatch }}>
      {children}
    </userDetailsContext.Provider>
  );
};
