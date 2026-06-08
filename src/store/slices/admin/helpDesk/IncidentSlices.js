import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../common/Message';
import CompanyService from '../../../services/admin/helpDesk/IncidentService';

export const PostNewIncident = createAsyncThunk(
  'admin/admin/PostNewIncident',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await CompanyService.PostNewIncident(formData);
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      thunkAPI.dispatch(GetHelpDeskIncidents());
      thunkAPI.dispatch(setMessage({ isShow: true, text: 'Incident Added Successfully', alertType: 'success' }));
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

export const GetHelpDeskIncidents = createAsyncThunk('admin/admin/GetHelpDeskIncidents', async (thunkAPI) => {
  try {
    const response = await CompanyService.GetHelpDeskIncidents();
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


export const UpdateIncident = createAsyncThunk(
  'admin/admin/UpdateIncident',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await CompanyService.UpdateIncident(formData);
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      thunkAPI.dispatch(GetHelpDeskIncidents());
      thunkAPI.dispatch(setMessage({ isShow: true, text: 'Incident Updated Successfully', alertType: 'success' }));
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

export const DeleteIncident = createAsyncThunk(
  'admin/admin/DeleteIncident',
  async ({ id }, thunkAPI) => {
    try {
      const response = await CompanyService.DeleteIncident(id);
      if (response.StatusCode === 200) {
        thunkAPI.dispatch(GetHelpDeskIncidents());
        thunkAPI.dispatch(setMessage({ isShow: true, text: 'Incident Deleted Successfully', alertType: 'success' }));
        return response;
      } else {
        thunkAPI.dispatch(setMessage('Invalid Credentials!'));
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

const companySlices = createSlice({
  name: 'incident',
  initialState,
  extraReducers: {
    [PostNewIncident.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [PostNewIncident.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetHelpDeskIncidents.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetHelpDeskIncidents.rejected]: (state, action) => {
      state.loading = false;
    },
    [UpdateIncident.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [UpdateIncident.rejected]: (state, action) => {
      state.loading = false;
    },
    [DeleteIncident.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [DeleteIncident.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = companySlices;
export default reducer;
