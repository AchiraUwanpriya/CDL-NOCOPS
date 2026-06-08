import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../../slices/common/Message';
import DeviceInfoService from '../../../services/common/deviceInfo/DeviceInfoService';

export const DoPin = createAsyncThunk(
  'Ping/DoPind',
  async ( thunkAPI) => {
    try {
      const response = await DeviceInfoService.DoPin();
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


//binu



export const DoPinOne = createAsyncThunk(
  'Ping/DoPinOne',
  async (ipAddress, thunkAPI) => {  
    try {
      const response = await DeviceInfoService.DoPinOne(ipAddress);  
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

export const SpeedPing = createAsyncThunk(
  'Ping/SpeedPing',
  async (data, thunkAPI) => {
    try {

      const response = await DeviceInfoService.SpeedPing();
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
      thunkAPI.dispatch(DoPinOne());
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

export const TestPing = createAsyncThunk(
  'Ping/TestPing',
  async ({ id }, thunkAPI) => {
    try {
      const response = await DeviceInfoService.TestPing();
      if (response.StatusCode === 200) {
        thunkAPI.dispatch(DoPinOne());
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


export const TrafficStatus = createAsyncThunk(
  'Ping/TrafficStatus',
  async (thunkAPI) => {
    try {
      const response = await DeviceInfoService.TrafficStatus();
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
export const GetBandWith = createAsyncThunk(
  'Ping/Getbandwith',
  async (thunkAPI) => {
    try {
      const response = await DeviceInfoService.GetBandWith();
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
export const GetTraffic = createAsyncThunk(
  'Ping/GetTraffic',
  async (thunkAPI) => {
    try {
      const response = await DeviceInfoService.GetTraffic();
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
export const GetUpIPs = createAsyncThunk(
  'Ping/GetUpIPs',
  async (thunkAPI) => {
    try {
      const response = await DeviceInfoService.GetUpIPs();
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

const initialState = { DoPinData: [], loading: false };

const DeviceInfoSlices = createSlice({
  name: 'DeviceInfoSlices',
  initialState,
  extraReducers: {
    // [DoPin.fulfilled]: (state, action) => {
    //   state.DoPinData = action.payload.ResultSet;
    //   state.loading = true;
    // },
    [DoPin.fulfilled]: (state, action) => {
  state.DoPinData = action.payload.ResultSet;
  state.DoPinMessage = action.payload.Result; // store message
  state.loading = true;
},

    [DoPin.rejected]: (state, action) => {
      state.loading = false;
    },
    [DoPinOne.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [DoPinOne.rejected]: (state, action) => {
      state.loading = false;
    },
    [SpeedPing.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [SpeedPing.rejected]: (state, action) => {
      state.loading = false;
    },
    [TestPing.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [TestPing.rejected]: (state, action) => {
      state.loading = false;
    },
    [TrafficStatus.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [TrafficStatus.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetBandWith.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [GetBandWith.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetTraffic.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [GetTraffic.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetUpIPs.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [GetUpIPs.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = DeviceInfoSlices;
export default reducer;
