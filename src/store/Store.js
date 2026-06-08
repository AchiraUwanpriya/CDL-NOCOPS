// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import CustomizerReducer from './customizer/CustomizerSlice';
// import BrandSlices from './slices/admin/asset/BrandSlices';
// import CategorySlices from './slices/admin/asset/CategorySlices';
// import CompanySlices from './slices/admin/asset/CompanySlices';
// import DataEnvironmentSlices from './slices/admin/asset/DataEnvironmentSlices';
// import EquipmentSlices from './slices/admin/asset/EquipmentSlices';
// import EquipmentTypeSlices from './slices/admin/asset/EquipmentTypeSlices';
// import LocationSlices from './slices/admin/asset/LocationSlices';
// import ModelSlices from './slices/admin/asset/ModelSlices';
// import ServerTemplateGroupSlices from './slices/admin/asset/ServerTemplateGroupSlices';
// import ServerTemplateSlices from './slices/admin/asset/ServerTemplateSlices';
// import SeveritySlices from './slices/admin/asset/SeveritySlices';
// import SeverSlices from './slices/admin/asset/SeverSlices';
// import UserSlices from './slices/admin/asset/UserSlices';
// import HelpDesActivitySlices from './slices/admin/helpDesk/ActivitySlices';
// import HelpDesCategorySlices from './slices/admin/helpDesk/CategorySlices';
// import DepartmentSlices from './slices/admin/helpDesk/DepartmentSlices';
// import HelpDeskIncidentSlices from './slices/admin/helpDesk/IncidentSlices';
// import Admin_locationSlices from './slices/admin/helpDesk/LocationSlices';
// import HelpDeskSeveritySlices from './slices/admin/helpDesk/SeveritySlices';
// import HelpDeskStatusTypeSlices from './slices/admin/helpDesk/StatusTypeSlices';
// import TicketSlices from './slices/admin/helpDesk/TicketSlices';
// import AuthSlices from './slices/auth/AuthSlices';
// import DataCenterSlices from './slices/common/dataCenter/DataCenterSlices';
// import DeviceInfoSlices from './slices/common/deviceInfo/DeviceInfoSlices';
// import HelpDeskActivityLogSlices from './slices/common/helpDesk/HelpDeskActivityLogSlices';
// import HelpDeskActivitySlices from './slices/common/helpDesk/HelpDeskActivitySlices';
// import HelpDeskAssetSlices from './slices/common/helpDesk/HelpDeskAssetSlices';
// import HelpDeskAssignedTicketSlices from './slices/common/helpDesk/HelpDeskAssignedTicketSlices';
// import HelpDeskAssigneeTicketSlices from './slices/common/helpDesk/HelpDeskAssigneeTicketSlices';
// import HelpDeskASSLocationSlices from './slices/common/helpDesk/HelpDeskASSLocationSlices';
// import HelpDeskBrandSlices from './slices/common/helpDesk/HelpDeskBrandSlices';
// import HelpDeskCategorySlices from './slices/common/helpDesk/HelpDeskCategorySlices';
// import HelpDeskCompanySlices from './slices/common/helpDesk/HelpDeskCompanySlices';
// import HelpDeskDepartmentSlices from './slices/common/helpDesk/HelpDeskDepartmentSlices';
// import HelpDeskEquipmentSlices from './slices/common/helpDesk/HelpDeskEquipmentSlices';
// import HelpDeskEquipmentTypeSlices from './slices/common/helpDesk/HelpDeskEquipmentTypeSlices';
// import User_helpdeskincidentSlices from './slices/common/helpDesk/HelpDeskIncidentSlices';
// import HelpDeskLocationSlices from './slices/common/helpDesk/HelpDeskLocationSlices';
// import HelpDeskModelSlices from './slices/common/helpDesk/HelpDeskModelSlices';
// import User_helpdeskseveritySlices from './slices/common/helpDesk/HelpDeskSeveritySlices';
// import HelpDeskStatusSlices from './slices/common/helpDesk/HelpDeskStatusSlices';
// import HelpDeskTicketSlices from './slices/common/helpDesk/HelpDeskTicketSlices';
// import HelpdeskUserSlices from './slices/common/helpDesk/HelpdeskUserSlices';
// import LocationInfoSlices from './slices/common/locationInfo/LocationInfoSlices';
// import UserAccessSlices from './slices/admin/userAccess/UserAccessSlices';
// import MessageReducer from './slices/common/Message';


