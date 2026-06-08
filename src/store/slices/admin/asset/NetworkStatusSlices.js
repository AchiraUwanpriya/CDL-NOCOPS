// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { setMessage } from '../message';
// import NetworkStatusService from '../../services/asset/networkStatusService';

// export const GetMapData = createAsyncThunk('User/Map/GetMapData', async (thunkAPI) => {
//   try {
//     const response = await EquipmentService.GetMapData();
//     if (response.StatusCode !== 200) {
//       return thunkAPI.rejectWithValue();
//     }
//     return response;
//   } catch (error) {
//     const message =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString();
//     
//     thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
//     return thunkAPI.rejectWithValue();
//   }
// });

// export const GetNetworkTopology = createAsyncThunk(
//   'User/Map/GetNetworkTopology',
//   async (thunkAPI) => {
//     try {
//       const response = await EquipmentService.GetNetworkTopology();
//             if (response.StatusCode !== 200) {
//         thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
//         return thunkAPI.rejectWithValue();
//       }
//       return response;
//     } catch (error) {
//       const message =
//         (error.response && error.response.data && error.response.data.message) ||
//         error.message ||
//         error.toString();
//       
//       thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
//       return thunkAPI.rejectWithValue();
//     }
//   },
// );

// export const GetSubNetworkPcs = createAsyncThunk('User/Map/GetSubNetworkPcs', async (thunkAPI) => {
//   try {
//     const response = await EquipmentService.GetSubNetworkPcs();
//     if (response.StatusCode !== 200) {
//       return thunkAPI.rejectWithValue();
//     }
//     return response;
//   } catch (error) {
//     const message =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString();
//     
//     thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
//     return thunkAPI.rejectWithValue();
//   }
// });

// export const GetNetworkUnAssignedDeviceList = createAsyncThunk(
//   'User/Map/GetNetworkUnAssignedDeviceList',
//   async (thunkAPI) => {
//     try {
//       const response = await EquipmentService.GetNetworkUnAssignedDeviceList();
//             if (response.StatusCode !== 200) {
//         thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
//         return thunkAPI.rejectWithValue();
//       }
//       return response;
//     } catch (error) {
//       const message =
//         (error.response && error.response.data && error.response.data.message) ||
//         error.message ||
//         error.toString();
//       
//       thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
//       return thunkAPI.rejectWithValue();
//     }
//   },
// );

// export const PostNewMachine = createAsyncThunk(
//   'User/Map/PostNewMachine',
//   async (data, thunkAPI) => {
//     try {
//       const formData = new FormData();
//       Object.entries(data).forEach(([key, value]) => {
//         formData.append(key, value);
//       });
//       const response = await NetworkStatusService.PostNewMachine(formData);
//             if (response.StatusCode !== 200) {
//         thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
//         return thunkAPI.rejectWithValue();
//       }
//       thunkAPI.dispatch(GetMapData());
//       return response;
//     } catch (error) {
//       const message =
//         (error.response && error.response.data && error.response.data.message) ||
//         error.message ||
//         error.toString();
//       
//       thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
//       return thunkAPI.rejectWithValue();
//     }
//   },
// );

// const initialState = { data: [], loading: false };

// const networkStatusSlices = createSlice({
//   name: 'network status',
//   initialState,
//   extraReducers: {
//     [GetMapData.fulfilled]: (state, action) => {
//       state.data = action.payload.ResultSet;
//       state.loading = false;
//     },
//     [GetNetworkTopology.fulfilled]: (state, action) => {
//       state.data = action.payload.ResultSet;
//       state.loading = false;
//     },
//     [GetSubNetworkPcs.fulfilled]: (state, action) => {
//       state.data = action.payload.ResultSet;
//       state.loading = false;
//     },
//     [GetNetworkUnAssignedDeviceList.fulfilled]: (state, action) => {
//       state.data = action.payload.ResultSet;
//       state.loading = false;
//     },
//     [PostNewMachine.fulfilled]: (state, action) => {
//         state.loading = false;
//       },
//   },
// });

// const { reducer } = networkStatusSlices;
// export default reducer;