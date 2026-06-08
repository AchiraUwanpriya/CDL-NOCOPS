import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../common/Message';
import ServerTemplateGroupService from '../../../services/admin/asset/ServerTemplateGroupService';

export const PostSnmpDeviceTemplateGroup = createAsyncThunk(
  'Admin/SNMP/PostSnmpDeviceTemplateGroup',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await ServerTemplateGroupService.PostSnmpDeviceTemplateGroup(formData);
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      thunkAPI.dispatch(
        setMessage({ isShow: true, text: 'Device Category Group Successfully Added.', alertType: 'success' }),
      );
      thunkAPI.dispatch(GetSnmpDeviceTemplateGroupMaster());
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

export const GetSnmpDeviceTemplateGroupMaster = createAsyncThunk(
  'Admin/SNMP/GetSnmpDeviceTemplateGroupMaster',
  async (thunkAPI) => {
    try {
      const response = await ServerTemplateGroupService.GetSnmpDeviceTemplateGroupMaster();
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

export const UpdateSnmpDeviceTemplateGroup = createAsyncThunk(
  'Admin/SNMP/UpdateSnmpDeviceTemplateGroup',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await ServerTemplateGroupService.UpdateSnmpDeviceTemplateGroup(formData);
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }
      thunkAPI.dispatch(
        setMessage({ isShow: true, text: 'Device Category Group Successfully Updated].', alertType: 'success' }),
      );
      thunkAPI.dispatch(GetSnmpDeviceTemplateGroupMaster());
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

export const DeleteSnmpDeviceTemplateGroup = createAsyncThunk(
  'admin/SNMP/DeleteSnmpDeviceTemplateGroup',
  async ({ id }, thunkAPI) => {
    try {
      const response = await ServerTemplateGroupService.DeleteSnmpDeviceTemplateGroup(id);
      if (response.StatusCode === 200) {
        thunkAPI.dispatch(
          setMessage({ isShow: true, text: 'Device Category Group Successfully Deleted.', alertType: 'success' }),
        );
        thunkAPI.dispatch(GetSnmpDeviceTemplateGroupMaster());
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

const serverTemplateGroupSlices = createSlice({
  name: 'serverTemplateGroup',
  initialState,
  extraReducers: {
    [PostSnmpDeviceTemplateGroup.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [PostSnmpDeviceTemplateGroup.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetSnmpDeviceTemplateGroupMaster.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetSnmpDeviceTemplateGroupMaster.rejected]: (state, action) => {
      state.loading = false;
    },
    [UpdateSnmpDeviceTemplateGroup.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [UpdateSnmpDeviceTemplateGroup.rejected]: (state, action) => {
      state.loading = false;
    },
    [DeleteSnmpDeviceTemplateGroup.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [DeleteSnmpDeviceTemplateGroup.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = serverTemplateGroupSlices;
export default reducer;
