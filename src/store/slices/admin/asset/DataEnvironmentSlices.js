import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../common/Message';
import DataEnvironmnetService from '../../../services/admin/asset/DataEnvironmentService';

export const GetEnironmentalVariables = createAsyncThunk(
  'User/Environment/GetEnironmentalVariables',
  async (thunkAPI) => {
    try {
      const response = await DataEnvironmnetService.GetDataCenterEnvironment();
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      return response
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

const dataEnvironmentSlices = createSlice({
  name: 'dataEnvironmentSlices',
  initialState,
  extraReducers: {
    [GetEnironmentalVariables.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetEnironmentalVariables.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = dataEnvironmentSlices;
export default reducer;