// // Combine all the reducers
// const combinedReducer = combineReducers({
//   customizer: CustomizerReducer,
//   message: MessageReducer,
//   authSlices: AuthSlices,
//   companySlices: CompanySlices,
//   brandSlices: BrandSlices,
//   categorySlices: CategorySlices,
//   equipmentSlices: EquipmentSlices,
//   equipmentTypeSlices: EquipmentTypeSlices,
//   locationSlices: LocationSlices,
//   admin_locationSlices: Admin_locationSlices,
//   modelSlices: ModelSlices,
//   severitySlices: SeveritySlices,
//   userSlices: UserSlices,
//   helpDeskSeveritySlices: HelpDeskSeveritySlices,
//   helpDesActivitySlices: HelpDesActivitySlices,
//   helpDesCategorySlices: HelpDesCategorySlices,
//   helpDeskIncidentSlices: HelpDeskIncidentSlices,
//   helpDeskStatusTypeSlices: HelpDeskStatusTypeSlices,
//   serverTemplateGroupSlices: ServerTemplateGroupSlices,
//   serverTemplateSlices: ServerTemplateSlices,
//   severSlices: SeverSlices,
//   helpDeskTicketSlices: HelpDeskTicketSlices,
//   helpDeskStatusSlices: HelpDeskStatusSlices,
//   helpdeskUserSlices: HelpdeskUserSlices,
//   helpDeskCompanySlices: HelpDeskCompanySlices,
//   helpDeskAssigneeTicketSlices: HelpDeskAssigneeTicketSlices,
//   helpDeskAssignedTicketSlices: HelpDeskAssignedTicketSlices,
//   helpDeskAssetSlices: HelpDeskAssetSlices,
//   user_helpdeskincidentSlices: User_helpdeskincidentSlices,
//   user_helpdeskseveritySlices: User_helpdeskseveritySlices,
//   helpDeskActivitySlices: HelpDeskActivitySlices,
//   dataEnvironmentSlices: DataEnvironmentSlices,
//   helpDeskEquipmentSlices : HelpDeskEquipmentSlices,
//   helpDeskASSLocationSlices : HelpDeskASSLocationSlices,
//   helpDeskActivityLogSlices : HelpDeskActivityLogSlices,
//   ticketSlices : TicketSlices,
//   dataCenterSlices:DataCenterSlices,
//   departmentSlices:DepartmentSlices,
//   helpDeskLocationSlices:HelpDeskLocationSlices,
//   helpDeskModelSlices:HelpDeskModelSlices,
//   helpDeskBrandSlices:HelpDeskBrandSlices,
//   helpDeskCategorySlices:HelpDeskCategorySlices,
//   helpDeskEquipmentTypeSlices:HelpDeskEquipmentTypeSlices,
//   helpDeskDepartmentSlices:HelpDeskDepartmentSlices,
//   LocationInfoSlices:LocationInfoSlices,
//   DeviceInfoSlices:DeviceInfoSlices,
//   userAccessSlices :UserAccessSlices
// });

// // Create a root reducer that handles the RESET action
// const rootReducer = (state, action) => {
//   if (action.type === "RESET") {
//     state = undefined;
//   }
//   return combinedReducer(state, action);
// };

// const store = configureStore({
//   reducer: rootReducer,
// });

// export const reset = () => ({ type: 'RESET' });

// export default store;


import { combineReducers, configureStore } from '@reduxjs/toolkit';
import CustomizerReducer from './customizer/CustomizerSlice';
import BrandSlices from './slices/admin/asset/BrandSlices';
import CategorySlices from './slices/admin/asset/CategorySlices';
import CompanySlices from './slices/admin/asset/CompanySlices';
import DataEnvironmentSlices from './slices/admin/asset/DataEnvironmentSlices';
import EquipmentSlices from './slices/admin/asset/EquipmentSlices';
import EquipmentTypeSlices from './slices/admin/asset/EquipmentTypeSlices';
import LocationSlices from './slices/admin/asset/LocationSlices';
import ModelSlices from './slices/admin/asset/ModelSlices';
import ServerTemplateGroupSlices from './slices/admin/asset/ServerTemplateGroupSlices';
import ServerTemplateSlices from './slices/admin/asset/ServerTemplateSlices';
import SeveritySlices from './slices/admin/asset/SeveritySlices';
import SeverSlices from './slices/admin/asset/SeverSlices';
import UserSlices from './slices/admin/asset/UserSlices';
import HelpDesActivitySlices from './slices/admin/helpDesk/ActivitySlices';
import HelpDesCategorySlices from './slices/admin/helpDesk/CategorySlices';
import DepartmentSlices from './slices/admin/helpDesk/DepartmentSlices';
import HelpDeskIncidentSlices from './slices/admin/helpDesk/IncidentSlices';
import Admin_locationSlices from './slices/admin/helpDesk/LocationSlices';
import HelpDeskSeveritySlices from './slices/admin/helpDesk/SeveritySlices';
import HelpDeskStatusTypeSlices from './slices/admin/helpDesk/StatusTypeSlices';
import TicketSlices from './slices/admin/helpDesk/TicketSlices';
import AuthSlices from './slices/auth/AuthSlices';
import DataCenterSlices from './slices/common/dataCenter/DataCenterSlices';
import DeviceInfoSlices from './slices/common/deviceInfo/DeviceInfoSlices';
import HelpDeskActivityLogSlices from './slices/common/helpDesk/HelpDeskActivityLogSlices';
import HelpDeskActivitySlices from './slices/common/helpDesk/HelpDeskActivitySlices';
import HelpDeskAssetSlices from './slices/common/helpDesk/HelpDeskAssetSlices';
import HelpDeskAssignedTicketSlices from './slices/common/helpDesk/HelpDeskAssignedTicketSlices';
import HelpDeskAssigneeTicketSlices from './slices/common/helpDesk/HelpDeskAssigneeTicketSlices';
import HelpDeskASSLocationSlices from './slices/common/helpDesk/HelpDeskASSLocationSlices';
import HelpDeskBrandSlices from './slices/common/helpDesk/HelpDeskBrandSlices';
import HelpDeskCategorySlices from './slices/common/helpDesk/HelpDeskCategorySlices';
import HelpDeskCompanySlices from './slices/common/helpDesk/HelpDeskCompanySlices';
import HelpDeskDepartmentSlices from './slices/common/helpDesk/HelpDeskDepartmentSlices';
import HelpDeskEquipmentSlices from './slices/common/helpDesk/HelpDeskEquipmentSlices';
import HelpDeskEquipmentTypeSlices from './slices/common/helpDesk/HelpDeskEquipmentTypeSlices';
import User_helpdeskincidentSlices from './slices/common/helpDesk/HelpDeskIncidentSlices';
import HelpDeskLocationSlices from './slices/common/helpDesk/HelpDeskLocationSlices';
import HelpDeskModelSlices from './slices/common/helpDesk/HelpDeskModelSlices';
import User_helpdeskseveritySlices from './slices/common/helpDesk/HelpDeskSeveritySlices';
import HelpDeskStatusSlices from './slices/common/helpDesk/HelpDeskStatusSlices';
import HelpDeskTicketSlices from './slices/common/helpDesk/HelpDeskTicketSlices';
import HelpdeskUserSlices from './slices/common/helpDesk/HelpdeskUserSlices';
import LocationInfoSlices from './slices/common/locationInfo/LocationInfoSlices';
import UserAccessSlices from './slices/admin/userAccess/UserAccessSlices';
import MessageReducer from './slices/common/Message';
import deviceStatusReducer from './slices/common/deviceAvailability/DeviceStatusSlice'; // Import new slice

