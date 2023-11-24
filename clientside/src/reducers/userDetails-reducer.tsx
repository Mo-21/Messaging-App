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

export default userDetailsReducer;
