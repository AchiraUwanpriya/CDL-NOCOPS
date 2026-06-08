import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../message';
import ActivityService from '../../services/admin/activityService';
import TicketService from '../../services/helpDesk/ticketService';
export const PostNewActivity = createAsyncThunk(
  'Admin/HelpDesk/PostNewActivity',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await ActivityService.PostNewActivity(formData);
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      thunkAPI.dispatch(GetHelpDeskActivities());
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

export const GetHelpDeskActivities = createAsyncThunk(
  'Admin/HelpDesk/GetHelpDeskActivities',
  async (thunkAPI) => {
    try {
      const response = await ActivityService.GetHelpDeskActivities();
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

export const GetHelpDeskChartCounts = createAsyncThunk('HelpDesk/GetHelpDeskChartCounts', async (thunkAPI) => {
  try {
    const response = await TicketService.GetHelpDeskChartCounts();
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

const initialState = { data: [], loading: false,HDChartCounts:[] };

const companySlices = createSlice({
  name: 'activity',
  initialState,
  extraReducers: {
    [PostNewActivity.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [PostNewActivity.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetHelpDeskChartCounts.fulfilled]: (state, action) => {
      state.HDChartCounts = action.payload.ResultSet;
      state.loading = false;
    },
    [GetHelpDeskChartCounts.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = companySlices;
export default reducer;
