import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const authContext = createContext();

// eslint-disable-next-line react/prop-types
export default function AuthContext({ children }) {
  //better step
  const [token, setToken] = useState(localStorage.getItem("tkn"));

  //correct step
  //   useEffect(() => {
  //     //Did mount case []

  //     const userTkn = localStorage.getItem("tkn");
  //     if (userTkn) {
  //       setToken(userTkn);
  //     }
  //   }, []);

  return (
    <authContext.Provider value={{ token, setToken }}>
      {children}
    </authContext.Provider>
  );
}
