import { useContext } from "react";
import userDetailsContext from "./Login/userDetails-context";

export const useAuth = () => useContext(userDetailsContext);
