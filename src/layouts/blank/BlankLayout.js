import { Outlet } from "react-router-dom";
// import Dashboard from "../../views/common/dashboard/Dashboard";
// import Welcome from "../full/shared/welcome/Welcome";


const BlankLayout = () => (
  <>
    {/* <Dashboard/> */}
    <Outlet />
  </>
);

export default BlankLayout;

// import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import Dashboard from "../../views/common/dashboard/Dashboard";
// import Welcome from "../full/shared/welcome/Welcome";
// import { useEffect, useState } from "react";
// import { useAuth } from "../../store/contexts/AuthContext"; // Assuming your AuthContext path
// import { useDispatch } from "react-redux";
// import { clearMessage } from '../../store/slices/common/Message';  // Your correct slice path

// const BlankLayout = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { isAuthenticated } = useAuth(); // User Login status

//   const [open, setOpen] = useState(false);
//   const [showDashboard, setShowDashboard] = useState(false);

//   // Snackbar open initially
//   useEffect(() => {
//     setOpen(true);
//   }, []);

//   // First time visit at '/' → Auto Navigate
//   useEffect(() => {
//     if (location.pathname === '/' && !sessionStorage.getItem('visited')) {
//       sessionStorage.setItem('visited', 'true');
//       navigate('/dashboard/Dashboard');
//     }
//   }, [location, navigate]);

//   // Enable Dashboard Layout if user is logged in & not at '/'
//   useEffect(() => {
//     if (location.pathname !== '/' && isAuthenticated) {
//       setShowDashboard(true);
//     } else {
//       setShowDashboard(false);
//     }
//   }, [location, isAuthenticated]);

//   const handleClose = (reason) => {
//     if (reason === 'clickaway') return;
//     setOpen(false);
//     dispatch(clearMessage());
//   };

//   return (
//     <>
//       {showDashboard && <Dashboard />}
//       <Outlet />
//     </>
//   );
// };

// export default BlankLayout;
