import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../../slices/common/Message';
import LocationInfoService from '../../../services/common/locationInfo/LocationInfoService';

export const GetMapData = createAsyncThunk(
  'Map/GetMapData',
  async ( thunkAPI) => {
    try {
      const response = await LocationInfoService.GetMapData();
      if (response.StatusCode !== 200) {
        thunkAPI.dispatch(
          setMessage({
            isShow: true,
            text: response.StatusCode + ' ' + response.Result,
            alertType: 'error',
          }),
        );
        return thunkAPI.rejectWithValue();
      }
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const GetNetworkTopology = createAsyncThunk(
  'Map/GetNetworkTopology',
  async (thunkAPI) => {
    try {
      const response = await LocationInfoService.GetNetworkTopology();
      if (response.StatusCode !== 200) {
        thunkAPI.dispatch(
          setMessage({
            isShow: true,
            text: response.StatusCode + ' ' + response.Result,
            alertType: 'error',
          }),
        );
        return thunkAPI.rejectWithValue();
      }
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const GetNetworkUnAssignedDeviceList = createAsyncThunk(
  'Map/GetNetworkUnAssignedDeviceList',
  async (data, thunkAPI) => {
    try {

      const response = await LocationInfoService.GetNetworkUnAssignedDeviceList();
      if (response.StatusCode !== 200) {
        thunkAPI.dispatch(
          setMessage({
            isShow: true,
            text: response.StatusCode + ' ' + response.Result,
            alertType: 'error',
          }),
        );
        return thunkAPI.rejectWithValue();
      }
      thunkAPI.dispatch(GetNetworkTopology());
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const GetSubNetworkPcs = createAsyncThunk(
  'Map/GetSubNetworkPcs',
  async ({ id }, thunkAPI) => {
    try {
      const response = await LocationInfoService.GetSubNetworkPcs();
      if (response.StatusCode === 200) {
        thunkAPI.dispatch(GetNetworkTopology());
        return response;
      } else {
        return thunkAPI.rejectWithValue();
      }
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);

//binu

export const GetICTDetails = createAsyncThunk(
  'ICTDevice/GetHeadBulid',
  async ( ComputerCode , thunkAPI) => {
    try {
      const response = await LocationInfoService.GetICTDetails(ComputerCode);
      if (response.StatusCode !== 200) {
        thunkAPI.dispatch(
          setMessage({
            isShow: true,
            text: response.StatusCode + ' ' + response.Result,
            alertType: 'error',
          }),
        );
        return thunkAPI.rejectWithValue();
      } 
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);


export const PostNewMachine = createAsyncThunk(
  'Map/PostNewMachine',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await LocationInfoService.PostNewMachine(formData);
      if (response.StatusCode !== 200) {
        thunkAPI.dispatch(
          setMessage({
            isShow: true,
            text: response.StatusCode + ' ' + response.Result,
            alertType: 'error',
          }),
        );
        return thunkAPI.rejectWithValue();
      }
      thunkAPI.dispatch(setMessage({ isShow: true, text: 'Machine Added Successfully', alertType: 'success' }));
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);


export const GetFloorDetails = createAsyncThunk(
  'ICTDevice/GetHeadBulid',
  async ( thunkAPI) => {
    try {
      const response = await LocationInfoService.GetFloorDetails();
      if (response.StatusCode !== 200) {
        thunkAPI.dispatch(
          setMessage({
            isShow: true,
            text: response.StatusCode + ' ' + response.Result,
            alertType: 'error',
          }),
        );
        return thunkAPI.rejectWithValue();
      }
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);

const initialState = { mapData: [], loading: false };

const LocationInfoSlices = createSlice({
  name: 'LocationInfoSlices',
  initialState,
  extraReducers: {
    [GetMapData.fulfilled]: (state, action) => {
      state.mapData = action.payload.ResultSet;
      state.loading = true;
    },
    [GetMapData.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetNetworkTopology.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetNetworkTopology.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetNetworkUnAssignedDeviceList.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [GetNetworkUnAssignedDeviceList.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetSubNetworkPcs.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [GetSubNetworkPcs.rejected]: (state, action) => {
      state.loading = false;
    },
    
    [PostNewMachine.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [PostNewMachine.rejected]: (state, action) => {
      state.loading = false;
    },
     [GetFloorDetails.fulfilled]: (state, action) => {
      state.floorData = action.payload.ResultSet;
      state.loading = true;
    },
    [GetFloorDetails.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = LocationInfoSlices;
export default reducer;
