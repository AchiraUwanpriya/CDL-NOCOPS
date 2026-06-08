import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../../slices/common/Message';
import TicketService from '../../../services/common/helpDesk/TicketService';

export const GetHelpDeskSeverities = createAsyncThunk(
  'User/HelpDesk/GetHelpDeskSeverities',
  async (thunkAPI) => {
    try {
      const response = await TicketService.GetHelpDeskSeverities();
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
  },
);

// export const GetSeverity = createAsyncThunk('User/HelpDesk/GetSeverity', async (thunkAPI) => {
//   try {
//     const response = await TicketService.GetSeverity();
//     if (response.StatusCode !== 200) {
//       return thunkAPI.rejectWithValue();
//     }
//     return response;
//   } catch (error) {
//     const message =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString();
//     
//     thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
//     return thunkAPI.rejectWithValue();
//   }
// });


export const GetSeverity = createAsyncThunk('HelpDesk/GetSeverity', async (thunkAPI) => {
  try {
    const response = await TicketService.GetSeverity();
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

const initialState = { data: [], assetData: [] ,loading: false };

const helpDeskSeveritySlices = createSlice({
  name: 'helpDeskSeveritySlices',
  initialState,
  extraReducers: {
    [GetHelpDeskSeverities.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetHelpDeskSeverities.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetSeverity.fulfilled]: (state, action) => {
      state.assetData = action.payload.ResultSet;
      state.loading = false;
    },
    [GetSeverity.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = helpDeskSeveritySlices;
export default reducer;
