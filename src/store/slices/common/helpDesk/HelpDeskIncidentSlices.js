import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../../slices/common/Message';
import TicketService from '../../../services/common/helpDesk/TicketService';

export const GetHelpDeskIncidents = createAsyncThunk('User/HelpDesk/GetHelpDeskIncidents', async (thunkAPI) => {
  try {
    const response = await TicketService.GetHelpDeskIncidents();
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

const incidentSlices = createSlice({
  name: 'incidentSlices',
  initialState,
  extraReducers: {
    [GetHelpDeskIncidents.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetHelpDeskIncidents.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = incidentSlices;
export default reducer;
