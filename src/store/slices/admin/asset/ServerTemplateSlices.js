import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../common/Message';
import ServerTemplateService from '../../../services/admin/asset/ServerTemplateService';

export const PostSnmpDeviceTemplate = createAsyncThunk(
  'Admin/SNMP/PostSnmpDeviceTemplate',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await ServerTemplateService.PostSnmpDeviceTemplate(formData);
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }else {
        thunkAPI.dispatch(
          setMessage({ isShow: true, text: 'Device Type Successfully Added.', alertType: 'success' }),
        );
      }
      thunkAPI.dispatch(GetSnmpDeviceTemplateMaster());
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

export const GetSnmpDeviceTemplateMaster = createAsyncThunk(
  'Admin/SNMP/GetSnmpDeviceTemplateMaster',
  async (thunkAPI) => {
    try {
      const response = await ServerTemplateService.GetSnmpDeviceTemplateMaster();
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

export const UpdateSnmpDeviceTemplate = createAsyncThunk(
  'Admin/SNMP/UpdateSnmpDeviceTemplate',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await ServerTemplateService.UpdateSnmpDeviceTemplate(formData);
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }else {
        thunkAPI.dispatch(
          setMessage({ isShow: true, text: 'Device Type Successfully Updated.', alertType: 'success' }),
        );
      }
      thunkAPI.dispatch(GetSnmpDeviceTemplateMaster());
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

export const DeleteSnmpDeviceTemplate = createAsyncThunk(
  'admin/asset/DeleteSnmpDeviceTemplate',
  async ({ id }, thunkAPI) => {
    try {
      const response = await ServerTemplateService.DeleteSnmpDeviceTemplate(id);
      if (response.StatusCode === 200) {
        thunkAPI.dispatch(GetSnmpDeviceTemplateMaster());
        thunkAPI.dispatch(
          setMessage({ isShow: true, text: 'Device Type Successfully Deleted.', alertType: 'success' }),
        );
        return response;
      } else {
        thunkAPI.dispatch(
          setMessage({
            isShow: true,
            text: response.StatusCode + ' ' + response.Result,
            alertType: 'error',
          }),
        );
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

const serverTemplateSlices = createSlice({
  name: 'serverTemplate',
  initialState,
  extraReducers: {
    [PostSnmpDeviceTemplate.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [PostSnmpDeviceTemplate.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetSnmpDeviceTemplateMaster.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetSnmpDeviceTemplateMaster.rejected]: (state, action) => {
      state.loading = false;
    },
    [UpdateSnmpDeviceTemplate.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [UpdateSnmpDeviceTemplate.rejected]: (state, action) => {
      state.loading = false;
    },
    // [DeleteCompany.fulfilled]: (state, action) => {
    //   state.loading = false;
    // },
    // [DeleteCompany.rejected]: (state, action) => {
    //   state.loading = false;
    // },
  },
});

const { reducer } = serverTemplateSlices;
export default reducer;
