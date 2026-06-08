import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../common/Message';
import StatusService from '../../../services/admin/helpDesk/StatusService';

export const PostNewStatus = createAsyncThunk(
  'admin/asset/PostNewEqType',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await StatusService.PostNewStatus(formData);
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      thunkAPI.dispatch(GetHelpDeskStatuses());
      thunkAPI.dispatch(setMessage({ isShow: true, text: 'Status Added Successfully', alertType: 'success' }));
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

export const GetHelpDeskStatuses = createAsyncThunk(
  'admin/admin/GetHelpDeskStatuses',
  async (thunkAPI) => {
    try {
      const response = await StatusService.GetHelpDeskStatuses();
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

export const UpdateStatus = createAsyncThunk('admin/admin/UpdateStatus', async (data, thunkAPI) => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const response = await StatusService.UpdateStatus(formData);
    if (response.StatusCode !== 200) {
      return thunkAPI.rejectWithValue();
    }
    thunkAPI.dispatch(GetHelpDeskStatuses());
    thunkAPI.dispatch(setMessage({ isShow: true, text: 'Status Updated Successfully', alertType: 'success' }));
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

export const DeleteStatus = createAsyncThunk(
  'admin/admin/DeleteStatus',
  async ({ id }, thunkAPI) => {
    try {
      const response = await StatusService.DeleteStatus(id);
      if (response.StatusCode === 200) {
        thunkAPI.dispatch(GetHelpDeskStatuses());
        thunkAPI.dispatch(setMessage({ isShow: true, text: 'Status Deleted Successfully', alertType: 'success' }));
        return response;
      } else {
        // thunkAPI.dispatch(setMessage('Invalid Credentials!'));
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

const statusTypeSlices = createSlice({
  name: 'status',
  initialState,
  extraReducers: {
    [PostNewStatus.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [PostNewStatus.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetHelpDeskStatuses.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetHelpDeskStatuses.rejected]: (state, action) => {
      state.loading = false;
    },
    [UpdateStatus.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [UpdateStatus.rejected]: (state, action) => {
      state.loading = false;
    },
    [DeleteStatus.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [DeleteStatus.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = statusTypeSlices;
export default reducer;
