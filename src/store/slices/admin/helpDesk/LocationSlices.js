import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import LocationService from '../../../services/admin/helpDesk/LocationService';
import { setMessage } from '../../common/Message';

export const PostNewLocation = createAsyncThunk(
  'Admin/HelpDesk/PostNewLocation',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await LocationService.PostNewLocation(formData);
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      thunkAPI.dispatch(GetLocation());
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

export const GetLocation = createAsyncThunk('Admin/HelpDesk/GetHelpDeskLocations', async (thunkAPI) => {
  try {
    const response = await LocationService.GetLocation();
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

export const UpdateLocation = createAsyncThunk(
  'Admin/HelpDesk/UpdateLocation',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await LocationService.UpdateLocation(formData);
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      thunkAPI.dispatch(GetLocation());
      thunkAPI.dispatch(setMessage({ isShow: true, text: 'Location Updated Successfully', alertType: 'success' }));
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

export const DeleteLocation = createAsyncThunk(
  'Admin/HelpDesk/DeleteLocation',
  async ({ id }, thunkAPI) => {
    try {
      const response = await LocationService.DeleteLocation(id);
      if (response.StatusCode === 200) {
        thunkAPI.dispatch(GetLocation());
        thunkAPI.dispatch(setMessage({ isShow: true, text: 'Location Deleted Successfully', alertType: 'success' }));
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

const Admin_locationSlices = createSlice({
  name: 'admin_location',
  initialState,
  extraReducers: {
    [PostNewLocation.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [PostNewLocation.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetLocation.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetLocation.rejected]: (state, action) => {
      state.loading = false;
    },
    [UpdateLocation.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [UpdateLocation.rejected]: (state, action) => {
      state.loading = false;
    },
    // [DeleteLocation.fulfilled]: (state, action) => {
    //   state.loading = false;
    // },
    // [DeleteLocation.rejected]: (state, action) => {
    //   state.loading = false;
    // },
  },
});

const { reducer } = Admin_locationSlices;
export default reducer;
