import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../../slices/common/Message';
import TicketService from '../../../services/common/helpDesk/TicketService';

export const GetHelpDeskNewLocations = createAsyncThunk('HelpDesk/GetHelpDeskNewLocations', async (thunkAPI) => {
  try {
    const response = await TicketService.GetHelpDeskNewLocations();
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

const initialState = { data: [], loading: false };

const helpDeskLocationSlices = createSlice({
  name: 'helpDeskLocationSlices',
  initialState,
  extraReducers: {
    [GetHelpDeskNewLocations.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetHelpDeskNewLocations.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = helpDeskLocationSlices;
export default reducer;
