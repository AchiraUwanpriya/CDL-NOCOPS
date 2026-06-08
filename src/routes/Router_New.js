// import { lazy } from 'react';
// import { Navigate } from 'react-router-dom';
// import Loadable from '../layouts/full/shared/loadable/Loadable';
// import PrivateRoute from './PrivateRoute';
// /* ***Layouts**** */
// const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
// const Login2 = Loadable(lazy(() => import('../views/auth/Login')));
// const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

// const DataCenter = Loadable(lazy(() => import('../views/common/dataCenter/DataCenter')));
// const DeviceInfo = Loadable(lazy(() => import('../views/common/deviceInfo/DeviceInfo')));
// const HelpDesk = Loadable(lazy(() => import('../views/common/helpDesk/HelpDesk')));
// const LocationInfo = Loadable(lazy(() => import('../views/common/locationInfo/LocationInfo')));
// const NetworkStatus = Loadable(lazy(() => import('../views/common/networkStatus/NetworkStatus')));
// const Home = Loadable(lazy(() => import('../views/common/dashboard/Home')));
// const DashboardSummary = Loadable(lazy(() => import('../views/common/dashboard/DashboardSummary')));

// // const Error = Loadable(lazy(() => import('../views/authentication/Error')));
// const ErrorPage = Loadable(lazy(() => import('../views/auth/ErrorPage')));

// /* ****Admin Help Desk Config Page***** */
// const Activity = Loadable(lazy(() => import('../views/admin/helpDesk/activity/Activity')));
// const Category = Loadable(lazy(() => import('../views/admin/helpDesk/category/Category')));
// const Incident = Loadable(lazy(() => import('../views/admin/helpDesk/incident/Incident')));
// const Severity = Loadable(lazy(() => import('../views/admin/helpDesk/severity/Severity')));
// const Status = Loadable(lazy(() => import('../views/admin/helpDesk/status/Status')));
// const Tickets = Loadable(lazy(() => import('../views/admin/helpDesk/tickets/Tickets')));
// const HDLocation = Loadable(lazy(() => import('../views/admin/helpDesk/location/Location')));
// const Department = Loadable(lazy(() => import('../views/admin/helpDesk/department/Department')));
// // const Tickets = Loadable(lazy(() => import('../views/help-Desk/Tickets')));

// /* ****Admin Asset Config Page***** */
// const AssetInfo = Loadable(lazy(() => import('../views/admin/asset/asset-info/AssetInfo')));
// const Brand = Loadable(lazy(() => import('../views/admin/asset/brand/Brand')));
// const AssetCategory = Loadable(lazy(() => import('../views/admin/asset/category/Category')));
// const Company = Loadable(lazy(() => import('../views/admin/asset/company/Company')));
// const Equipment = Loadable(lazy(() => import('../views/admin/asset/equipment/Equipment')));
// const EquipmentType = Loadable(
//   lazy(() => import('../views/admin/asset/equipment-type/EquipmentType')),
// );
// const Location = Loadable(lazy(() => import('../views/admin/asset/location/Location')));
// const Model = Loadable(lazy(() => import('../views/admin/asset/model/Model')));
// const Server = Loadable(lazy(() => import('../views/admin/asset/server/Server')));
// const ServerTemplate = Loadable(
//   lazy(() => import('../views/admin/asset/server-templates/ServerTemplate')),
// );
// const ServerTemplateGroup = Loadable(
//   lazy(() => import('../views/admin/asset/server-templates-group/ServerTemplateGroup')),
// );
// const AssetSeverity = Loadable(lazy(() => import('../views/admin/asset/severity/Severity')));
// const User = Loadable(lazy(() => import('../views/admin/asset/user/User')));
// const UserAccess = Loadable(lazy(() => import('../views/admin/userAccess/UserAccess')));
// const UserProfile = Loadable(lazy(() => import('../views/common/userProfile/UserProfile')));

// const AdminRouter = [
//   {
//     path: '/',
//     element: <FullLayout />,
//     children: [

//       // { path: '/', element:  null}, //This code uses for when a page refreshed and it goes for home page not staying in current page
//       { path: '/', element: <Navigate to={window.location.pathname}  />}, // uses for when page refreshed and it stays on current page
//       { path: '/404', element: <ErrorPage /> },
//       { path: '/*', element: <Navigate to="/404" /> },

