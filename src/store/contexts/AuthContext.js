// import { createContext, useContext, useEffect, useState } from 'react';
// // import { AdminRouter, CommonRouter, ViewerRouter, AuthRouter } from '../../routes/Router';
// import { AdminRouter, CommonRouter, ViewerRouter, AuthRouter } from '../../routes/Router_New';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   login,
//   logout,
//   validateToken,
//   GetUserDetails,
//   GetHeaderComponents,
// } from '../slices/auth/AuthSlices';
// import { reset } from '../Store';
// const NocOps_Token = JSON.parse(localStorage.getItem('NocOps_Token'));
// const AuthContext = createContext();
// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthContextProvider = ({ children }) => {
//   const dispatch = useDispatch();

//   const { isLoggedIn, loading, validating, gettingUserData, userData } = useSelector(
//     (state) => state.authSlices,
//   );

//   const [isAuthenticated, setIsAuthenticated] = useState(() => {
//     if (NocOps_Token) {
//       dispatch(validateToken());
//       return isLoggedIn;
//     }
//     return false;
//   });
//   const [router, setRouter] = useState([]);

//   useEffect(() => {
//     setIsAuthenticated(isLoggedIn);
//     if (isLoggedIn === true) {
//       dispatch(GetUserDetails());
//       dispatch(GetHeaderComponents());
//     }
//   }, [isLoggedIn]);

//   const hasRole = (role) => userData.Type?.roles?.includes(role);

//   useEffect(() => {
//     if (userData) {
//       // if (userData.Type === 'A') {
//         setRouter(AdminRouter);
//       // }
//       // else if (userData.Type === 'U') {
//       //   setRouter(CommonRouter);
//       // } else if (userData.Type === 'V') {
//       //   setRouter(ViewerRouter);
//       // } else if (userData.Type === 'M') {
//       //   setRouter(ViewerRouter);
//       // } else {
//       //   setRouter([]);
//       // }
//     }
//   }, [gettingUserData]);

//   const handleLogin = (values) => {
//     dispatch(login(values));
//   };
//   const handleLogout = () => {
//     dispatch(logout());
//     dispatch(reset());
//   };

//   return (
//     <>
//       <AuthContext.Provider
//         value={{
//           router,
//           AuthRouter,
//           isAuthenticated,
//           loading,
//           validating,
//           handleLogin,
//           handleLogout,
//           setIsAuthenticated,
//           hasRole,
//           userData,
//         }}
//       >
//         {children}
//       </AuthContext.Provider>
//     </>
//   );
// };

// export default AuthContext;




//Removing the Refreshing isse and modify with by adding RootNavigat and the old code is above
import { createContext, useContext, useEffect, useState } from 'react';
// import { AdminRouter, CommonRouter, ViewerRouter, AuthRouter } from '../../routes/Router';
import { AdminRouter, CommonRouter, ViewerRouter, AuthRouter } from '../../routes/Router_New';
import { useDispatch, useSelector } from 'react-redux';
import {
  login,
  logout,
  validateToken,
  GetUserDetails,
  GetHeaderComponents,
} from '../slices/auth/AuthSlices';
import { reset } from '../Store';

const NocOps_Token = JSON.parse(localStorage.getItem('NocOps_Token'));

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  const { isLoggedIn, loading, validating, gettingUserData, userData } = useSelector(
    (state) => state.authSlices,
  );

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!NocOps_Token;
  });
  
  const [router, setRouter] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (NocOps_Token && !isInitialized) {
      dispatch(validateToken()).then(() => {
        setIsInitialized(true);
      });
    } else if (!NocOps_Token) {
      setIsInitialized(true);
    }
  }, [dispatch, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      setIsAuthenticated(isLoggedIn);
      if (isLoggedIn === true) {
        dispatch(GetUserDetails());
        dispatch(GetHeaderComponents());
      }
    }
  }, [isLoggedIn, isInitialized, dispatch]);

  const hasRole = (role) => userData.Type?.roles?.includes(role);

  useEffect(() => {
    if (userData && userData.Type) {
      if (userData.Type === 'A') {
        setRouter(AdminRouter);
      } else if (userData.Type === 'U') {
        setRouter(AdminRouter); 
      } else if (userData.Type === 'M') {
        setRouter(AdminRouter);
      } else if (userData.Type === 'V') {
        setRouter(AdminRouter); 
      } else {
        setRouter(AdminRouter);
      }
    }
  }, [userData, gettingUserData]);

  const handleLogin = (values) => {
    dispatch(login(values));
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    setIsAuthenticated(false);
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          router,
          AuthRouter,
          isAuthenticated,
          loading,
          validating,
          handleLogin,
          handleLogout,
          setIsAuthenticated,
          hasRole,
          userData,
          isInitialized, 
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContext;