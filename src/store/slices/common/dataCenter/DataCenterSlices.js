import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../../slices/common/Message';
import dataCenterService from '../../../services/common/dataCenter/DataCenterService';

export const GetEnironmentalVariables = createAsyncThunk(
  'Environment/GetEnironmentalVariables',
  async (thunkAPI) => {
    try {
      const response = await dataCenterService.GetEnironmentalVariables();
      if (response.StatusCode !== 200) {
        console.log(response.StatusCode);
        alert(response.Result);
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

const initialState = { data: [], loading: false, EnvironmentData:[] };

const dataCenterSlices = createSlice({
  name: 'dataCenter',
  initialState,
  extraReducers: {
    [GetEnironmentalVariables.fulfilled]: (state, action) => {
      state.EnvironmentData = action.payload.ResultSet;
      state.loading = false;
    },
    [GetEnironmentalVariables.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = dataCenterSlices;
export default reducer;
