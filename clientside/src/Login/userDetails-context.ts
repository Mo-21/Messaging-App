import { LoginAction, LoginCredentialsResponse } from "./UserDetailsProvider";
import React, { Dispatch } from "react";

interface UserContextType {
  state: LoginCredentialsResponse;
  dispatch: Dispatch<LoginAction>;
}

const userDetailsContext = React.createContext<UserContextType>(
  {} as UserContextType
);

export default userDetailsContext;