//       //---------Admin routs --------------// 
//       { path: '/help-desk/activity', exact: true, element: <PrivateRoute element={<Activity />} allowedRoles={['A']}/> },
//       { path: '/help-desk/category', exact: true, element: <PrivateRoute element={<Category />} allowedRoles={['A']}/> },
//       { path: '/help-desk/incident', exact: true, element: <PrivateRoute element={<Incident />} allowedRoles={['A']}/> },
//       { path: '/help-desk/severity', exact: true, element: <PrivateRoute element={<Severity />} allowedRoles={['A']}/> },
//       { path: '/help-desk/status', exact: true, element: <PrivateRoute element={<Status />} allowedRoles={['A']}/> },
//       { path: '/help-desk/tickets', exact: true, element: <PrivateRoute element={<Tickets />} allowedRoles={['A','M']}/> },
//       { path: '/help-desk/location', exact: true, element: <PrivateRoute element={<HDLocation />} allowedRoles={['A']}/> },
//       { path: '/help-desk/department', exact: true, element: <PrivateRoute element={<Department />} allowedRoles={['A']}/> },
//       { path: '/asset/company', exact: true, element: <PrivateRoute element={<Company />} allowedRoles={['A']}/> },
//       { path: '/asset/equipment', exact: true, element: <PrivateRoute element={<Equipment />} allowedRoles={['A']}/> },
//       { path: '/asset/user', exact: true, element: <PrivateRoute element={<User />} allowedRoles={['A']}/> },
//       { path: '/asset/asset-info', exact: true, element: <PrivateRoute element={<AssetInfo />} allowedRoles={['A']}/> },
//       { path: '/asset/brand', exact: true, element: <PrivateRoute element={<Brand />} allowedRoles={['A']}/> },
//       { path: '/asset/category', exact: true, element: <PrivateRoute element={<AssetCategory />} allowedRoles={['A']}/> },
//       { path: '/asset/equipment-type', exact: true, element: <PrivateRoute element={<EquipmentType />} allowedRoles={['A']}/> },
//       { path: '/asset/location', exact: true, element: <PrivateRoute element={<Location />} allowedRoles={['A']}/> },
//       { path: '/asset/model', exact: true, element: <PrivateRoute element={<Model />} allowedRoles={['A']}/> },
//       { path: '/asset/severity', exact: true, element: <PrivateRoute element={<AssetSeverity />} allowedRoles={['A']}/> },
//       { path: '/asset/server', exact: true, element: <PrivateRoute element={<Server />} allowedRoles={['A','M' ]}/> },
//       { path: '/asset/server-templates', exact: true, element: <PrivateRoute element={<ServerTemplate />} allowedRoles={['A']}/> },
//       { path: '/asset/server-templates-group',exact: true,element: <PrivateRoute element={<ServerTemplateGroup />} allowedRoles={['A']}/>},
//       { path: '/user-access', exact: true, element: <PrivateRoute element={<UserAccess />} allowedRoles={['A']}/> },

//        //---------Common routs --------------// 
//       { path: '/dashboard/dataCenter', exact: true, element: <PrivateRoute element={<DataCenter />} allowedRoles={['A', 'U', ]}/> },
//       { path: '/dashboard/deviceInfo', exact: true, element: <PrivateRoute element={<DeviceInfo />} allowedRoles={['A', 'M' ]}/> },
//       { path: '/dashboard/locationInfo', exact: true, element: <PrivateRoute element={<LocationInfo />} allowedRoles={['A', 'U', ]}/> },
//       { path: '/dashboard/helpDesk', exact: true, element: <PrivateRoute element={<HelpDesk />} allowedRoles={['A', 'U', 'M']}/> },
//       { path: '/dashboard/networkStatus', exact: true, element: <PrivateRoute element={<NetworkStatus />} allowedRoles={['A', 'U', ]}/> },
//       //{ path: '/dashboard/dashboard', exact: true, element: <PrivateRoute element={<Dashboard/>} allowedRoles={['A', 'U', ]}/> },
//       { path: '/user-profile', exact: true, element: <PrivateRoute element={<UserProfile />} allowedRoles={['A', 'U','M']}/> },

