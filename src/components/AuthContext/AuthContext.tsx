import React, { Children, FC ,createContext,useEffect,useState} from 'react';
import styles from './AuthContext.module.css';

interface AuthContextProps {}

const AuthContext: FC<AuthContextProps> = () => {
  const AuthCreateContext = createContext(null);
  
  return(
  <div className={styles.AuthContext} data-testid="AuthContext">
    AuthContext Component
  </div>
)};

// const initialValue ={
//   token:null,
// }
// const AuthContext = createContext();

// export const AuthProvider = ({ children }:any) => {
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(true); 

//   useEffect(() => {
//     const storedToken : any= localStorage.getItem("token");
//     setToken(storedToken);
//     setLoading(false); 
//   }, []);

//   return (
//     <AuthContext.Provider value={{ token ,loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
