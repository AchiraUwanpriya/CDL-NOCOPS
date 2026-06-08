// import { lazy } from 'react';
// import { Navigate } from 'react-router-dom';
// import Loadable from '../layouts/full/shared/loadable/Loadable';

// /* ***Layouts**** */
// const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
// const Login2 = Loadable(lazy(() => import('../views/auth/Login')));
// const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

// const DataCenter = Loadable(lazy(() => import('../views/common/dataCenter/DataCenter')));
// const DeviceInfo = Loadable(lazy(() => import('../views/common/deviceInfo/DeviceInfo')));
// const HelpDesk = Loadable(lazy(() => import('../views/common/helpDesk/HelpDesk')));
// const LocationInfo = Loadable(lazy(() => import('../views/common/locationInfo/LocationInfo')));
// const NetworkStatus = Loadable(lazy(() => import('../views/common/networkStatus/NetworkStatus')));
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
//       { path: '/', element: <Navigate to="/help-desk/tickets" /> },
//       { path: '/404', element: <ErrorPage /> },
//       { path: '/*', element: <Navigate to="/404" /> }
//     ],
//   },
//   {
//     path: '/help-desk',
//     element: <FullLayout />,
//     children: [
//       { path: '/help-desk/activity', exact: true, element: <Activity /> },
//       { path: '/help-desk/category', exact: true, element: <Category /> },
//       { path: '/help-desk/incident', exact: true, element: <Incident /> },
//       { path: '/help-desk/severity', exact: true, element: <Severity /> },
//       { path: '/help-desk/status', exact: true, element: <Status /> },
//       { path: '/help-desk/tickets', exact: true, element: <Tickets /> },
//       { path: '/help-desk/location', exact: true, element: <HDLocation /> },
//       { path: '/help-desk/department', exact: true, element: <Department /> },
//       { path: '/help-desk/404', element: <ErrorPage /> },
//       { path: '/help-desk/*', element: <Navigate to="/help-desk/404" /> },
//     ],
//   },
//   {
//     path: '/admin/asset',
//     element: <FullLayout />,
//     children: [
//       { path: '/admin/asset/company', exact: true, element: <Company /> },
//       { path: '/admin/asset/equipment', exact: true, element: <Equipment /> },
//       { path: '/admin/asset/user', exact: true, element: <User /> },
//       { path: '/admin/asset/asset-info', exact: true, element: <AssetInfo /> },
//       { path: '/admin/asset/brand', exact: true, element: <Brand /> },
//       { path: '/admin/asset/category', exact: true, element: <AssetCategory /> },
//       { path: '/admin/asset/equipment-type', exact: true, element: <EquipmentType /> },
//       { path: '/admin/asset/location', exact: true, element: <Location /> },
//       { path: '/admin/asset/model', exact: true, element: <Model /> },
//       { path: '/admin/asset/severity', exact: true, element: <AssetSeverity /> },
//       { path: '/admin/asset/server', exact: true, element: <Server /> },
//       { path: '/admin/asset/server-templates', exact: true, element: <ServerTemplate /> },
//       {
//         path: '/admin/asset/server-templates-group',
//         exact: true,
//         element: <ServerTemplateGroup />,
//       },
//       { path: '/admin/asset/404', element: <ErrorPage /> },
//       { path: '/admin/asset/*', element: <Navigate to="/admin/asset/404" /> },
//     ],
//   },
//   {
//     path: '/admin/dashboard',
//     element: <FullLayout />,
//     children: [
//       { path: '/admin/dashboard/dataCenter', exact: true, element: <DataCenter /> },
//       { path: '/admin/dashboard/deviceInfo', exact: true, element: <DeviceInfo /> },
//       { path: '/admin/dashboard/locationInfo', exact: true, element: <LocationInfo /> },
//       { path: '/admin/dashboard/404', element: <ErrorPage /> },
//       { path: '/admin/dashboard/*', element: <Navigate to="/admin/dashboard/404" /> },
//     ],
//   },
//   {
//     path: '/admin/user-access',
//     element: <FullLayout />,
//     children: [
//       { path: '/admin/user-access', exact: true, element: <UserAccess /> },
//     ],
//   },
// ];
// const CommonRouter = [
//   {
//     path: '/',
//     element: <FullLayout />,
//     children: [
//       { path: '/', element: <Navigate to="/helpDesk" /> },
//       { path: '/dataCenter', exact: true, element: <DataCenter /> },
//       { path: '/deviceInfo', exact: true, element: <DeviceInfo /> },
//       { path: '/helpDesk', exact: true, element: <HelpDesk /> },
//       { path: '/locationInfo', exact: true, element: <LocationInfo /> },
//       { path: '/user-profile', exact: true, element: <UserProfile /> },
//       // { path: '/networkStatus', exact: true, element: <NetworkStatus /> },
//       { path: '/404', element: <ErrorPage /> },
//       { path: '/*', element: <Navigate to="/404" /> },
//     ],
//   },
// ];

// const ViewerRouter = [
//   {
//     path: '/',
//     element: <FullLayout />,
//     children: [
//       { path: '/', element: <Navigate to="/help-desk/tickets" /> },
//       { path: '/help-desk/tickets', exact: true, element: <Tickets /> },
//       { path: '/help-desk/404', element: <ErrorPage /> },
//       { path: '/help-desk/*', element: <Navigate to="/404" /> },
//     ],
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

