import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ServerService from '../../../services/admin/asset/ServerService';
import { setMessage } from '../../common/Message';

export const PostNewServerSnmpMaster = createAsyncThunk(
  'Admin/SNMP/PostNewServerSnmpMaster',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await ServerService.PostNewServerSnmpMaster(formData);
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }else {
        thunkAPI.dispatch(
          setMessage({ isShow: true, text: 'Device Successfully Added.', alertType: 'success' }),
        );
      }
      thunkAPI.dispatch(GetServerSnmpMaster());
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

export const GetServerSnmpMaster = createAsyncThunk(
  'Admin/SNMP/GetServerSnmpMaster',
  async (thunkAPI) => {
    try {
      const response = await ServerService.GetServerSnmpMaster();
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

export const GetIAServerSnmpMaster = createAsyncThunk(
  'Admin/SNMP/GetIAServerSnmpMaster',
  async (thunkAPI) => {
    try {
      const response = await ServerService.GetIAServerSnmpMaster();
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

export const UpdateServerSnmpMaster = createAsyncThunk(
  'Admin/SNMP/UpdateServerSnmpMaster',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await ServerService.UpdateServerSnmpMaster(formData);
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }else {
        thunkAPI.dispatch(
          setMessage({ isShow: true, text: 'Device Successfully Updated.', alertType: 'success' }),
        );
      }
      thunkAPI.dispatch(GetServerSnmpMaster());
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

// export const ActiveServerSnmpMaster = createAsyncThunk(
//   'Admin/SNMP/ActiveServerSnmpMaster',
//   async (data, thunkAPI) => {
//     try {
//       const formData = new FormData();

//       Object.entries(data).forEach(([key, value]) => {
//         formData.append(key, value);
//       });

//       const response = await ServerService.ActiveServerSnmpMaster(formData);
//             if (response.StatusCode !== 200) {
//         thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
//         return thunkAPI.rejectWithValue();
//       }else {
//         thunkAPI.dispatch(
//           setMessage({ isShow: true, text: 'Device Successfully Updated.', alertType: 'success' }),
//         );
//       }
//       thunkAPI.dispatch(GetServerSnmpMaster());
//       return response;
//     } catch (error) {
//       const message =
//         (error.response && error.response.data && error.response.data.message) ||
//         error.message ||
//         error.toString();
      
//       thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
//       return thunkAPI.rejectWithValue();
//     }
//   },
// );


// export const DeleteServerSnmpMaster = createAsyncThunk(
//   'admin/SNMP/DeleteServerSnmpMaster',
//   async ({ id }, thunkAPI) => {
//     try {
//       const response = await ServerService.DeleteServerSnmpMaster(id);
//       if (response.StatusCode === 200) {
//         thunkAPI.dispatch(GetServerSnmpMaster());
//         thunkAPI.dispatch(
//           setMessage({ isShow: true, text: 'Device Successfully Deleted.', alertType: 'success' }),
//         );
//         return response;
//       } else {
//         thunkAPI.dispatch(
//           setMessage({
//             isShow: true,
//             text: response.StatusCode + ' ' + response.Result,
//             alertType: 'error',
//           }),
//         );
//         return thunkAPI.rejectWithValue();
//       }
//     } catch (error) {
//       const message =
//         (error.response && error.response.data && error.response.data.message) ||
//         error.message ||
//         error.toString();
//       thunkAPI.dispatch(setMessage({ isShow: true, text: message, alertType: 'error' }));
//       return thunkAPI.rejectWithValue();
//     }
//   });

const initialState = { data: [], loading: false };

const severSlices = createSlice({
  name: 'sever',
  initialState,
  extraReducers: {
    [PostNewServerSnmpMaster.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [PostNewServerSnmpMaster.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetServerSnmpMaster.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetServerSnmpMaster.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetIAServerSnmpMaster.fulfilled]: (state, action) => {
      state.dataInactive = action.payload.ResultSet;
      state.loading = false;
    },
    [GetIAServerSnmpMaster.rejected]: (state, action) => {
      state.loading = false;
    },
    [UpdateServerSnmpMaster.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [UpdateServerSnmpMaster.rejected]: (state, action) => {
      state.loading = false;
    },
    // [ActiveServerSnmpMaster.fulfilled]: (state, action) => {
    //   state.loading = false;
    // },
    // [ActiveServerSnmpMaster.rejected]: (state, action) => {
    //   state.loading = false;
    // },
    // [DeleteServerSnmpMaster.fulfilled]: (state, action) => {
    //   state.loading = false;
    // },
    // [DeleteServerSnmpMaster.rejected]: (state, action) => {
    //   state.loading = false;
    // },
  },
});

const { reducer } = severSlices;
export default reducer;
