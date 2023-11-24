import { ReactNode, useReducer } from "react";
import userDetailsReducer from "./reducers/userDetails-reducer";
import userDetailsContext from "./context/userDetails-context";

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