//       { path: '/dashboard/Home', exact: true, element: <PrivateRoute element={<Home />} allowedRoles={['A']} /> },

//       { path: '/dashboard/dashboardsummary', exact: true, element: <PrivateRoute element={<DashboardSummary />} allowedRoles={['A','M']} /> },
//       // { path: '/dataCenter', exact: true, element: <PrivateRoute element={<DataCenter />} allowedRoles={['A', 'User', 'Manager']}/><DataCenter /> },
//       // { path: '/deviceInfo', exact: true, element: <PrivateRoute element={<DeviceInfo />} allowedRoles={['A', 'User', 'Manager']}/><DeviceInfo /> },
//       // { path: '/locationInfo', exact: true, element: <PrivateRoute element={<LocationInfo />} allowedRoles={['A', 'User', 'Manager']}/><LocationInfo /> },
//     ],
//   },
// ];

// const CommonRouter = [
//   {
//     // path: '/',
//     // element: <FullLayout />,
//     // children: [
//     //   { path: '/', element: <Navigate to="/helpDesk" /> },
//     //   { path: '/dataCenter', exact: true, element: <DataCenter /> },
//     //   { path: '/deviceInfo', exact: true, element: <DeviceInfo /> },
//     //   { path: '/helpDesk', exact: true, element: <HelpDesk /> },
//     //   { path: '/locationInfo', exact: true, element: <LocationInfo /> },
//     //   { path: '/user-profile', exact: true, element: <UserProfile /> },
//     //   // { path: '/networkStatus', exact: true, element: <NetworkStatus /> },
//     //   { path: '/404', element: <ErrorPage /> },
//     //   { path: '/*', element: <Navigate to="/404" /> },
//     // ],
//   },
// ];

// const ViewerRouter = [
//   {
//     // path: '/',
//     // element: <FullLayout />,
//     // children: [
//     //   { path: '/', element: <Navigate to="/help-desk/tickets" /> },
//     //   { path: '/help-desk/tickets', exact: true, element: <Tickets /> },
//     //   { path: '/help-desk/404', element: <ErrorPage /> },
//     //   { path: '/help-desk/*', element: <Navigate to="/404" /> },
//     // ],
//   },
// ];

// const AuthRouter = [
//   {
//     path: '/',
//     element: <BlankLayout />,
//     children: [
//       { path: '/*', element: <Navigate to="/" /> },
//       { path: '/', element: <Login2 /> },
//     ],
//   },
// ];

// export { AdminRouter, AuthRouter, CommonRouter, ViewerRouter };




