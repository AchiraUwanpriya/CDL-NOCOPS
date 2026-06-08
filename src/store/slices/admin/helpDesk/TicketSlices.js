import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../../slices/common/Message';
import TicketService from '../../../services/common/helpDesk/TicketService';

export const GetAllTickets = createAsyncThunk('HelpDesk/GetAllTickets', async (thunkAPI) => {
  try {
    const response = await TicketService.GetAllTickets();
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

export const DeleteTicket = createAsyncThunk(
  'Admin/HelpDesk/DeleteTicket',
  async ({ id }, thunkAPI) => {
    try {
      const response = await TicketService.DeleteTicket(id);
      if (response.StatusCode === 200) {
        thunkAPI.dispatch(GetAllTickets());
        thunkAPI.dispatch(setMessage({ isShow: true, text: 'Ticket Deleted Successfully', alertType: 'success' }));
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
const initialState = { allTicketData: [], loading: false };

const ticketSlices = createSlice({
  name: 'ticketSlices',
  initialState,
  extraReducers: {
    [GetAllTickets.pending]: (state, action) => {
      state.loading = true;
    },
    [GetAllTickets.fulfilled]: (state, action) => {
      state.allTicketData = action.payload.ResultSet;
      state.loading = false;
    },
    [GetAllTickets.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = ticketSlices;
export default reducer;
