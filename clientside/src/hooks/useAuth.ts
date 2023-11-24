import { useContext } from "react";
import userDetailsContext from "../context/userDetails-context";

const useAuth = () => useContext(userDetailsContext);

export default useAuth;
