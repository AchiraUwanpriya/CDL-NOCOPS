import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../../common/Message';
import EquipmentService from '../../../services/admin/asset/EquipmentService';

export const PostNewEquipment = createAsyncThunk(
  'admin/asset/PostNewEquipment',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await EquipmentService.PostNewEquipment(formData);
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

export const GetEquipment = createAsyncThunk('admin/asset/GetEquipment', async (thunkAPI) => {
  try {
    const response = await EquipmentService.GetEquipment();
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

export const UpdateEquipment = createAsyncThunk(
  'admin/asset/UpdateEquipment',
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await EquipmentService.UpdateEquipment(formData);
            if (response.StatusCode !== 200) {
        thunkAPI.dispatch(setMessage({ isShow: true, text: response.StatusCode + ' ' + response.Result, alertType: 'error' }));
        return thunkAPI.rejectWithValue();
      }else {
        thunkAPI.dispatch(
          setMessage({ isShow: true, text: 'Asset Successfully Updated.', alertType: 'success' }),
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

// export const DeleteEquipment = createAsyncThunk(
//   'admin/asset/DeleteEquipment',
//   async ({ id }, thunkAPI) => {
//     try {
//       const response = await EquipmentService.DeleteEquipment(id);
//       if (response.StatusCode === 200) {
//         thunkAPI.dispatch(GetEquipment());
//         thunkAPI.dispatch(
//           setMessage({ isShow: true, text: 'Asset Successfully Deleted.', alertType: 'success' }),
//         );
//         return response;
//       } else {
//         // thunkAPI.dispatch(setMessage('Invalid Credentials!'));
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
//   },
// );

export const DeleteEquipment = createAsyncThunk(
  'admin/asset/DeleteEquipment',
  async ({ id }, thunkAPI) => {
    try {
      const response = await EquipmentService.DeleteEquipment(id);
      if (response.StatusCode === 200) {
        thunkAPI.dispatch(GetEquipment());
        thunkAPI.dispatch(
          setMessage({ isShow: true, text: 'Asset Successfully Deleted.', alertType: 'success' }),
        );
        return response;
      } else if (response.StatusCode === 500) {
        thunkAPI.dispatch(
          setMessage({ isShow: true, text: 'Server error occurred while deleting asset.', alertType: 'error' }),
        );
        return thunkAPI.rejectWithValue();
      } else {
        thunkAPI.dispatch(
          setMessage({ isShow: true, text: 'Failed to delete asset.', alertType: 'error' }),
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

const equipmentSlices = createSlice({
  name: 'equipment',
  initialState,
  extraReducers: {
    [PostNewEquipment.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [PostNewEquipment.rejected]: (state, action) => {
      state.loading = false;
    },
    [GetEquipment.fulfilled]: (state, action) => {
      state.data = action.payload.ResultSet;
      state.loading = false;
    },
    [GetEquipment.rejected]: (state, action) => {
      state.loading = false;
    },
    [UpdateEquipment.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [UpdateEquipment.rejected]: (state, action) => {
      state.loading = false;
    },
    [DeleteEquipment.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [DeleteEquipment.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer } = equipmentSlices;
export default reducer;
