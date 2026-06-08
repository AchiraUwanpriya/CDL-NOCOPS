// import { CssBaseline, ThemeProvider } from '@mui/material';
// import { useRoutes } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { ThemeSettings } from './theme/Theme';
// import RTL from './layouts/full/shared/customizer/RTL';
// import ScrollToTop from './components/theme/shared/ScrollToTop';
// import { useAuth } from './store/contexts/AuthContext';
// import Welcome from './layouts/full/shared/welcome/Welcome';
// import Spinner from './components/app/spinner/Spinner';
// import AlertCart from './components/app/AlertCart';
// function App() {
//   const { isAuthenticated, validating, router,AuthRouter} = useAuth();
//   const authRouter = useRoutes(AuthRouter);
//   const appRouter = useRoutes(router);
//   // const userRouter = useRoutes(UserRouter);
//   const theme = ThemeSettings();
//   const customizer = useSelector((state) => state.customizer);
//   return (
//     <ThemeProvider theme={theme}>
//       <AlertCart />
//       {validating ? (
//         <Spinner />
//       ) : (
//         <RTL direction={customizer.activeDir}>
//           <CssBaseline />
//           {!isAuthenticated ? (
//             <ScrollToTop>{authRouter}</ScrollToTop>
//           ) : (
//             <>
//               <Welcome />
//               <ScrollToTop>{appRouter}</ScrollToTop>
//             </>
//           )}
//         </RTL>
//       )}
//     </ThemeProvider>
//   );
// }

// export default App;


import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import { ThemeSettings } from './theme/Theme';
import RTL from './layouts/full/shared/customizer/RTL';
import ScrollToTop from './components/theme/shared/ScrollToTop';
import { useAuth } from './store/contexts/AuthContext';
import Welcome from './layouts/full/shared/welcome/Welcome';
import Spinner from './components/app/spinner/Spinner';
import AlertCart from './components/app/AlertCart';
import { useEffect, useRef } from 'react'; 
import { DoPin } from './store/slices/common/deviceInfo/DeviceInfoSlices'; 

function App() {
  const { isAuthenticated, validating, router, AuthRouter } = useAuth();
  const authRouter = useRoutes(AuthRouter);
  const appRouter = useRoutes(router);
  const theme = ThemeSettings();
  const customizer = useSelector((state) => state.customizer);
  const dispatch = useDispatch();
  const hasFetched = useRef(false);

 
  useEffect(() => {
    const storedTime = sessionStorage.getItem('DoPinDataTime');
    const isExpired = storedTime ? Date.now() - storedTime > 8 * 60 * 1000 : true;

    if (!hasFetched.current || isExpired) {
      dispatch(DoPin());
      hasFetched.current = true;
    }

    const interval = setInterval(() => {
      dispatch(DoPin());
    }, 8 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <AlertCart />
      {validating ? (
        <Spinner />
      ) : (
        <RTL direction={customizer.activeDir}>
          <CssBaseline />
          {!isAuthenticated ? (
            <ScrollToTop>{authRouter}</ScrollToTop>
          ) : (
            <>
              <Welcome />
              <ScrollToTop>{appRouter}</ScrollToTop>
            </>
          )}
        </RTL>
      )}
    </ThemeProvider>
  );
}

export default App;
