import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../../slices/common/Message';
import TicketService from '../../../services/common/helpDesk/TicketService';

export const GetHelpDeskAssets = createAsyncThunk('User/HelpDesk/GetHelpDeskAssets', async (thunkAPI) => {
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

const assetSlices = createSlice({
  name: 'assetSlices',
  initialState,
  extraReducers: {
    [GetHelpDeskAssets.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetHelpDeskAssets.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = assetSlices;
export default reducer;