// Combine all the reducers
const combinedReducer = combineReducers({
  customizer: CustomizerReducer,
  message: MessageReducer,
  authSlices: AuthSlices,
  companySlices: CompanySlices,
  brandSlices: BrandSlices,
  categorySlices: CategorySlices,
  equipmentSlices: EquipmentSlices,
  equipmentTypeSlices: EquipmentTypeSlices,
  locationSlices: LocationSlices,
  admin_locationSlices: Admin_locationSlices,
  modelSlices: ModelSlices,
  severitySlices: SeveritySlices,
  userSlices: UserSlices,
  helpDeskSeveritySlices: HelpDeskSeveritySlices,
  helpDesActivitySlices: HelpDesActivitySlices,
  helpDesCategorySlices: HelpDesCategorySlices,
  helpDeskIncidentSlices: HelpDeskIncidentSlices,
  helpDeskStatusTypeSlices: HelpDeskStatusTypeSlices,
  serverTemplateGroupSlices: ServerTemplateGroupSlices,
  serverTemplateSlices: ServerTemplateSlices,
  severSlices: SeverSlices,
  helpDeskTicketSlices: HelpDeskTicketSlices,
  helpDeskStatusSlices: HelpDeskStatusSlices,
  helpdeskUserSlices: HelpdeskUserSlices,
  helpDeskCompanySlices: HelpDeskCompanySlices,
  helpDeskAssigneeTicketSlices: HelpDeskAssigneeTicketSlices,
  helpDeskAssignedTicketSlices: HelpDeskAssignedTicketSlices,
  helpDeskAssetSlices: HelpDeskAssetSlices,
  user_helpdeskincidentSlices: User_helpdeskincidentSlices,
  user_helpdeskseveritySlices: User_helpdeskseveritySlices,
  helpDeskActivitySlices: HelpDeskActivitySlices,
  dataEnvironmentSlices: DataEnvironmentSlices,
  helpDeskEquipmentSlices: HelpDeskEquipmentSlices,
  helpDeskASSLocationSlices: HelpDeskASSLocationSlices,
  helpDeskActivityLogSlices: HelpDeskActivityLogSlices,
  ticketSlices: TicketSlices,
  dataCenterSlices: DataCenterSlices,
  departmentSlices: DepartmentSlices,
  helpDeskLocationSlices: HelpDeskLocationSlices,
  helpDeskModelSlices: HelpDeskModelSlices,
  helpDeskBrandSlices: HelpDeskBrandSlices,
  helpDeskCategorySlices: HelpDeskCategorySlices,
  helpDeskEquipmentTypeSlices: HelpDeskEquipmentTypeSlices,
  helpDeskDepartmentSlices: HelpDeskDepartmentSlices,
  LocationInfoSlices: LocationInfoSlices,
  DeviceInfoSlices: DeviceInfoSlices,
  userAccessSlices: UserAccessSlices,
  deviceStatus: deviceStatusReducer, // Added new reducer
});

// Create a root reducer that handles the RESET action
const rootReducer = (state, action) => {
  if (action.type === "RESET") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

// Configure store with the updated rootReducer
const store = configureStore({
  reducer: rootReducer,
});

export const reset = () => ({ type: 'RESET' });

export default store;

