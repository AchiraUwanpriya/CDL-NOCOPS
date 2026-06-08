import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../../slices/common/Message';
import TicketService from '../../../services/common/helpDesk/TicketService';

export const GetHelpDeskUsers = createAsyncThunk('User/HelpDesk/GetHelpDeskUsers', async (thunkAPI) => {
  try {
    const response = await TicketService.GetHelpDeskUsers();
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



export const GetUserByCompany = createAsyncThunk('User/HelpDesk/GetUserByCompany', async (companyId,thunkAPI) => {
  try {
    const response = await TicketService.GetUserByCompany(companyId);
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

const initialState = { data: [], loading: false, companyUserList :[] };

const helpdeskUserSlices = createSlice({
  name: 'helpdeskUserSlices',
  initialState,
  extraReducers: {
    [GetHelpDeskUsers.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetHelpDeskUsers.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetUserByCompany.fulfilled]: (state, action) => {
      state.companyUserList = action.payload.ResultSet;
      state.loading = false;
    },
    [GetUserByCompany.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = helpdeskUserSlices;
export default reducer;
