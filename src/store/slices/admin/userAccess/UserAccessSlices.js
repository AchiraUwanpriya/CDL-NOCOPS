import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserAccessService from '../../../services/admin/userAccess/UserAccessService';
import { setMessage } from '../../common/Message';

export const GetAllHeaderComponents = createAsyncThunk(
  'Admin/Access/GetAllHeaderComponents',
  async (_, thunkAPI) => {
    try {
      const response = await UserAccessService.GetAllHeaderComponents();
      if (response.StatusCode !== 200 || !response.ResultSet) {
        return thunkAPI.rejectWithValue();
      }
      return response.ResultSet;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      console.log('Error:', message);
      thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const UpdateComponentAccess = createAsyncThunk(
  'Admin/Access/UpdateComponentAccess',
  async (data, thunkAPI) => {
    try {
      const response = await UserAccessService.UpdateComponentAccess(data);
      if (response.StatusCode !== 200) {
        thunkAPI.dispatch(
          setMessage({
            isShow: true,
            text: response.StatusCode + ' ' + response.Result,
            alertType: 'error',
          }),
        );
        return thunkAPI.rejectWithValue();
      } else {
        thunkAPI.dispatch(
          setMessage({
            isShow: true,
            text: 'User Access Successfully Updated.',
            alertType: 'success',
          }),
        );
      }
      thunkAPI.dispatch(GetAllHeaderComponents());
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

const useraccessSlices = createSlice({
  name: 'useraccess',
  initialState,
  extraReducers: {
    [GetAllHeaderComponents.pending]: (state) => {
      state.loading = true;
    },
    [GetAllHeaderComponents.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload || [];
    },
    [GetAllHeaderComponents.rejected]: (state) => {
      state.loading = false;
    },
    [UpdateComponentAccess.pending]: (state) => {
      state.loading = true;
    },
    [UpdateComponentAccess.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [UpdateComponentAccess.rejected]: (state) => {
      state.loading = false;
    },
  },
});

const { reducer } = useraccessSlices;
export default reducer;
