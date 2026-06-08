// // import React from 'react';
// // import { Navigate } from 'react-router-dom';
// // import { useAuth } from '../store/contexts/AuthContext';

// // const PrivateRoute = ({ element }) => {
// //   const { isAuthenticated } = useAuth();

// //   return isAuthenticated ? element : <Navigate to="/404" />;
// // };

// // export default PrivateRoute;





// //This is the old working privateRoute.js 

// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../store/contexts/AuthContext';

// const PrivateRoute = ({ element, allowedRoles }) => {
//   const { isAuthenticated, userData } = useAuth();
//   const location = useLocation();
//   const currentPath = location.pathname;
//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   //this section will allows only admin will navigate to dashboard when logging and other users not navigate to dashboard
//   if (allowedRoles && !allowedRoles.includes(userData.Type)) {
//     return <Navigate to='/' />;
//   }
//   console.log('Current Path ', currentPath);
//   return element;
// };

// export default PrivateRoute;



//Removing the Refreshing isse and modify with by adding RootNavigat and the old code is above
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../store/contexts/AuthContext';
import Spinner from '../components/app/spinner/Spinner';

const PrivateRoute = ({ element, allowedRoles }) => {
  const { isAuthenticated, userData, validating, isInitialized } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  
  if (!isInitialized || validating) {
    return <Spinner />; 
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!userData) {
    return <Spinner />; 
  }

  if (allowedRoles && !allowedRoles.includes(userData.Type)) {
    const defaultPages = {
      'A': '/dashboard/Home',
      'U': '/dashboard/helpDesk',
      'M': '/dashboard/dashboardsummary',
      'V': '/help-desk/tickets'
    };
    
    const defaultPage = defaultPages[userData.Type] || '/dashboard/helpDesk';
    return <Navigate to={defaultPage} replace />;
  }

  console.log('Current Path ', currentPath);
  return element;
};

export default PrivateRoute;