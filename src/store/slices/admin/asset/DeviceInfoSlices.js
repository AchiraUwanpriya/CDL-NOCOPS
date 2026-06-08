import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../common/Message';
import DeviceInfoService from '../../../services/admin/asset/DeviceInfoService';

export const GetOidData = createAsyncThunk('User/SystemHealth/GetOidData', async (thunkAPI) => {
  try {
    const response = await DeviceInfoService.GetOidData();
    if (response.StatusCode !== 200) {
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
});

export const GetOIDInfoList = createAsyncThunk(
  'User/SystemHealth/GetOIDInfoList',
  async (thunkAPI) => {
    try {
      const response = await DeviceInfoService.GetOIDInfoList();
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
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

export const GetOIDValueList = createAsyncThunk(
  'User/SystemHealth/GetOIDValueList',
  async (thunkAPI) => {
    try {
      const response = await DeviceInfoService.GetOIDValueList();
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
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

export const GetLastOnlineInfo = createAsyncThunk(
  'User/SystemHealth/GetLastOnlineInfo',
  async (thunkAPI) => {
    try {
      const response = await DeviceInfoService.GetLastOnlineInfo();
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
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

export const GetSNMPTemplateGroups = createAsyncThunk(
  'User/SystemHealth/GetSNMPTemplateGroups',
  async (thunkAPI) => {
    try {
      const response = await DeviceInfoService.GetSNMPTemplateGroups();
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
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

export const GetSNMPTemplates = createAsyncThunk(
  'User/SystemHealth/GetSNMPTemplates',
  async (thunkAPI) => {
    try {
      const response = await DeviceInfoService.GetSNMPTemplates();
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
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

const initialState = { data: [], loading: false };

const deviceInfoSlices = createSlice({
  name: 'deviceInfo',
  initialState,
  extraReducers: {
    [GetOidData.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetOidData.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetOIDInfoList.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetOIDInfoList.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetOIDValueList.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetOIDValueList.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetLastOnlineInfo.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetLastOnlineInfo.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetSNMPTemplateGroups.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetSNMPTemplateGroups.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetSNMPTemplates.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetSNMPTemplates.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = deviceInfoSlices;
export default reducer;
