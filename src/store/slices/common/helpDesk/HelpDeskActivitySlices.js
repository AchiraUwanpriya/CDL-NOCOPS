import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../../slices/common/Message';
import TicketService from '../../../services/common/helpDesk/TicketService';

export const GetHelpDeskActivities = createAsyncThunk(
  'User/HelpDesk/GetHelpDeskActivities',
  async (thunkAPI) => {
    try {
      const response = await TicketService.GetHelpDeskActivities();
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

const initialState = { data: [], loading: false };

const helpDeskActivitySlices = createSlice({
  name: 'helpDeskActivitySlices',
  initialState,
  extraReducers: {
    [GetHelpDeskActivities.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetHelpDeskActivities.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = helpDeskActivitySlices;
export default reducer;
