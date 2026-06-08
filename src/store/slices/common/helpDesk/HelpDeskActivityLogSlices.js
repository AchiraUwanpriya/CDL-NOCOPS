import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../../slices/common/Message';
import TicketService from '../../../services/common/helpDesk/TicketService';

export const GetTicketsLogs = createAsyncThunk('HelpDesk/GetTicketsLogs', async (id, thunkAPI) => {
  try {
    const response = await TicketService.GetTicketsLogs(id);
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
});

export const PostTicketLog = createAsyncThunk('HelpDesk/PostTicketLog', async (data, thunkAPI) => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const response = await TicketService.PostTicketLog(formData);
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
    thunkAPI.dispatch(GetTicketsLogs(data.ticketId));
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

const initialState = { ticketsLogsData: [], loading: false };

const helpDeskActivityLog = createSlice({
  name: 'helpDeskActivityLog',
  initialState,
  extraReducers: {
    [GetTicketsLogs.fulfilled]: (state, action) => {
      state.ticketsLogsData = action.payload.ResultSet;
      state.loading = false;
    },
    [GetTicketsLogs.rejected]: (state, action) => {
      state.ticketsLogsData = [];
      state.loading = false;
    },
    [PostTicketLog.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [PostTicketLog.rejected]: (state, action) => {
      state.loading = false;
    },
    [PostTicketLog.pending]: (state, action) => {
      state.loading = true;
    },
  },
});

const { reducer } = helpDeskActivityLog;
export default reducer;
