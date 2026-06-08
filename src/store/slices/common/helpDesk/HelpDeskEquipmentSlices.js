import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../../slices/common/Message';
import TicketService from '../../../services/common/helpDesk/TicketService';

export const GetEquipment = createAsyncThunk(
  'User/HelpDesk/GetEquipment',
  async (thunkAPI) => {
    try {
      const response = await TicketService.GetEquipment("");
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

export const GetEquipmentById = createAsyncThunk(
    'User/HelpDesk/GetEquipmentById',
    async (id,thunkAPI) => {
      try {
        const response = await TicketService.GetEquipment(id);
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

  export const PostNewEquipment = createAsyncThunk(
    'HelpDesk/PostNewEquipment',
    async (data, thunkAPI) => {
      try {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value);
        });
        const response = await TicketService.PostNewEquipment(formData);
              if (response.StatusCode !== 200) {
          thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
          return thunkAPI.rejectWithValue();
        }else {
          thunkAPI.dispatch(
            setMessage({ isShow: true, text: 'Asset Successfully Added.', alertType: 'success' }),
          );
        }
        thunkAPI.dispatch(GetEquipment());
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

const helpDeskEquipmentSlices = createSlice({
  name: 'helpDeskEquipmentSlices',
  initialState,
  extraReducers: {
    [GetEquipment.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetEquipment.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetEquipmentById.fulfilled]: (state, action) => {
      state.oneRow = action.payload.ResultSet;
      state.loading = false;
    },
    [GetEquipmentById.rejected]: (state, action) => {
      state.loading = false;
    },
    [PostNewEquipment.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [PostNewEquipment.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = helpDeskEquipmentSlices;
export default reducer;