//Removing the Refreshing isse and modify the Routers with  adding RootNavigat and the old code is above
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import PrivateRoute from './PrivateRoute';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const Login2 = Loadable(lazy(() => import('../views/auth/Login')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

const DataCenter = Loadable(lazy(() => import('../views/common/dataCenter/DataCenter')));
const DeviceInfo = Loadable(lazy(() => import('../views/common/deviceInfo/DeviceInfo')));
const HelpDesk = Loadable(lazy(() => import('../views/common/helpDesk/HelpDesk')));
const LocationInfo = Loadable(lazy(() => import('../views/common/locationInfo/LocationInfo')));
const NetworkStatus = Loadable(lazy(() => import('../views/common/networkStatus/NetworkStatus')));
const Home = Loadable(lazy(() => import('../views/common/dashboard/Home')));
const DashboardSummary = Loadable(lazy(() => import('../views/common/dashboard/DashboardSummary')));

// const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const ErrorPage = Loadable(lazy(() => import('../views/auth/ErrorPage')));

/* ****Admin Help Desk Config Page***** */
const Activity = Loadable(lazy(() => import('../views/admin/helpDesk/activity/Activity')));
const Category = Loadable(lazy(() => import('../views/admin/helpDesk/category/Category')));
const Incident = Loadable(lazy(() => import('../views/admin/helpDesk/incident/Incident')));
const Severity = Loadable(lazy(() => import('../views/admin/helpDesk/severity/Severity')));
const Status = Loadable(lazy(() => import('../views/admin/helpDesk/status/Status')));
const Tickets = Loadable(lazy(() => import('../views/admin/helpDesk/tickets/Tickets')));
const HDLocation = Loadable(lazy(() => import('../views/admin/helpDesk/location/Location')));
const Department = Loadable(lazy(() => import('../views/admin/helpDesk/department/Department')));
// const Tickets = Loadable(lazy(() => import('../views/help-Desk/Tickets')));

/* ****Admin Asset Config Page***** */
const AssetInfo = Loadable(lazy(() => import('../views/admin/asset/asset-info/AssetInfo')));
const Brand = Loadable(lazy(() => import('../views/admin/asset/brand/Brand')));
const AssetCategory = Loadable(lazy(() => import('../views/admin/asset/category/Category')));
const Company = Loadable(lazy(() => import('../views/admin/asset/company/Company')));
const Equipment = Loadable(lazy(() => import('../views/admin/asset/equipment/Equipment')));
const EquipmentType = Loadable(
  lazy(() => import('../views/admin/asset/equipment-type/EquipmentType')),
);
const Location = Loadable(lazy(() => import('../views/admin/asset/location/Location')));
const Model = Loadable(lazy(() => import('../views/admin/asset/model/Model')));
const Server = Loadable(lazy(() => import('../views/admin/asset/server/Server')));
const ServerTemplate = Loadable(
  lazy(() => import('../views/admin/asset/server-templates/ServerTemplate')),
);
const ServerTemplateGroup = Loadable(
  lazy(() => import('../views/admin/asset/server-templates-group/ServerTemplateGroup')),
);
const AssetSeverity = Loadable(lazy(() => import('../views/admin/asset/severity/Severity')));
const User = Loadable(lazy(() => import('../views/admin/asset/user/User')));
const UserAccess = Loadable(lazy(() => import('../views/admin/userAccess/UserAccess')));
const UserProfile = Loadable(lazy(() => import('../views/common/userProfile/UserProfile')));

const RootNavigate = () => {
  const currentPath = window.location.pathname;
  
  if (currentPath === '/') {
    return <Navigate to="/dashboard/Home" replace />;
  }
  
  return null;
};

const AdminRouter = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <RootNavigate /> },
      { path: '/404', element: <ErrorPage /> },
      { path: '/*', element: <Navigate to="/404" /> },

      //---------Admin routs --------------// 
      { path: '/help-desk/activity', exact: true, element: <PrivateRoute element={<Activity />} allowedRoles={['A']}/> },
      { path: '/help-desk/category', exact: true, element: <PrivateRoute element={<Category />} allowedRoles={['A']}/> },
      { path: '/help-desk/incident', exact: true, element: <PrivateRoute element={<Incident />} allowedRoles={['A']}/> },
      { path: '/help-desk/severity', exact: true, element: <PrivateRoute element={<Severity />} allowedRoles={['A']}/> },
      { path: '/help-desk/status', exact: true, element: <PrivateRoute element={<Status />} allowedRoles={['A']}/> },
      { path: '/help-desk/tickets', exact: true, element: <PrivateRoute element={<Tickets />} allowedRoles={['A','M']}/> },
      { path: '/help-desk/location', exact: true, element: <PrivateRoute element={<HDLocation />} allowedRoles={['A']}/> },
      { path: '/help-desk/department', exact: true, element: <PrivateRoute element={<Department />} allowedRoles={['A']}/> },
      { path: '/asset/company', exact: true, element: <PrivateRoute element={<Company />} allowedRoles={['A']}/> },
      { path: '/asset/equipment', exact: true, element: <PrivateRoute element={<Equipment />} allowedRoles={['A']}/> },
      { path: '/asset/user', exact: true, element: <PrivateRoute element={<User />} allowedRoles={['A']}/> },
      { path: '/asset/asset-info', exact: true, element: <PrivateRoute element={<AssetInfo />} allowedRoles={['A']}/> },
      { path: '/asset/brand', exact: true, element: <PrivateRoute element={<Brand />} allowedRoles={['A']}/> },
      { path: '/asset/category', exact: true, element: <PrivateRoute element={<AssetCategory />} allowedRoles={['A']}/> },
      { path: '/asset/equipment-type', exact: true, element: <PrivateRoute element={<EquipmentType />} allowedRoles={['A']}/> },
      { path: '/asset/location', exact: true, element: <PrivateRoute element={<Location />} allowedRoles={['A']}/> },
      { path: '/asset/model', exact: true, element: <PrivateRoute element={<Model />} allowedRoles={['A']}/> },
      { path: '/asset/severity', exact: true, element: <PrivateRoute element={<AssetSeverity />} allowedRoles={['A']}/> },
      { path: '/asset/server', exact: true, element: <PrivateRoute element={<Server />} allowedRoles={['A','M' ]}/> },
      { path: '/asset/server-templates', exact: true, element: <PrivateRoute element={<ServerTemplate />} allowedRoles={['A']}/> },
      { path: '/asset/server-templates-group',exact: true,element: <PrivateRoute element={<ServerTemplateGroup />} allowedRoles={['A']}/>},
      { path: '/user-access', exact: true, element: <PrivateRoute element={<UserAccess />} allowedRoles={['A']}/> },

       //---------Common routs --------------// 
      { path: '/dashboard/dataCenter', exact: true, element: <PrivateRoute element={<DataCenter />} allowedRoles={['A', 'U', ]}/> },
      { path: '/dashboard/deviceInfo', exact: true, element: <PrivateRoute element={<DeviceInfo />} allowedRoles={['A', 'M' ]}/> },
      { path: '/dashboard/locationInfo', exact: true, element: <PrivateRoute element={<LocationInfo />} allowedRoles={['A', 'U', ]}/> },
      { path: '/dashboard/helpDesk', exact: true, element: <PrivateRoute element={<HelpDesk />} allowedRoles={['A', 'U', 'M']}/> },
      { path: '/dashboard/networkStatus', exact: true, element: <PrivateRoute element={<NetworkStatus />} allowedRoles={['A', 'U', ]}/> },
      //{ path: '/dashboard/dashboard', exact: true, element: <PrivateRoute element={<Dashboard/>} allowedRoles={['A', 'U', ]}/> },
      { path: '/user-profile', exact: true, element: <PrivateRoute element={<UserProfile />} allowedRoles={['A', 'U','M']}/> },

      { path: '/dashboard/Home', exact: true, element: <PrivateRoute element={<Home />} allowedRoles={['A']} /> },

      { path: '/dashboard/dashboardsummary', exact: true, element: <PrivateRoute element={<DashboardSummary />} allowedRoles={['A','M']} /> },
      // { path: '/dataCenter', exact: true, element: <PrivateRoute element={<DataCenter />} allowedRoles={['A', 'User', 'Manager']}/><DataCenter /> },
      // { path: '/deviceInfo', exact: true, element: <PrivateRoute element={<DeviceInfo />} allowedRoles={['A', 'User', 'Manager']}/><DeviceInfo /> },
      // { path: '/locationInfo', exact: true, element: <PrivateRoute element={<LocationInfo />} allowedRoles={['A', 'User', 'Manager']}/><LocationInfo /> },
    ],
  },
];

