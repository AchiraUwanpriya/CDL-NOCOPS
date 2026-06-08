import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../../slices/common/Message';
import TicketService from '../../../services/common/helpDesk/TicketService';

export const GetCompany = createAsyncThunk('User/HelpDesk/GetCompany', async (thunkAPI) => {
  try {
    const response = await TicketService.GetCompany();
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

const helpDeskCompanySlices = createSlice({
  name: 'helpDeskCompanySlices',
  initialState,
  extraReducers: {
    [GetCompany.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetCompany.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = helpDeskCompanySlices;
export default reducer;
