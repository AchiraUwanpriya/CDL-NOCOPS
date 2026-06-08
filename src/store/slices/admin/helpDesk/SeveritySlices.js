import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../common/Message';
import SeverityService from '../../../services/admin/helpDesk/SeverityService';

export const PostNewSeverity = createAsyncThunk(
  'admin/admin/PostNewSeverity',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await SeverityService.PostNewSeverity(formData);
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
      thunkAPI.dispatch(GetHelpDeskSeverities());
      thunkAPI.dispatch(
        setMessage({ isShow: true, text: 'Severity Added Successfully', alertType: 'success' }),
      );
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

export const GetHelpDeskSeverities = createAsyncThunk(
  'admin/admin/GetHelpDeskSeverities',
  async (thunkAPI) => {
    try {
      const response = await SeverityService.GetHelpDeskSeverities();
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

export const UpdateSeverity = createAsyncThunk(
  'admin/admin/UpdateEquipment',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await SeverityService.UpdateSeverity(formData);
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
      thunkAPI.dispatch(GetHelpDeskSeverities());
      thunkAPI.dispatch(
        setMessage({ isShow: true, text: 'Severity Updated Successfully', alertType: 'success' }),
      );
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

export const DeleteSeverity = createAsyncThunk(
  'admin/admin/DeleteSeverity',
  async ({ id }, thunkAPI) => {
    try {
      const response = await SeverityService.DeleteSeverity(id);
      if (response.StatusCode === 200) {
        thunkAPI.dispatch(GetHelpDeskSeverities());
        thunkAPI.dispatch(
          setMessage({ isShow: true, text: 'Severity Deleted Successfully', alertType: 'success' }),
        );
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

const initialState = { data: [], loading: false };

const equipmentSlices = createSlice({
  name: 'severity',
  initialState,
  extraReducers: {
    [PostNewSeverity.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [PostNewSeverity.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetHelpDeskSeverities.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetHelpDeskSeverities.rejected]: (state, action) => {
      state.loading = false;
    },
    [UpdateSeverity.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [UpdateSeverity.rejected]: (state, action) => {
      state.loading = false;
    },
    [DeleteSeverity.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [DeleteSeverity.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = equipmentSlices;
export default reducer;