const CommonRouter = [
  {
    // path: '/',
    // element: <FullLayout />,
    // children: [
    //   { path: '/', element: <Navigate to="/helpDesk" /> },
    //   { path: '/dataCenter', exact: true, element: <DataCenter /> },
    //   { path: '/deviceInfo', exact: true, element: <DeviceInfo /> },
    //   { path: '/helpDesk', exact: true, element: <HelpDesk /> },
    //   { path: '/locationInfo', exact: true, element: <LocationInfo /> },
    //   { path: '/user-profile', exact: true, element: <UserProfile /> },
    //   // { path: '/networkStatus', exact: true, element: <NetworkStatus /> },
    //   { path: '/404', element: <ErrorPage /> },
    //   { path: '/*', element: <Navigate to="/404" /> },
    // ],
  },
];

const ViewerRouter = [
  {
    // path: '/',
    // element: <FullLayout />,
    // children: [
    //   { path: '/', element: <Navigate to="/help-desk/tickets" /> },
    //   { path: '/help-desk/tickets', exact: true, element: <Tickets /> },
    //   { path: '/help-desk/404', element: <ErrorPage /> },
    //   { path: '/help-desk/*', element: <Navigate to="/404" /> },
    // ],
  },
];

const AuthRouter = [
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/*', element: <Navigate to="/" /> },
      { path: '/', element: <Login2 /> },
    ],
  },
];

export { AdminRouter, AuthRouter, CommonRouter, ViewerRouter };