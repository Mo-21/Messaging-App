import { ReactNode, useReducer } from "react";
import userDetailsContext from "./userDetails-context";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LoginCredentialsResponse {
  userDetails: {
    email: string;
    isAdmin: boolean;
    username: string;
    _id: string;
  };
  credentials: LoginCredentials;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

interface SetUserDetails {
  type: "SET_USER_DETAILS";
  payload: LoginCredentialsResponse;
}

interface SetCredentials {
  type: "SET_CREDENTIALS";
  payload: LoginCredentials;
}

export type LoginAction = SetUserDetails | SetCredentials;

const userDetailsReducer = (state: any, action: LoginAction) => {
  if (action.type === "SET_CREDENTIALS")
    return { ...state, credentials: action.payload };
  if (action.type === "SET_USER_DETAILS")
    return { ...state, userDetails: action.payload };
  return state;
};

const initialState = {
  userDetails: {
    email: null,
    isAdmin: null,
    username: null,
    _id: null,
  },
  credentials: {
    email: "",
    password: "",
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
