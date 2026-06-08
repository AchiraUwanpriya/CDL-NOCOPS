import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../../slices/common/Message';
import TicketService from '../../../services/common/helpDesk/TicketService';

export const GetEqType = createAsyncThunk(
  '/HelpDesk/GetEqType',
  async (thunkAPI) => {
    try {
      const response = await TicketService.GetEqType();
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

const initialState = { data: [], loading: false, oneRow:null };

const helpDeskEquipmentTypeSlices = createSlice({
  name: 'helpDeskEquipmentTypeSlices',
  initialState,
  extraReducers: {
    [GetEqType.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetEqType.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = helpDeskEquipmentTypeSlices;
export default reducer;
