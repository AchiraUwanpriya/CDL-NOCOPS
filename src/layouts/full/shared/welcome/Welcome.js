// import { makeStyles } from '@material-ui/core/styles';
// import { Alert, AlertTitle, Snackbar, Box, Container } from '@mui/material';
// import * as React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { clearMessage } from '../../../../store/slices/common/Message';
// import Home from '../../../../views/common/dashboard/Home';
// import { useLocation, useNavigate  } from 'react-router-dom';

// const useStyles = makeStyles({
//   cookieAlert: {
//     '& .MuiAlert-icon': {
//       fontSize: 25,
//     },
//   },
// });

// const Welcome = () => {
//   const { userData } = useSelector((state) => state.authSlices);
//   const [open, setOpen] = React.useState(false);
//   const [showHome, setShowHome] = React.useState(false);
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const classes = useStyles();
//   const navigate = useNavigate(); 
//   // Show the welcome message immediately
//   // React.useEffect(() => {
//   //   setOpen(true);
//   // }, []);

//   // // Hide the dashboard if the user navigates away
//   // React.useEffect(() => {
//   //   if (location.pathname !== '/') {
//   //     setShowDashboard(true);
//   //   }
//   // }, [location]);

//   // const handleClose = (reason) => {
//   //   if (reason === 'clickaway') {
//   //     return;
//   //   }
//   //   setOpen(false);
//   //   dispatch(clearMessage());
//   //   navigate("/dashboard/Dashboard");
//   // };


//   React.useEffect(() => {
//     setOpen(true);
//   }, []);

//   //this section will allows only admin will navigate to dashboard when logging and other users not navigate to dashboard
//   React.useEffect(() => {
//     if (
//       location.pathname === '/' &&
//       !sessionStorage.getItem('visited') &&
//       userData.Type === 'A' //  only redirect if Admin
//     ) {
//       sessionStorage.setItem('visited', 'true');
//       navigate('/dashboard/Home');
//     }
//   }, [location, navigate, userData.Type]);
  

//   // Set showDashboard true when user moves away from '/'
//   React.useEffect(() => {
//     if (location.pathname !== '/') {
//       setShowHome(true);
//     }
//   }, [location]);

//   const handleClose = (reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setOpen(false);
//     dispatch(clearMessage());
//   };

//   return (
//     <React.Fragment>
//       <Snackbar
//         open={open}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         autoHideDuration={2000}
//         onClose={handleClose}
//       >
        
//         <Alert
//           className={classes.cookieAlert}
//           onClose={handleClose}
//           severity="info"
//           variant="filled"
//           sx={{ width: '100%', color: 'white' }}
//         >
//           <AlertTitle sx={{ fontSize: 18 }}>Welcome back {userData.UserName}</AlertTitle>
//         </Alert>
        
//       </Snackbar>

//       {/* Show Dashboard in the body of the page */}
//       {showHome && location.pathname === '/' && (
//         <Container sx={{ marginTop: '50px' }}> 
//           <Home />
//         </Container>
//       )}
//     </React.Fragment>
//   );
// };

// export default Welcome;


// import { makeStyles } from '@material-ui/core/styles';
// import { Alert, AlertTitle, Snackbar, Box, Container } from '@mui/material';
// import * as React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { clearMessage } from '../../../../store/slices/common/Message';
// import Home from '../../../../views/common/dashboard/Home';
// import { useLocation, useNavigate } from 'react-router-dom';

// const useStyles = makeStyles({
//   cookieAlert: {
//     '& .MuiAlert-icon': {
//       fontSize: 25,
//     },
//   },
// });

// const Welcome = () => {
//   const { userData } = useSelector((state) => state.authSlices);
//   const [open, setOpen] = React.useState(false);
//   const [showHome, setShowHome] = React.useState(false);
//   const [hasVisited, setHasVisited] = React.useState(false);
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const classes = useStyles();
//   const navigate = useNavigate();

//   React.useEffect(() => {
//     setOpen(true);
//   }, []);


//   React.useEffect(() => {
//     if (
//       location.pathname === '/' &&
//       !hasVisited &&
//       userData?.Type === 'A' 
//     ) {
//       setHasVisited(true);
//       navigate('/dashboard/Home');
//     }
//   }, [location, navigate, userData?.Type, hasVisited]);

  
//   React.useEffect(() => {
//     if (location.pathname !== '/') {
//       setShowHome(true);
//     }
//   }, [location]);

//   const handleClose = (reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setOpen(false);
//     dispatch(clearMessage());
//   };

//   return (
//     <React.Fragment>
//       <Snackbar
//         open={open}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         autoHideDuration={2000}
//         onClose={handleClose}
//       >
//         <Alert
//           className={classes.cookieAlert}
//           onClose={handleClose}
//           severity="info"
//           variant="filled"
//           sx={{ width: '100%', color: 'white' }}
//         >
//           <AlertTitle sx={{ fontSize: 18 }}>Welcome back {userData?.UserName}</AlertTitle>
//         </Alert>
//       </Snackbar>

      
//       {showHome && location.pathname === '/' && (
//         <Container sx={{ marginTop: '50px' }}> 
//           <Home />
//         </Container>
//       )}
//     </React.Fragment>
//   );
// };

// export default Welcome;


//Remove the triggering for other user roles.
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle, Snackbar, Box, Container } from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage } from '../../../../store/slices/common/Message';
import Home from '../../../../views/common/dashboard/Home';
import { useLocation, useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  cookieAlert: {
    '& .MuiAlert-icon': {
      fontSize: 25,
    },
  },
});

const Welcome = () => {
  const { userData } = useSelector((state) => state.authSlices);
  const [open, setOpen] = React.useState(false);
  const [hasVisited, setHasVisited] = React.useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles();
  const navigate = useNavigate();

  React.useEffect(() => {
    setOpen(true);
  }, []);

  React.useEffect(() => {
    if (
      location.pathname === '/' &&
      !hasVisited &&
      userData?.Type === 'A' 
    ) {
      setHasVisited(true);
      navigate('/dashboard/Home');
    }
  }, [location, navigate, userData?.Type, hasVisited]);

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    dispatch(clearMessage());
  };

  const shouldShowHome = userData?.Type === 'A' && location.pathname === '/';

  return (
    <React.Fragment>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          className={classes.cookieAlert}
          onClose={handleClose}
          severity="info"
          variant="filled"
          sx={{ width: '100%', color: 'white' }}
        >
          <AlertTitle sx={{ fontSize: 18 }}>Welcome back {userData?.UserName}</AlertTitle>
        </Alert>
      </Snackbar>
      
      {shouldShowHome && (
        <Container sx={{ marginTop: '50px' }}> 
          <Home />
        </Container>
      )}
    </React.Fragment>
  );
};

export default Welcome;