import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../common/Message';
import SeverityService from '../../../services/admin/asset/SeverityService';

export const PostNewseverity = createAsyncThunk(
  'admin/asset/PostNewseverity',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await SeverityService.PostNewseverity(formData);
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
          setMessage({ isShow: true, text: 'Severity Successfully Added.', alertType: 'success' }),
        );
      }
      thunkAPI.dispatch(GetSeverity());
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

export const GetSeverity = createAsyncThunk('admin/asset/GetSeverity', async (thunkAPI) => {
  try {
    const response = await SeverityService.GetSeverity();
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

export const UpdateSeverity = createAsyncThunk(
  'admin/asset/UpdateSeverity',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await SeverityService.UpdateSeverity(formData);
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
            text: 'Severity Successfully Updated.',
            alertType: 'success',
          }),
        );
      }
      thunkAPI.dispatch(GetSeverity());
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

export const DeleteSeverity = createAsyncThunk(
  'admin/asset/DeleteSeverity',
  async ({ id }, thunkAPI) => {
    try {
      const response = await SeverityService.DeleteSeverity(id);
      if (response.StatusCode === 200) {
        thunkAPI.dispatch(GetSeverity());
        thunkAPI.dispatch(
          setMessage({
            isShow: true,
            text: 'Severity Successfully Deleted.',
            alertType: 'success',
          }),
        );
        return response;
      } else {
        thunkAPI.dispatch(
          setMessage({
            isShow: true,
            text: response.StatusCode + ' ' + response.Result,
            alertType: 'error',
          }),
        );
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

const initialState = { data: [], loading: false };

const severitySlices = createSlice({
  name: 'severity',
  initialState,
  extraReducers: {
    [PostNewseverity.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [PostNewseverity.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetSeverity.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetSeverity.rejected]: (state, action) => {
      state.loading = false;
    },
    [UpdateSeverity.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [UpdateSeverity.rejected]: (state, action) => {
      state.loading = false;
    },
    [DeleteSeverity.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [DeleteSeverity.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = severitySlices;
export default reducer;
